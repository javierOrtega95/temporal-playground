export const parsingAndValidation: TemporalExample = {
  id: 'parsing-validation',
  label: 'Parsing & Validation',
  filename: 'parsingAndValidation.ts',
  description: 'Temporal validates input strictly and avoids silent data corruption.',
  code: `// Invalid calendar date (Feb 30th doesn't exist)
const invalidDateString = '2024-02-30';

// Temporal refuses invalid input and fails fast.
let temporalResult;
try {
  temporalResult = Temporal.PlainDate.from(invalidDateString).toString();
} catch (error) {
  temporalResult = error instanceof Error ? error.message : String(error);
}

// Date silently "fixes" the input by rolling it forward to March.
const legacyDate = new Date(invalidDateString);

// Ambiguous input without time zone
const ambiguousInput = '2024-01-01';

// Temporal requires explicit intent.
let zonedResult;
try {
  zonedResult = Temporal.ZonedDateTime.from(ambiguousInput);
} catch (error) {
  zonedResult = error instanceof Error ? error.message : String(error);
}

// Valid but potentially confusing input
const dateWithTimeZone = '2024-03-10T02:30:00[America/New_York]';
// This time doesn't exist due to DST! (clocks jump from 02:00 to 03:00)
let dstResult;
try {
  dstResult = Temporal.ZonedDateTime.from(dateWithTimeZone).toString();
} catch (error) {
  dstResult = error instanceof Error ? error.message : String(error);
}

console.log({
  invalidInput: invalidDateString,
  temporalPlainDate: temporalResult,
  legacyDate: legacyDate.toString(),
  legacyDateNote: 'Silently became March 2nd',
  ambiguousInput,
  temporalZonedDateTime: zonedResult,
  dstGap: dateWithTimeZone,
  dstGapResult: dstResult,
});
`,
}
