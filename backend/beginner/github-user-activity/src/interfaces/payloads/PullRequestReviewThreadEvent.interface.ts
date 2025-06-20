export default interface PullRequestReviewThreadEvent {
  action: string,
  pull_request: object,
  comment: object
}