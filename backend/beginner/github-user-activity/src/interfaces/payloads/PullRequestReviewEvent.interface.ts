export default interface PullRequestReviewEvent {
  action: string,
  pull_request: object,
  review: object
}