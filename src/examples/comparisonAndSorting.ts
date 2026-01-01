export const comparisonAndSorting: TemporalExample = {
  id: 'comparison-sorting',
  label: 'Comparing & Sorting Dates',
  filename: 'comparisonAndSorting.ts',
  description: 'Compare dates safely and sort temporal objects correctly.',
  code: `// Create some dates to compare
const date1 = Temporal.PlainDate.from('2024-03-15');
const date2 = Temporal.PlainDate.from('2024-01-20');
const date3 = Temporal.PlainDate.from('2024-03-15');

// Direct comparison using compare()
const comparison = Temporal.PlainDate.compare(date1, date2);
// Returns: negative if date1 < date2, 0 if equal, positive if date1 > date2

// Equality check
const areEqual = date1.equals(date3);

// Sorting an array of dates
const unsortedDates = [
  Temporal.PlainDate.from('2024-12-25'),
  Temporal.PlainDate.from('2024-01-01'),
  Temporal.PlainDate.from('2024-06-15'),
];

const sortedDates = unsortedDates.sort(Temporal.PlainDate.compare);

// Find min/max
const minDate = sortedDates[0];
const maxDate = sortedDates[sortedDates.length - 1];

// --- Legacy Date comparison (problematic) ---
const legacyDate1 = new Date('2024-03-15');
const legacyDate2 = new Date('2024-01-20');
const legacyEqual = legacyDate1 === legacyDate2; // Always false!
const legacyEqualTime = legacyDate1.getTime() === legacyDate2.getTime();

console.log({
  temporal: {
    comparison: comparison > 0 ? 'date1 > date2' : 'date1 < date2',
    areEqual,
    sorted: sortedDates.map(d => d.toString()),
    min: minDate.toString(),
    max: maxDate.toString(),
  },
  legacy: {
    directComparison: legacyEqual,
    correctComparison: legacyEqualTime,
    warning: 'Must use getTime() for Date comparison',
  },
});
`,
}
