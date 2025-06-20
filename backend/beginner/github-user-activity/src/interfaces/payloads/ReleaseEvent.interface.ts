export default interface ReleaseEvent {
  action: string,
  changes: {
    body: {
      from: string
    },
    name: {
      from: string
    }
  },
  release: object
}