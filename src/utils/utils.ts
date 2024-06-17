import * as yup from 'yup';
import { Publication } from '../../types';

export const fetchDoi = async (doi: string): Promise<Publication> => {
  const res = await fetch(`https://dx.doi.org/${encodeURIComponent(doi)}`, {
    headers: {
      Accept: 'application/vnd.citationstyles.csl+json',
    },
  });

  if (!res.ok) {
    return null;
  }

  const {
    title,
    author,
    publisher,
    URL: url,
    DOI: fetchedDoi,
    published,
    abstract,
    subject,
  } = await res.json();

  if (doi.toLowerCase() !== fetchedDoi.toLowerCase()) {
    return null;
  }

  return {
    title: title ? abstract.replace(/<[^>]+>/g, '') : '', // remove HTML tags
    author: author.map(({ given, family }) => `${given} ${family}`).join(', '),
    publisher: publisher ?? '',
    url: url ?? '',
    doi: doi ?? '',
    year: published?.['date-parts'][0][0] ?? -1,
    month: published?.['date-parts'][0][1] ?? -1,
    abstract: abstract ? abstract.replace(/<[^>]+>/g, '').trim() : '', // remove HTML tags and whitespace
    subject,
    keywords: [],
  };
};

export const validateDoi = () => {
  return yup
    .string()
    .matches(
      /^10\.\d{4,9}\/[-._;()/:a-zA-Z0-9]+$/,
      "Invalid DOI format. Example: '10.1234/abcd-efg'"
    )
    .required();
};

export const capitalizeFirstLetter = (str) => {
  return str.charAt(0).toUpperCase() + str.substring(1);
};
