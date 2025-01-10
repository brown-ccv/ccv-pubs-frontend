const { calculateYearCounts } = require('./aggregator');

describe('calculateYearCounts', () => {
  test('correctly aggregates counts by year', () => {
    const testData = [
      { year: 2021, title: 'Paper 1' },
      { year: 2021, title: 'Paper 2' },
      { year: 2022, title: 'Paper 3' },
      { year: 2023, title: 'Paper 4' },
      { year: 2024, title: 'Paper 5' },
      { year: 2024, title: 'Paper 6' },
    ];

    const result = calculateYearCounts(testData);

    expect(result).toEqual([
      { label: '2021', count: 2 },
      { label: '2022', count: 1 },
      { label: '2023', count: 1 },
      { label: '2024', count: 2 },
    ]);
  });

  test('handles empty input', () => {
    const result = calculateYearCounts([]);
    expect(result).toEqual([]);
  });

  test('handles missing year data', () => {
    const testData = [
      { year: 2021, title: 'Paper 1' },
      { title: 'Paper 2' },
      { year: 2021, title: 'Paper 3' },
      { year: null, title: 'Paper 4' },
      { year: 2023, title: 'Paper 5' },
    ];

    const result = calculateYearCounts(testData);

    expect(result).toEqual([
      { label: '2021', count: 2 },
      { label: '2023', count: 1 },
    ]);
  });
});
