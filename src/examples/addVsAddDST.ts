export const addVsAddDST: TemporalExample = {
  id: 'add-vs-add-dst',
  label: 'Add vs Add (DST Safe)',
  filename: 'addVsAddDST.ts',
  description: 'Adding 1 day is not the same as adding 24 hours when DST is involved.',
  code: `// Pick a date close to a DST change (US example)
const timeZone = 'America/New_York';

// March 9th, 2024 -> DST starts on March 10th in NY
const start = Temporal.ZonedDateTime.from(
  '2024-03-09T12:00:00[America/New_York]'
);

// Add one calendar day (DST safe)
const plusOneDay = start.add({ days: 1 });

// Add 24 hours (absolute time)
const plus24Hours = start.add({ hours: 24 });

// Legacy Date comparison
const legacyStart = new Date('2024-03-09T12:00:00-05:00');
const legacyPlus24h = new Date(legacyStart.getTime() + 24 * 60 * 60 * 1000);

console.log({
  start: start.toString(),
  addDays: plusOneDay.toString(),
  addHours: plus24Hours.toString(),
  legacyDateAdd24h: legacyPlus24h.toString(),
});
`,
}
