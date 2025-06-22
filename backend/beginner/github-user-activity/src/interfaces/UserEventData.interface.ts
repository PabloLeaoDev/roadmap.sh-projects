import { Payload } from "./Payload.type"

export default interface UserEventData {
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
  payload: Payload,
  public: boolean,
  created_at: string
}