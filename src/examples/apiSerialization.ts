export const apiSerialization: TemporalExample = {
  id: 'api-serialization',
  label: 'API Serialization',
  filename: 'apiSerialization.ts',
  description: 'Send and receive Temporal objects in API requests and JSON.',
  code: `// Temporal objects auto-serialize via toJSON() - but you may want explicit control for APIs

const meetingTime = Temporal.ZonedDateTime.from('2024-03-15T14:30:00[America/New_York]');
const now = Temporal.Now.instant();

// ✅ Automatic serialization works (JSON.stringify calls toJSON() internally)
const autoJson = JSON.stringify({ meetingTime, now });
// Result: '{"meetingTime":"2024-03-15T14:30:00-04:00[America/New_York]","now":"2024-03-15T18:30:00Z"}'
console.log('Auto-serialization:', autoJson);

// ✅ BEST PRACTICE: Explicit conversion for API design
// You control the exact format for your API contract
const apiPayload = {
  eventTime: meetingTime.toString(),  // ISO 8601 with timezone
  timestamp: now.toString(),          // ISO 8601 UTC
  epochMs: now.epochMilliseconds,     // Unix timestamp (for legacy compatibility)
  structured: {
    date: meetingTime.toPlainDate().toString(),
    time: meetingTime.toPlainTime().toString(),
    timezone: meetingTime.timeZoneId,
  }
};

const explicitJson = JSON.stringify(apiPayload);

// Deserialize from API response
const apiResponse = JSON.parse(explicitJson);

const eventFromApi = Temporal.ZonedDateTime.from(apiResponse.eventTime);
const timestampFromApi = Temporal.Instant.from(apiResponse.timestamp);
const epochFromApi = Temporal.Instant.fromEpochMilliseconds(apiResponse.epochMs);

// Reconstruct from structured parts
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
  autoSerialization: {
    raw: autoJson,
    note: 'toJSON() works automatically, but format is fixed'
  },
  explicitSerialization: {
    raw: explicitJson,
    note: 'You control the format for your API contract'
  },
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
});`,
}
