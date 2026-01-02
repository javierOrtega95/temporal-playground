import ExecutionWorkerUrl from '../../workers/execution.worker.ts?worker&url'

export function createExecutionWorker(): Worker {
  return new Worker(ExecutionWorkerUrl, { type: 'module' })
}
