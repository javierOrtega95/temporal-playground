export type ExampleOption = Pick<TemporalExample, 'id' | 'label'>

export interface EditorToolbarProps {
  examples: ExampleOption[]
  selectedExample: TemporalExampleID
  onExampleChange: (id: TemporalExampleID) => void
  onReset: VoidFunction
  onCopy: VoidFunction
}
