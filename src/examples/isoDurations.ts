export const isoDurations: TemporalExample = {
  id: 'iso-durations',
  label: 'ISO Durations / Relative Time Ranges',
  filename: 'isoDurations.ts',
  description: 'Calculate relative time ranges using ISO durations (PT1H, P7D, etc.)',
  code: `// Relative duration (e.g. "last 1 hour")
const duration = Temporal.Duration.from('PT1H');

// Current moment as a fixed point in time (UTC)
const now = Temporal.Now.instant();

// Calculate the start of the interval
const start = now.subtract(duration);

// Project both instants to a user time zone
const timeZone = 'America/New_York';
const startZoned = start.toZonedDateTimeISO(timeZone);
const endZoned = now.toZonedDateTimeISO(timeZone);

// Legacy Date comparison
const legacyNow = new Date();
const legacyStart = new Date(legacyNow.getTime() - 60 * 60 * 1000);

// Result: last expression
({
  duration: duration.toString(),
  intervalUTC: {
    start: start.toString(),
    end: now.toString(),
  },
  intervalInUserTimeZone: {
    start: startZoned.toString(),
    end: endZoned.toString(),
  },
  legacyDate: {
    start: legacyStart.toString(),
    end: legacyNow.toString(),
  },
});
`,
}
