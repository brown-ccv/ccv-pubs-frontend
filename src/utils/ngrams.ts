import stopwords from 'stopwords-en';

const cleanText = (text: string): string => {
  return (
    text
      // Remove HTML tags
      .replace(/<\/?[^>]+(>|$)/g, '')
      // Remove punctuation except periods
      .replace(/[^\w\s.]/g, '')
      // Replace multiple new lines with one period
      .replace(/\n+/g, '.')
      // Remove 'abstract' from the beginning of the text
      .replace(/^\s*abstract\s*/i, '')
      // Replace multiple spaces with one space
      .replace(/\s+/g, ' ')
      // Trim white space
      .trim()
  );
};

const nGrams = (tokens: string[], n: number): string[] => {
  const nGrams = [];

  for (let i = 0; i < tokens.length - (n - 1); i++) {
    const gram = tokens
      .slice(i, i + n)
      .join(' ')
      // Remove ending periods
      .replace(/\.+$/, '');

    // don't push any that has a period
    if (!gram.includes('.')) {
      nGrams.push(gram);
    }
  }

  return nGrams;
};

const calcFreqMap = (arr: string[]): { [key: string]: number } => {
  const result = {};
  arr.forEach((item) => {
    result[item] = (result[item] ?? 0) + 1;
  });
  return result;
};

// Remove n-grams that contain stopwords in the first or last position
const filterOutStopwords = (str: string) => {
  const words = str.split(' ');

  const first = words[0];
  const last = words[words.length - 1];

  return !(stopwords.includes(first.toLowerCase()) || stopwords.includes(last.toLowerCase()));
};

export const nGramsPipeline = () => {
  const abstract =
    '<jats:title>Abstract</jats:title><jats:p>Antibiotic-induced gut dysbiosis (AID) is a frequent and serious side effect of antibiotic use and mitigating this dysbiosis is a critical therapeutic target. We propose that the host diet can modulate the chemical environment of the gut resulting in changes to the structure and function of the microbiome during antibiotic treatment. Gut dysbiosis is typically characterized by increases in aerobic respiratory bacterial metabolism, redox potential, and abundance of Proteobacteria. In this study, we explore dietary fiber supplements as potential modulators of the chemical environment in the gut to reduce this pattern of dysbiosis. Using defined-diets and whole-genome sequencing of female murine microbiomes during diet modulation and antibiotic treatment, we find that fiber prebiotics significantly reduced the impact of antibiotic treatment on microbiome composition and function. We observe reduced abundance of aerobic bacteria as well as metabolic pathways associated with oxidative metabolism. These metatranscriptomic results are corroborated by chemical measurements of eH and pH suggesting that fiber dampens the dysbiotic effects of antibiotics. This work indicates that fiber may act as a potential therapeutic for AID by modulating bacterial metabolism in the gut to prevent an increase in redox potential and protect commensal microbes during antibiotic treatment.';

  const tokenized = cleanText(abstract).split(' ');
  const monograms = nGrams(tokenized, 1);

  const biGrams = nGrams(tokenized, 2);
  const triGrams = nGrams(tokenized, 3);

  const entries = [
    ...Object.entries(calcFreqMap(monograms)),
    ...Object.entries(calcFreqMap(biGrams)),
    ...Object.entries(calcFreqMap(triGrams)),
  ];

  const filtered = entries.filter(([gram, frequency]) =>
    // Filter out stopwords
    filterOutStopwords(gram)
  );

  // Combine grams
  // TODO: Singularize
  // TODO: Deal with uppercase/lowercase for titles and beginning of sentences?

  // Sort by frequency and then by gram
  return filtered.sort(([gramA, frequencyA], [gramB, frequencyB]) => {
    if (frequencyA === frequencyB) {
      return gramA.localeCompare(gramB);
    }

    return frequencyA - frequencyB;
  });
};
