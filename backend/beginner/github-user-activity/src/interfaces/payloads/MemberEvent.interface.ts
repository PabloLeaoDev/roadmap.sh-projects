export default interface MemberEvent {
  action: string,
  member: object,
  changes: {
    old_permission: {
      from: string
    }
  }
}