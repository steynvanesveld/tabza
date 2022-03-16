import { RssItem } from './rss-item.model';

export class Rss {
  constructor(
    public id: number,
    public name: string,
    public url: string,
    public logo: string,
    public active?: boolean,
    public items?: RssItem[]
  ) {}
}
