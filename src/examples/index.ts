import { addVsAddDST } from './addVsAddDST'
import { ageCalculation } from './ageCalculation'
import { apiSerialization } from './apiSerialization'
import { calendarVsAbsolute } from './calendarVsAbsolute'
import { comparisonAndSorting } from './comparisonAndSorting'
import { dateDifferences } from './dateDifferences'
import { dstAmbiguity } from './dstAmbiguity'
import { ISODurations } from './durations'
import { formattingLocalization } from './formattingLocalization'
import { lastSevenDays } from './lastSevenDays'
import { migrationFromDate } from './migrationFromDate'
import { mutabilityComparison } from './mutabilityComparison'
import { parsingAndValidation } from './parsingAndValidation'
import { recurringEvents } from './recurringEvents'
import { timeZoneConversion } from './timeZoneConversion'
import { typesOverview } from './typesOverview'

export const EXAMPLES_GROUPED: Record<string, { label: string; examples: TemporalExample[] }> = {
  fundamentals: {
    label: 'Fundamentals',
    examples: [typesOverview, timeZoneConversion, parsingAndValidation, migrationFromDate],
  },
  operations: {
    label: 'Common Operations',
    examples: [
      dateDifferences,
      comparisonAndSorting,
      ISODurations,
      apiSerialization,
      formattingLocalization,
      calendarVsAbsolute,
    ],
  },
  advanced: {
    label: 'Advanced Concepts',
    examples: [addVsAddDST, dstAmbiguity, mutabilityComparison],
  },
  useCases: {
    label: 'Real-World Use Cases',
    examples: [lastSevenDays, ageCalculation, recurringEvents],
  },
}

export const EXAMPLES: TemporalExample[] = Object.values(EXAMPLES_GROUPED).flatMap(
  (group) => group.examples
)
