import Article from "./article.interface"

export default interface ResponseBlog {
  success: boolean,
  message: string,
  payload?: Article | Article[]
}