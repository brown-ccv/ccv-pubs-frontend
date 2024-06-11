import stopwords from 'stopwords-en';

const prepText = (text: string): string[] => {
  const copy = text
    // Remove HTML tags
    .replace(/<\/?[^>]+(>|$)/g, '')
    // Remove 'abstract' from the beginning of the text
    .replace(/^\s*abstract\s*/i, '')
    // Replace multiple new lines to just one
    .replace(/\n+/g, '\n')
    // Replace multiple spaces with one space
    .replace(/\s+/g, ' ')
    // Trim white space
    .trim()
    // Remove punctuation except periods
    .replace(/[^\w\s.]/g, '');

  return copy.split(' ');
};

const nGrams = (tokenized: string[], n: number): string[] => {
  const nGrams = [];

  for (let i = 0; i < tokenized.length - (n - 1); i++) {
    nGrams.push(tokenized.slice(i, i + n).join(' '));
  }

  return nGrams;
};

const calcFreqMap = (arr: string[]) => {
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
  const last = words[-1];

  return !(stopwords.includes(first) || stopwords.includes(last));
};

export const nGramsPipeline = () => {
  const abstract =
    '<jats:title>Abstract</jats:title><jats:p>Antibiotic-induced gut dysbiosis (AID) is a frequent and serious side effect of antibiotic use and mitigating this dysbiosis is a critical therapeutic target. We propose that the host diet can modulate the chemical environment of the gut resulting in changes to the structure and function of the microbiome during antibiotic treatment. Gut dysbiosis is typically characterized by increases in aerobic respiratory bacterial metabolism, redox potential, and abundance of Proteobacteria. In this study, we explore dietary fiber supplements as potential modulators of the chemical environment in the gut to reduce this pattern of dysbiosis. Using defined-diets and whole-genome sequencing of female murine microbiomes during diet modulation and antibiotic treatment, we find that fiber prebiotics significantly reduced the impact of antibiotic treatment on microbiome composition and function. We observe reduced abundance of aerobic bacteria as well as metabolic pathways associated with oxidative metabolism. These metatranscriptomic results are corroborated by chemical measurements of eH and pH suggesting that fiber dampens the dysbiotic effects of antibiotics. This work indicates that fiber may act as a potential therapeutic for AID by modulating bacterial metabolism in the gut to prevent an increase in redox potential and protect commensal microbes during antibiotic treatment.';

  const biGrams = nGrams(prepText(abstract), 2);
  const biGramsFreqMap = calcFreqMap(biGrams);

  console.log(biGrams);
  console.log(calcFreqMap(biGrams));
};
