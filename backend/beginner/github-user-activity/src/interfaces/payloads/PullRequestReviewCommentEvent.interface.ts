export default interface PullRequestReviewCommentEvent {
  action: string,
  changes: {
    body: {
      from: string
    }
  },
  pull_request: object,
  comment: object
}