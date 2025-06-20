export default interface IssueCommentEvent {
  action: string,
  changes: {
    body: {
      from: string
    }
  },
  issue: object,
  comment: object
}