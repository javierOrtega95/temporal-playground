export interface EditorPanelProps {
  code: string
  fileName?: string
  onChange: (value: string) => void
}
