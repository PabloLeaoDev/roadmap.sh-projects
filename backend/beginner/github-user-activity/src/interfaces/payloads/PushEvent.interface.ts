import Commit from "../util/Commit.interface"

export default interface PushEvent {
  repository_id: number,
  push_id: number,
  size: number,
  distinct_size: number,
  ref: string,
  head: string,
  before: string
  commits: Commit[]
}