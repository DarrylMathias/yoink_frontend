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
    <div className="pl-2.5 max-w-[600px] mt-2">
      {results.map((r, i) => (
        <div className="mb-6" key={i}>
          {/* Result Content */}
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
          <div className="text-[13px] text-[#008000]">
            {r.url} -{' '}
            <span className="text-[#555]">
              No of inverted index entries: {r.document_length}
            </span>{' '}
            -{' '}
            <span className="text-[#555]">
              Last crawled at {(new Date(r.crawl_time * 1000)).toLocaleString()}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};
