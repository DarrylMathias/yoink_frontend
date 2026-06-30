export interface SearchResult {
  url: string;
  title: string;
  description: string;
  crawl_time: number;
  document_length: number;
  BM25_rating: number;
}

export interface ExecutionTimes {
  tokenize: number;
  fetch_corpus_stats: number;
  lexicon_seek_time: number;
  posting_seek_time: number;
  bm25_computation: number;
  sort: number;
}

export interface SearchResponse {
  tokens: Record<string, number>[];
  execution_times: ExecutionTimes;
  data: SearchResult[];
}
