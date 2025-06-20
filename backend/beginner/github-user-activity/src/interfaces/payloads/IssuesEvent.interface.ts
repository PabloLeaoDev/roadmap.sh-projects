export default interface IssuesEvent {
  action: string,
  issue: object,
  changes: {
    title: {
      from: string
    },
    body: {
      from: string
    }
  },
  assignee: object,
  label: object
}