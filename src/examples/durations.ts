export const ISODurations: TemporalExample = {
  id: 'iso-durations',
  label: 'Durations & Relative Time Ranges',
  filename: 'durations.ts',
  description: 'Compute relative time ranges like "last 1 hour" using ISO 8601 durations.',
  code: `// ISO-8601 duration format (P=Period, T=Time separator)
// PT1H = "Period of Time: 1 Hour"
const duration = Temporal.Duration.from('PT1H');

// You can also create durations with object notation
const oneDay = Temporal.Duration.from({ days: 1 });
const complexDuration = Temporal.Duration.from({ 
  hours: 36, 
  minutes: 30 
});

// A fixed reference point in time
const now = Temporal.Now.instant();

// Subtracting time-based durations from Instant
const oneHourAgo = now.subtract(duration);
const oneDayAgo = now.subtract({ hours: 24 }); // Use hours instead of days for Instant

// For calendar-based durations (weeks, months), use ZonedDateTime
const timeZone = 'America/New_York';
const nowZoned = now.toZonedDateTimeISO(timeZone);
const oneWeekAgo = nowZoned.subtract({ weeks: 1 });
const oneMonthAgo = nowZoned.subtract({ months: 1 });

// Project time-based instants into a user time zone
const startZoned = oneHourAgo.toZonedDateTimeISO(timeZone);
const endZoned = now.toZonedDateTimeISO(timeZone);

// Calculate the actual duration between two instants
const actualDuration = startZoned.until(endZoned);

// --- Legacy Date comparison ---
const legacyNow = new Date();
const legacyStart = new Date(legacyNow.getTime() - 60 * 60 * 1000);

console.log({
  durations: {
    oneHour: duration.toString(),
    oneDay: oneDay.toString(),
    complex: complexDuration.toString(),
  },
  instantMath: {
    oneHourAgo: oneHourAgo.toString(),
    oneDayAgo: oneDayAgo.toString(),
  },
  calendarMath: {
    oneWeekAgo: oneWeekAgo.toString(),
    oneMonthAgo: oneMonthAgo.toString(),
  },
  intervalInUserTimeZone: {
    start: startZoned.toString(),
    end: endZoned.toString(),
  },
  calculatedDuration: actualDuration.toString(),
  legacyDateInterval: {
    start: legacyStart.toString(),
    end: legacyNow.toString(),
  },
  note: 'Instant only supports time units (hours, minutes, etc). Use ZonedDateTime for calendar units (weeks, months).',
});
`,
}
