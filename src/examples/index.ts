import { addVsAddDST } from './addVsAddDST'
import { ISODurations } from './ISODurations'
import { lastSevenDays } from './lastSevenDays'
import { migrationFromDate } from './migrationFromDate'
import { mutabilityComparison } from './mutabilityComparison'
import { parsingAndValidation } from './parsingAndValidation'
import { timeZoneConversion } from './timeZoneConversion'
import { comparisonAndSorting } from './comparisonAndSorting'
import { dateDifferences } from './dateDifferences'
import { formattingLocalization } from './formattingLocalization'

export const EXAMPLES: TemporalExample[] = [
  timeZoneConversion,
  parsingAndValidation,
  migrationFromDate,
  ISODurations,
  addVsAddDST,
  dateDifferences,
  comparisonAndSorting,
  lastSevenDays,
  formattingLocalization,
  mutabilityComparison,
]

export const EXAMPLES_GROUPED = {
  fundamentals: {
    label: 'Fundamentals',
    examples: [timeZoneConversion, parsingAndValidation, migrationFromDate],
  },
  operations: {
    label: 'Common Operations',
    examples: [ISODurations, addVsAddDST, dateDifferences, comparisonAndSorting],
  },
  useCases: {
    label: 'Real-World Use Cases',
    examples: [lastSevenDays, formattingLocalization, mutabilityComparison],
  },
}
