export interface Task {
  id?: number,
  description: string,
  status: boolean,
  createdAt: Date,
  updatedAt: Date
}

export type TaskFields = 'id' | 'description' | 'status' | 'createdAt' | 'updatedAt';

export type UpdatableTaskFields = 'description' | 'status';