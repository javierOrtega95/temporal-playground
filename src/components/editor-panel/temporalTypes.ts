export const temporalTypes = `
declare global {
  namespace Temporal {
    // ---- Instant ----
    interface Instant {
      epochMilliseconds: number;
      toString(): string;
      toZonedDateTimeISO(timeZone: string): ZonedDateTime;
      subtract(duration: Duration): Instant;
    }

    // ---- ZonedDateTime ----
    interface ZonedDateTime {
      toString(): string;
      before(other: ZonedDateTime): boolean;
      since(
        other: ZonedDateTime,
        options?: { largestUnit?: string }
      ): Duration;
      add(duration: {
        days?: number;
        hours?: number;
      }): ZonedDateTime;
    }

    // ---- Duration ----
    interface Duration {
      days: number;
      toString(): string;
    }

    namespace Duration {
      function from(value: string): Duration;
    }

    // ---- PlainDate ----
    interface PlainDate {
      toString(): string;
    }

    namespace PlainDate {
      function from(value: string): PlainDate;
    }

    // ---- ZonedDateTime factory ----
    namespace ZonedDateTime {
      function from(value: string): ZonedDateTime;
    }

    // ---- Now ----
    namespace Now {
      function instant(): Instant;
    }
  }

  const Temporal: {
    Now: typeof Temporal.Now;
    Duration: typeof Temporal.Duration;
    PlainDate: typeof Temporal.PlainDate;
    ZonedDateTime: typeof Temporal.ZonedDateTime;
  };
}

export {};
`
