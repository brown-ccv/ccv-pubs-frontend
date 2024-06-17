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

export const nGramsPipeline = (abstract: string) => {
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
