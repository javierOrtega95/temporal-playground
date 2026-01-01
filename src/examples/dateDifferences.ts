export const dateDifferences: TemporalExample = {
  id: 'date-differences',
  label: 'Calculating Differences',
  filename: 'dateDifferences.ts',
  description: 'Calculate precise differences between dates in various units.',
  code: `const startDate = Temporal.PlainDate.from('2024-01-01');
const endDate = Temporal.PlainDate.from('2024-12-31');

// Calculate difference in different units
const daysDiff = startDate.until(endDate, { largestUnit: 'day' });
const weeksDiff = startDate.until(endDate, { largestUnit: 'week' });
const monthsDiff = startDate.until(endDate, { largestUnit: 'month' });

// Get specific units from the duration
const totalDays = daysDiff.days;
const totalWeeks = weeksDiff.weeks;
const totalMonths = monthsDiff.months;

// Complex duration with multiple units
const complexDiff = startDate.until(endDate, { 
  largestUnit: 'year' 
});

// Time between instants (more precise)
const instant1 = Temporal.Instant.from('2024-01-01T10:30:00Z');
const instant2 = Temporal.Instant.from('2024-01-01T15:45:30Z');

const timeDiff = instant1.until(instant2);

// --- Legacy Date comparison ---
const legacyStart = new Date('2024-01-01');
const legacyEnd = new Date('2024-12-31');
const legacyDiffMs = legacyEnd.getTime() - legacyStart.getTime();
const legacyDiffDays = legacyDiffMs / (1000 * 60 * 60 * 24);

console.log({
  temporal: {
    totalDays: \`\${totalDays} days\`,
    totalWeeks: \`\${totalWeeks} weeks\`,
    totalMonths: \`\${totalMonths} months\`,
    detailed: complexDiff.toString(),
    timeDifference: timeDiff.toString(),
  },
  legacy: {
    milliseconds: legacyDiffMs,
    days: Math.floor(legacyDiffDays),
    warning: 'Prone to rounding errors and DST issues',
  },
});
`,
}
