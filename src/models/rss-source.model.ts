import { RssFeed } from "./rss-feed.model";

export class RssSource {
  constructor(
    public id: number,
    public url: string,
    public logo: string,
    public active?: boolean,
    public feed?: RssFeed
  ) {}
}
