export interface IPost {
  title: string,
  authorId: number,
  content: string,
  summary: string,
  category: string,
  tags: string | null
}
export default interface IPostTable extends IPost {
  id: number,
  createdAt: Date | string,
  updatedAt: Date | string
}
