import Commit from "./Commit.interface"

export default interface UserData {
  id: string,
  type: string,
  actor: {
    id: number,
    login: string,
    display_login: string,
    gravatar_id: string,
    url: string,
    avatar_url: string
  },
  repo: {
    id: number,
    name: string,
    url: string
  },
  payload: {
    repository_id: number,
    push_id: number,
    size: number,
    distinct_size: number,
    ref: string,
    head: string,
    before: string
    commits: Commit[]
  },
  public: boolean,
  created_at: Date
}