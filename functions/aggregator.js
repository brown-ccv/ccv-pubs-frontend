exports.calculateYearCounts = (publications) => {
  const yearCounts = {};

  publications.forEach((publication) => {
    const year = publication.year;
    if (year) {
      yearCounts[year] = (yearCounts[year] || 0) + 1;
    }
  });

  return Object.entries(yearCounts).map(([label, count]) => ({
    label,
    count,
  }));
};
