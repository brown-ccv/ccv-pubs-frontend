import * as yup from 'yup';

export const fetchDoi = async (doi: string): Promise<object> => {
  const res = await fetch(`http://dx.doi.org/${encodeURIComponent(doi)}`, {
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
  } = await res.json();

  if (doi.toLowerCase() !== fetchedDoi.toLowerCase()) {
    return null;
  }

  return {
    title: title ?? '',
    author: author.map(({ given, family }) => `${given} ${family}`).join(', '),
    publisher: publisher ?? '',
    url: url ?? '',
    doi: doi ?? '',
    year: published?.['date-parts'][0][0] ?? -1,
    month: published?.['date-parts'][0][1] ?? -1,
    abstract: abstract ?? '',
  };
};

export function extractDOI(str: string): string | null {
  const doiRegex = /10\.\d{4,9}\/[-._;()/:a-zA-Z0-9]+/;
  const dois = str.match(doiRegex);
  return dois ? dois[0] : null;
}

export function validateDoi() {
  return yup
    .string()
    .matches(
      /^10\.\d{4,9}\/[-._;()/:a-zA-Z0-9]+$/,
      "Invalid DOI format. Example: '10.1234/abcd-efg'"
    )
    .required();
}
