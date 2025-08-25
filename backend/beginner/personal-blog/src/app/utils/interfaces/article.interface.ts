export default interface IArticle {
  id: number,
  title: string,
  body: string,
  created_at: Date | string,
  updated_at: Date | string
}

export interface IFlexibleArticleFields {
  title: string,
  body: string
}