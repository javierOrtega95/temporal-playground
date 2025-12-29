export const formattingLocalization: TemporalExample = {
  id: 'formatting-localization',
  label: 'Formatting & Localization',
  filename: 'formattingLocalization.ts',
  description: "Format dates for different locales using Temporal's built-in methods.",
  code: `const date = Temporal.ZonedDateTime.from(
  '2024-03-15T14:30:00[America/New_York]'
);

// Temporal has built-in toLocaleString support
const usFormat = date.toLocaleString('en-US', {
  dateStyle: 'full',
  timeStyle: 'long',
});

// Convert to different time zones and format
const dateMadrid = date.withTimeZone('Europe/Madrid');
const esFormat = dateMadrid.toLocaleString('es-ES', {
  dateStyle: 'full',
  timeStyle: 'long',
});

const dateTokyo = date.withTimeZone('Asia/Tokyo');
const jaFormat = dateTokyo.toLocaleString('ja-JP', {
  dateStyle: 'full',
  timeStyle: 'long',
});

// Custom format options
const customFormat = date.toLocaleString('en-US', {
  weekday: 'short',
  year: 'numeric',
  month: 'short',
  day: 'numeric',
  hour: 'numeric',
  minute: '2-digit',
  timeZoneName: 'short',
});

// Compact formats
const shortDate = date.toLocaleString('en-US', { dateStyle: 'short' });
const mediumDate = date.toLocaleString('en-US', { dateStyle: 'medium' });
const longDate = date.toLocaleString('en-US', { dateStyle: 'long' });

// ISO string (for APIs)
const isoString = date.toString();

// --- Legacy Date comparison ---
const legacyDate = new Date(date.epochMilliseconds);
const legacyFormat = legacyDate.toLocaleString('en-US');

console.log({
  localized: {
    'en-US (New York)': usFormat,
    'es-ES (Madrid)': esFormat,
    'ja-JP (Tokyo)': jaFormat,
  },
  custom: customFormat,
  dateStyles: {
    short: shortDate,
    medium: mediumDate,
    long: longDate,
  },
  forAPIs: {
    iso8601: isoString,
    epochMs: date.epochMilliseconds,
  },
  legacy: {
    format: legacyFormat,
    note: 'Date uses system locale/timezone unless explicitly configured',
  },
});
`,
}
