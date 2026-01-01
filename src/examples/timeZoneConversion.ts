export const timeZoneConversion: TemporalExample = {
  id: 'time-zone-conversion',
  label: 'Time Zone Conversion',
  filename: 'timeZoneConversion.ts',
  description:
    'Convert a fixed instant into multiple time zones in a DST-safe and predictable way.',
  code: `// An Instant represents a fixed point in time (UTC-based).
// It does not depend on any time zone.
const instant = Temporal.Now.instant();

// Project the same instant into different time zones.
// The moment in time stays the same — only the representation changes.
const nyTime = instant.toZonedDateTimeISO('America/New_York');
const tokyoTime = instant.toZonedDateTimeISO('Asia/Tokyo');
const londonTime = instant.toZonedDateTimeISO('Europe/London');

// You can also get the offset from UTC for each zone
const nyOffset = nyTime.offset;
const tokyoOffset = tokyoTime.offset;

// --- Legacy Date comparison ---
// Date mixes the concepts of "instant" and "local time".
// Its string output depends on the environment where the code runs.
const legacyDate = new Date(instant.epochMilliseconds);

console.log({
  instantUTC: instant.toString(),
  newYork: \`\${nyTime.toString()} (UTC\${nyOffset})\`,
  tokyo: \`\${tokyoTime.toString()} (UTC\${tokyoOffset})\`,
  london: londonTime.toString(),
  legacyDate: legacyDate.toString(),
  legacyWarning: 'Date toString() uses system timezone, not UTC or explicit zone'
});
`,
}
