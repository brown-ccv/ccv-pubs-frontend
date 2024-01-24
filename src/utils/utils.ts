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
    volume, // TODO: Investigate. The form asks for this, but it isn't saved anywhere
    URL: url,
    // "DOI": fetchedDoi,
    'published-print': publishedPrint,
  } = await res.json();

  return {
    title,
    author: author.map(({ given, family }) => `${given} ${family}`).join(', '),
    publisher,
    volume,
    url,
    doi,
    year: publishedPrint['date-parts'][0][0],
    month: publishedPrint['date-parts'][0][1],
  };
};

export function extractDOI(str: string): string | null {
  const doiRegex = /10\.\d{4,9}\/[-._;()/:a-zA-Z0-9]+/;
  const dois = str.match(doiRegex);
  return dois ? dois[0] : null;
}
