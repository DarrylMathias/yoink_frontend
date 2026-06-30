export interface SearchResult {
  url: string;
  title: string;
  description: string;
  crawl_time: number;
  document_length: number;
  BM25_rating: number;
}
