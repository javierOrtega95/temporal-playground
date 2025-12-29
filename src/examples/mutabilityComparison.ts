export const mutabilityComparison: TemporalExample = {
  id: 'mutability-comparison',
  label: 'Immutability Benefits',
  filename: 'mutabilityComparison.ts',
  description: 'Temporal objects are immutable, preventing bugs from shared references.',
  code: `// --- Date is mutable (dangerous in functions) ---
const legacyDate = new Date('2024-01-01');
const sameReference = legacyDate;

// Modifying one reference affects all references
sameReference.setDate(sameReference.getDate() + 1);

// Both references are now modified (unexpected!)
const legacyResult = legacyDate.toString();

// Common bug: function modifies the original
function addDayMutable(date) {
  date.setDate(date.getDate() + 1);
  return date; // Returns same reference, modified!
}

const originalDate = new Date('2024-01-01');
const modifiedDate = addDayMutable(originalDate);
const originalWasChanged = originalDate.getTime() === modifiedDate.getTime();

// --- Temporal is immutable (safe) ---
const plainDate = Temporal.PlainDate.from('2024-01-01');
const nextDay = plainDate.add({ days: 1 });

// Safe function: always returns new instance
function addDayImmutable(date) {
  return date.add({ days: 1 });
}

const originalTemporal = Temporal.PlainDate.from('2024-01-01');
const modifiedTemporal = addDayImmutable(originalTemporal);
const originalUnchanged = !originalTemporal.equals(modifiedTemporal);

console.log({
  legacyDateAfterMutation: legacyResult,
  legacyOriginalChanged: originalWasChanged,
  temporalOriginal: plainDate.toString(),
  temporalNextDay: nextDay.toString(),
  temporalOriginalUnchanged: originalUnchanged,
});
`,
}
