export const ageCalculation: TemporalExample = {
  id: 'age-calculation',
  label: 'Age & Duration Calculations',
  filename: 'ageCalculation.ts',
  description: 'Calculate precise ages, elapsed time, and relative dates.',
  code: `const birthDate = Temporal.PlainDate.from('1990-03-15');
const today = Temporal.Now.plainDateISO();

// Calculate exact age
const age = birthDate.until(today, { largestUnit: 'year' });

// Time until next birthday
const thisYearBirthday = birthDate.with({ year: today.year });
const nextBirthday = thisYearBirthday.add({ years: 1 });
const untilNextBirthday = today.until(nextBirthday);

// Contract duration
const contractStart = Temporal.PlainDate.from('2023-01-01');
const contractEnd = Temporal.PlainDate.from('2025-12-31');
const contractDuration = contractStart.until(contractEnd, { largestUnit: 'year' });

// Total days requires relativeTo when duration has calendar units
const contractTotalDays = contractDuration.total({ 
  unit: 'day',
  relativeTo: contractStart 
});

// Service uptime (only time units, no relativeTo needed)
const serviceStarted = Temporal.Instant.from('2024-01-01T00:00:00Z');
const now = Temporal.Now.instant();
const uptime = serviceStarted.until(now);

// Convert uptime to hours
const uptimeHours = uptime.total({ unit: 'hour' });

// --- Legacy Date (problematic) ---
const legacyBirth = new Date('1990-03-15');
const legacyToday = new Date();
const legacyAgeMs = legacyToday.getTime() - legacyBirth.getTime();
const legacyAgeYears = legacyAgeMs / (1000 * 60 * 60 * 24 * 365.25);

console.log({
  age: {
    years: age.years,
    months: age.months,
    days: age.days,
    total: age.toString(),
  },
  nextBirthday: {
    date: nextBirthday.toString(),
    daysUntil: untilNextBirthday.days,
  },
  contract: {
    start: contractStart.toString(),
    end: contractEnd.toString(),
    duration: contractDuration.toString(),
    totalDays: Math.floor(contractTotalDays),
  },
  uptime: {
    duration: uptime.toString(),
    hours: Math.floor(uptimeHours),
  },
  legacyComparison: {
    age: Math.floor(legacyAgeYears),
    warning: 'Leap years and DST cause inaccuracies'
  }
});
`,
}
