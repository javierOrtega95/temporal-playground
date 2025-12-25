export type ExampleOption = Pick<TemporalExample, 'id' | 'label'>

export interface EditorToolbarProps {
  examples: TemporalExample[]
  selectedExample: TemporalExampleID
  onExampleChange: (example: TemporalExample) => void
  onReset: VoidFunction
  onCopy: VoidFunction
}
