export const calendarVsAbsolute: TemporalExample = {
  id: 'calendar-vs-absolute',
  label: 'Calendar vs Absolute Time Math',
  filename: 'calendarVsAbsolute.ts',
  description: 'Understand the difference between calendar units and absolute time units.',
  code: `// Calendar units: years, months, weeks, days
// These vary in length (months: 28-31 days, years: 365-366 days)

const start = Temporal.PlainDate.from('2024-01-31');

// Adding 1 month (calendar arithmetic)
const nextMonth = start.add({ months: 1 });
// Result: 2024-02-29 (constrained to valid date)

// Adding 30 days (absolute arithmetic) 
const plus30Days = start.add({ days: 30 });
// Result: 2024-03-01 (exactly 30 days)

// Time units: hours, minutes, seconds, milliseconds
// These are always fixed length

const instant = Temporal.Instant.from('2024-01-15T12:00:00Z');

// Adding 1 day as time (always 24 hours)
const plus24h = instant.add({ hours: 24 });

// But 1 calendar day might be 23 or 25 hours during DST!
const zoned = Temporal.ZonedDateTime.from('2024-03-09T12:00:00[America/New_York]');
const nextCalendarDay = zoned.add({ days: 1 }); // 23 hours (DST starts)
const plus24Hours = zoned.add({ hours: 24 });   // Different result!

console.log({
  calendarArithmetic: {
    startDate: start.toString(),
    plusOneMonth: nextMonth.toString(),
    plus30Days: plus30Days.toString(),
    note: 'Calendar units respect date boundaries'
  },
  absoluteTime: {
    instant: instant.toString(),
    plus24Hours: plus24h.toString(),
    note: 'Time units are always fixed length'
  },
  dstExample: {
    start: zoned.toString(),
    plusOneDay: nextCalendarDay.toString(),
    plus24Hours: plus24Hours.toString(),
    difference: 'One day ≠ 24 hours during DST'
  }
});
`,
}
