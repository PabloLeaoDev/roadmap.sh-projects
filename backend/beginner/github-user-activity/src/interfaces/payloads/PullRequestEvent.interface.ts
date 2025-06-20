export default interface PullRequestEvent {
  action: string,
  number: number,
  changes: {
    title: {
      from: string
    },
    body: {
      from: string
    }
  },
  pull_request: object,
  reason: string
}