export interface EditorToolbarProps {
  selectedExample: TemporalExample
  onExampleChange: (example: TemporalExample) => void
  onReset: VoidFunction
  onCopy: () => Promise<boolean>
}
