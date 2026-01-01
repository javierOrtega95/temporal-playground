import type { FunctionComponent } from 'react'
import { StringRenderer } from './StringRenderer'
import { NumberRenderer } from './NumberRenderer'
import { BooleanRenderer } from './BooleanRenderer'
import { UndefinedRenderer } from './UndefinedRenderer'
import { ObjectRenderer } from './ObjectRenderer'
import { FallbackRenderer } from './FallbackRenderer'

export const VALUE_RENDERERS: Record<string, FunctionComponent<{ value: unknown }>> = {
  string: StringRenderer,
  number: NumberRenderer,
  boolean: BooleanRenderer,
  undefined: UndefinedRenderer,
  object: ObjectRenderer,
}

export { FallbackRenderer }
