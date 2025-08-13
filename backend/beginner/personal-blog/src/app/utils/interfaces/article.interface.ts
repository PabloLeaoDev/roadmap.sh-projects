export default interface IArticle {
  id: number,
  title: string,
  body: string,
  created_at: Date | string,
  updated_at: Date | string | null
}

export interface IUpgradeableArticleFields {
  title: string,
  body: string
}