export const lastSevenDays: TemporalExample = {
  id: 'last-seven-days',
  label: 'Rolling Time Windows (Dashboards)',
  filename: 'lastSevenDays.ts',
  description: 'Compute rolling time windows for analytics dashboards with clear intent.',
  code: `// Fixed reference point (e.g., "now" when user loads dashboard)
const now = Temporal.Now.zonedDateTimeISO('America/New_York');

// Calendar-aware range: "last 7 complete days"
const sevenDaysAgo = now.subtract({ days: 7 });

// Start of today (00:00:00) for "today so far" metric
const startOfToday = now.startOfDay();

// Start of this week (Monday at 00:00:00)
const daysToMonday = (now.dayOfWeek - 1) % 7;
const startOfWeek = now.subtract({ days: daysToMonday }).startOfDay();

// First day of current month
const startOfMonth = now.with({ day: 1 }).startOfDay();

// Compare with previous period (7 days before that)
const fourteenDaysAgo = now.subtract({ days: 14 });

// Legacy approach (milliseconds math, error-prone)
const legacyNow = new Date();
const legacySevenDaysAgo = new Date(legacyNow.getTime() - 7 * 24 * 60 * 60 * 1000);

console.log({
  currentTime: now.toString(),
  ranges: {
    last7Days: {
      start: sevenDaysAgo.toString(),
      end: now.toString(),
    },
    todaySoFar: {
      start: startOfToday.toString(),
      end: now.toString(),
    },
    thisWeek: {
      start: startOfWeek.toString(),
      end: now.toString(),
    },
    thisMonth: {
      start: startOfMonth.toString(),
      end: now.toString(),
    },
  },
  comparison: {
    current: sevenDaysAgo.toString(),
    previous: fourteenDaysAgo.toString(),
  },
  legacyRange: {
    start: legacySevenDaysAgo.toString(),
    end: legacyNow.toString(),
    warning: 'DST transitions can cause off-by-one-hour errors'
  },
});
`,
}
