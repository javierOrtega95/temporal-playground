import { addVsAddDST } from './addVsAddDST'
import { isoDurations } from './isoDurations'
import { parsingAndValidation } from './parsingAndValidation'
import { timeZoneConversion } from './timeZoneConversion'

export const EXAMPLES: TemporalExample[] = [
  timeZoneConversion,
  isoDurations,
  addVsAddDST,
  parsingAndValidation,
]
