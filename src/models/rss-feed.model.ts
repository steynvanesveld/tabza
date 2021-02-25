import { RssFeedItem } from "./rss-feed-item.model";

export class RssFeed {
  constructor(
    public description: string,
    public items: RssFeedItem[],
    public link: string,
    public title: string
  ) {}
}
