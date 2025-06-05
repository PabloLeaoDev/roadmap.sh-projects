export interface Task {
  id?: number,
  description: string,
  status?: {
    done: boolean,
    todo: boolean,
    inProgress: boolean
  },
  createdAt?: string,
  updatedAt?: string
}

export type TaskFields = 'id' | 'description' | 'status' | 'createdAt' | 'updatedAt';

export type UpdatableTaskFields = 'description' | 'status';

export type TaskStatusCli = 'mark-in-progress' | 'mark-done';