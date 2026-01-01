export function createExecutionWorker(): Worker {
  const WorkerURL = new URL('../../workers/execution.worker.ts', import.meta.url)

  return new Worker(WorkerURL, { type: 'module' })
}
