export const timeZoneConversion: TemporalExample = {
  id: 'time-zone-conversion',
  label: 'Time Zone Conversion',
  description: 'Convert a UTC instant to a user time zone in a DST-safe way',
  code: `// A fixed point in time (UTC)
const instant = Temporal.Now.instant()

// Project the instant into a specific time zone
const nyTime = instant.toZonedDateTimeISO('America/New_York')
const tokyoTime = instant.toZonedDateTimeISO('Asia/Tokyo')

// --- Legacy Date comparison (problematic) ---
const legacyDate = new Date(instant.epochMilliseconds)

return {
  instant: instant.toString(),
  newYork: nyTime.toString(),
  tokyo: tokyoTime.toString(),
  legacyDate: legacyDate.toString(),
}
`,
}
