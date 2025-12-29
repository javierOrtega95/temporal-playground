export const parsingAndValidation: TemporalExample = {
  id: 'parsing-validation',
  label: 'Parsing & Validation',
  filename: 'parsingAndValidation.ts',
  description: 'Temporal validates input strictly, unlike Date.',
  code: `// Invalid calendar date
const invalidDateString = '2024-02-30';

// Temporal: throws a clear error
let temporalResult;
try {
  temporalResult = Temporal.PlainDate.from(invalidDateString).toString();
} catch (error) {
  temporalResult = error instanceof Error ? error.message : String(error);
}

// Date: silently normalizes the value
const legacyDate = new Date(invalidDateString);

// Another ambiguous input
const ambiguousInput = '2024-01-01';

// Temporal requires explicit intent
let zonedResult;
try {
  zonedResult = Temporal.ZonedDateTime.from(ambiguousInput);
} catch (error) {
  zonedResult = error instanceof Error ? error.message : String(error);
}

console.log({
  invalidInput: invalidDateString,
  temporalPlainDate: temporalResult,
  legacyDate: legacyDate.toString(),
  ambiguousInput,
  temporalZonedDateTime: zonedResult,
});
`,
}
