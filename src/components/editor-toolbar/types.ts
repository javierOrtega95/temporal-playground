export type ExampleOption = Pick<TemporalExample, 'id' | 'label'>

export interface EditorToolbarProps {
  examples: TemporalExample[]
  selectedExample: TemporalExample
  onExampleChange: (example: TemporalExample) => void
  onReset: VoidFunction
  onCopy: () => Promise<boolean>
}
