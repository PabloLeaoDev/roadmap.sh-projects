export default interface Commit {
  sha: string,
  author: {
    email: string,
    name: string
  },
  message: string,
  distinct: boolean,
  url: string
}