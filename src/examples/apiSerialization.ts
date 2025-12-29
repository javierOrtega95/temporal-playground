export const apiSerialization: TemporalExample = {
  id: 'api-serialization',
  label: 'API Serialization',
  filename: 'apiSerialization.ts',
  description: 'Send and receive Temporal objects in API requests and JSON.',
  code: `// Temporal objects don't auto-serialize to JSON
// You must explicitly convert them to strings

const meetingTime = Temporal.ZonedDateTime.from('2024-03-15T14:30:00[America/New_York]');
const now = Temporal.Now.instant();

// ❌ WRONG: This doesn't work
const wrongJson = JSON.stringify({ meetingTime, now });
// Result: '{"meetingTime":{},"now":{}}' - loses all data!

// ✅ CORRECT: Convert to ISO strings first
const apiPayload = {
  eventTime: meetingTime.toString(),  // ISO 8601 with timezone
  timestamp: now.toString(),          // ISO 8601 UTC
  epochMs: now.epochMilliseconds,     // Unix timestamp (for compatibility)
  structured: {
    date: meetingTime.toPlainDate().toString(),
    time: meetingTime.toPlainTime().toString(),
    timezone: meetingTime.timeZoneId,
  }
};

const correctJson = JSON.stringify(apiPayload);

// Deserialize from API response
const apiResponse = JSON.parse(correctJson);

const eventFromApi = Temporal.ZonedDateTime.from(apiResponse.eventTime);
const timestampFromApi = Temporal.Instant.from(apiResponse.timestamp);
const epochFromApi = Temporal.Instant.fromEpochMilliseconds(apiResponse.epochMs);

// Reconstruct from parts
const reconstructed = Temporal.ZonedDateTime.from({
  year: 2024,
  month: 3,
  day: 15,
  hour: 14,
  minute: 30,
  timeZone: apiResponse.structured.timezone
});

// --- Legacy Date comparison ---
const legacyDate = new Date();
const legacyJson = JSON.stringify({ date: legacyDate });
const legacyParsed = JSON.parse(legacyJson);
const legacyRestored = new Date(legacyParsed.date);

console.log({ 
  wrong: wrongJson,
  correct: correctJson,
  original: {
    meetingTime: meetingTime.toString(),
    now: now.toString(),
  },
  deserialized: {
    eventFromApi: eventFromApi.toString(),
    timestampFromApi: timestampFromApi.toString(),
    epochFromApi: epochFromApi.toString(),
    reconstructed: reconstructed.toString(),
  },
  legacy: {
    original: legacyDate.toISOString(),
    json: legacyJson,
    restored: legacyRestored.toISOString(),
    warning: 'Date auto-serializes but always loses timezone (converts to UTC)',
  }
});
`,
}
