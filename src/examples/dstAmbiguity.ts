export const dstAmbiguity: TemporalExample = {
  id: 'dst-ambiguity',
  label: 'Handling DST Gaps & Overlaps',
  filename: 'dstAmbiguity.ts',
  description: 'Deal with non-existent and ambiguous times during DST transitions.',
  code: `// DST gap: 2:30 AM doesn't exist on March 10, 2024 in New York
// Clocks jump from 2:00 AM → 3:00 AM

// Default behavior: 'compatible' (shift forward)
const gapCompatible = Temporal.ZonedDateTime.from(
  '2024-03-10T02:30:00[America/New_York]',
  { disambiguation: 'compatible' }
);

// 'earlier': use the earlier valid time
const gapEarlier = Temporal.ZonedDateTime.from(
  '2024-03-10T02:30:00[America/New_York]',
  { disambiguation: 'earlier' }
);

// 'later': use the later valid time  
const gapLater = Temporal.ZonedDateTime.from(
  '2024-03-10T02:30:00[America/New_York]',
  { disambiguation: 'later' }
);

// 'reject': throw an error
let gapReject;
try {
  gapReject = Temporal.ZonedDateTime.from(
    '2024-03-10T02:30:00[America/New_York]',
    { disambiguation: 'reject' }
  );
} catch (e) {
  gapReject = e.message;
}

// DST overlap: 1:30 AM exists twice on November 3, 2024
// Clocks fall back from 2:00 AM → 1:00 AM

const overlapEarlier = Temporal.ZonedDateTime.from(
  '2024-11-03T01:30:00[America/New_York]',
  { disambiguation: 'earlier' } // First occurrence (EDT)
);

const overlapLater = Temporal.ZonedDateTime.from(
  '2024-11-03T01:30:00[America/New_York]',
  { disambiguation: 'later' } // Second occurrence (EST)
);

console.log({
  gap_2_30_AM: {
    compatible: gapCompatible.toString(),
    earlier: gapEarlier.toString(),
    later: gapLater.toString(),
    reject: gapReject,
  },
  overlap_1_30_AM: {
    earlier: \`\${overlapEarlier.toString()} (offset: \${overlapEarlier.offset})\`,
    later: \`\${overlapLater.toString()} (offset: \${overlapLater.offset})\`,
    difference: 'Same wall-clock time, different UTC times'
  }
});
`,
}
