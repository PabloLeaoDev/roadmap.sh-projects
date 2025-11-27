export interface IPost {
  title: string,
  author: string,
  content: string,
  summary: string,
  category: string,
  tags?: string
}
export default interface IPostTable extends IPost {
  id: number,
  createdAt: Date | string,
  updatedAt: Date | string
}
