export class RssFeedItem {
  constructor(
    public author: string,
    public categories: Array<string>,
    public content: string,
    public contentSnippet: string,
    public creator: string,
    public guid: string,
    public isoDate: string,
    public link: string,
    public pubDate: string,
    public title: string
  ) {}
}
