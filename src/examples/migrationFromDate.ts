export const migrationFromDate: TemporalExample = {
  id: 'migration-from-date',
  label: 'Migrating from Date to Temporal',
  filename: 'migrationFromDate.ts',
  description: 'Convert existing Date objects into Temporal safely.',
  code: `// Existing legacy Date object
const legacyDate = new Date();

// Migration path: Date → Instant
const instant = Temporal.Instant.fromEpochMilliseconds(
  legacyDate.getTime()
);

// From here, everything is explicit and predictable
const zoned = instant.toZonedDateTimeISO('Europe/Madrid');

console.log({
  legacyDate: legacyDate.toString(),
  temporalInstant: instant.toString(),
  temporalZoned: zoned.toString(),
});
`,
}
