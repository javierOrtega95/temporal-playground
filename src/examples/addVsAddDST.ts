export const addVsAddDST: TemporalExample = {
  id: 'add-vs-add-dst',
  label: 'Calendar Days vs Clock Hours (DST)',
  filename: 'addVsAddDST.ts',
  description: 'Adding one day is not the same as adding 24 hours when DST is involved.',
  code: `// Time zone with DST changes
const timeZone = 'America/New_York';

// March 9th, 2024 at noon → DST starts on March 10th at 2am in NY
const start = Temporal.ZonedDateTime.from(
  '2024-03-09T12:00:00[America/New_York]'
);

// Calendar math: add one day (DST safe)
// This adds "1 calendar day", keeping the same wall-clock time
const plusOneDay = start.add({ days: 1 });

// Absolute time math: add exactly 24 hours
// This adds 24 * 60 * 60 seconds, which might land at a different hour
const plus24Hours = start.add({ hours: 24 });

// The difference: on DST transition, 1 day ≠ 24 hours
const hourDifference = plusOneDay.hour - plus24Hours.hour;

// --- Legacy Date comparison ---
const legacyStart = new Date('2024-03-09T12:00:00-05:00');
const legacyPlus24h = new Date(legacyStart.getTime() + 24 * 60 * 60 * 1000);

console.log({
  start: start.toString(),
  addOneDay: plusOneDay.toString(),
  add24Hours: plus24Hours.toString(),
  difference: \`\${hourDifference} hour(s) difference due to DST\`,
  explanation: '1 calendar day = 23 hours on this DST transition',
  legacyDateAdd24h: legacyPlus24h.toString(),
});
`,
}
