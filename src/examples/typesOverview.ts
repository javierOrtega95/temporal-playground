export const typesOverview: TemporalExample = {
  id: 'types-overview',
  label: 'Understanding Temporal Types',
  filename: 'typesOverview.ts',
  description: 'Learn when to use PlainDate, PlainDateTime, ZonedDateTime, and Instant.',
  code: `// PlainDate: Calendar date without time (birthdays, deadlines)
const birthday = Temporal.PlainDate.from('1990-05-15');

// PlainTime: Wall-clock time without date (business hours)
const storeOpens = Temporal.PlainTime.from('09:00:00');

// PlainDateTime: Date + time, no timezone (event schedules in local context)
const meetingTime = Temporal.PlainDateTime.from('2024-03-15T14:30:00');

// ZonedDateTime: Full datetime with timezone (video calls across zones)
const videoCall = Temporal.ZonedDateTime.from('2024-03-15T14:30:00[America/New_York]');

// Instant: Precise moment in time (server timestamps, logs)
const logTimestamp = Temporal.Now.instant();

console.log({
  calendar: {
    birthday: birthday.toString(),
    useCase: 'Dates without time context'
  },
  wallClock: {
    storeOpens: storeOpens.toString(),
    useCase: 'Time without date context'
  },
  local: {
    meeting: meetingTime.toString(),
    useCase: 'Local datetime, timezone-agnostic'
  },
  zoned: {
    call: videoCall.toString(),
    useCase: 'Specific timezone required'
  },
  absolute: {
    timestamp: logTimestamp.toString(),
    useCase: 'Universal point in time'
  }
});
`,
}
