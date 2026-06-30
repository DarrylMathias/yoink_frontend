import type { SearchResult } from '../types';
import { LinkPreview } from './ui/link-preview';

interface ResultsListProps {
  isLoading: boolean;
  error: string | null;
  results: SearchResult[];
  query: string;
}

export const ResultsList = ({ isLoading, error, results, query }: ResultsListProps) => {
  if (isLoading) {
    return <div className="pl-2.5 max-w-[600px]">Loading results...</div>;
  }

  if (error) {
    return (
      <div className="pl-2.5 max-w-[600px] text-[#cc0000] mt-5 text-sm">
        Error: {error}
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className="pl-2.5 max-w-[600px]">
        <p>
          Your search - <b>{query}</b> - did not match any documents.
        </p>
        <p>Suggestions:</p>
        <ul className="list-disc pl-5">
          <li>Make sure all words are spelled correctly.</li>
          <li>Try different keywords.</li>
          <li>Try more general keywords.</li>
        </ul>
      </div>
    );
  }

  return (
    <div className="pl-2.5 max-w-[800px] mt-2">
      {results.map((r, i) => (
        <div className="mb-6 flex gap-4" key={i}>
          {/* Image Preview Thumbnail */}
          <div className="shrink-0 pt-1 hidden sm:block">
            <div className="w-[120px] h-[90px] bg-gray-50 border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <a href={r.url} target="_blank" rel="noopener noreferrer">
                <img
                  src={`https://api.microlink.io/?url=${encodeURIComponent(r.url)}&screenshot=true&meta=false&embed=screenshot.url&colorScheme=dark&viewport.isMobile=true&viewport.deviceScaleFactor=1&viewport.width=600&viewport.height=375`}
                  alt={`Preview of ${r.title || r.url}`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </a>
            </div>
          </div>

          {/* Result Content */}
          <div className="flex-1">
            <div>
              <LinkPreview
                url={r.url}
                className="text-[16px] text-[#0000cc] underline mb-0.5 inline-block"
              >
                {r.title || r.url || 'Untitled Document'}
              </LinkPreview>
            </div>
            <div className="text-[13px] text-black leading-[1.2] mb-1">
              {r.description || 'No description available for this result.'}
            </div>
            <div className="text-[13px] text-[#008000] mb-1 truncate">
              {r.url}
            </div>
            <div className="text-[12px] text-[#555] flex flex-wrap gap-2 items-center">
              <span>
                Inverted Index Postings: <strong className="text-gray-700 font-medium">{r.document_length}</strong>
              </span>
              <span>&bull;</span>
              <span>
                BM25 Score: <strong className="text-gray-700 font-medium">{r.BM25_rating?.toFixed(4) ?? 'N/A'}</strong>
              </span>
              <span>&bull;</span>
              <span>
                Crawl Timestamp: <strong className="text-gray-700 font-medium">{(new Date(r.crawl_time * 1000)).toLocaleString()}</strong>
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
