export default interface SponsorshipEvent {
  action: string,
  effective_date: string,
  changes: {
    tier: {
      from: string
    },
    privacy_level: {
      from: string
    }
  }
}