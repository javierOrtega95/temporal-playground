export const recurringEvents: TemporalExample = {
  id: 'recurring-events',
  label: 'Recurring Events & Schedules',
  filename: 'recurringEvents.ts',
  description: 'Handle recurring meetings, subscriptions, and scheduled tasks.',
  code: `// Monthly subscription billing (same day each month)
const subscriptionStart = Temporal.PlainDate.from('2024-01-15');

// Next 3 billing dates
const billingDates = Array.from({ length: 3 }, (_, i) => 
  subscriptionStart.add({ months: i + 1 })
);

// Weekly team meeting (every Monday at 10am)
const firstMeeting = Temporal.ZonedDateTime.from(
  '2024-01-08T10:00:00[America/New_York]' // A Monday
);

// Next 4 meetings
const meetings = Array.from({ length: 4 }, (_, i) =>
  firstMeeting.add({ weeks: i + 1 })
);

// Business day calculation (skip weekends)
function addBusinessDays(date, days) {
  let current = date;
  let remaining = days;
  
  while (remaining > 0) {
    current = current.add({ days: 1 });
    // Skip Saturday (6) and Sunday (7)
    if (current.dayOfWeek < 6) {
      remaining--;
    }
  }
  
  return current;
}

const projectStart = Temporal.PlainDate.from('2024-03-15'); // Friday
const deadline5BusinessDays = addBusinessDays(projectStart, 5);

console.log({
  subscription: {
    start: subscriptionStart.toString(),
    billingDates: billingDates.map(d => d.toString()),
  },
  weeklyMeeting: {
    first: firstMeeting.toString(),
    upcoming: meetings.map(m => m.toString()),
  },
  businessDays: {
    projectStart: projectStart.toString(),
    deadline: deadline5BusinessDays.toString(),
    note: 'Skipped weekend days'
  }
});
`,
}
