import { useState, useEffect } from 'react';

export const useCrawledStats = () => {
  const [crawledPages, setCrawledPages] = useState<number | null>(null);

  useEffect(() => {
    fetch('https://yoink.darrylmathias.tech/api/crawledPages')
      .then((res) => res.json())
      .then((data) => {
        if (typeof data === 'number') {
          setCrawledPages(data);
        } else if (data && typeof data.count === 'number') {
          setCrawledPages(data.count);
        } else if (data && typeof data.total === 'number') {
          setCrawledPages(data.total);
        } else if (data && typeof data.pages === 'number') {
          setCrawledPages(data.pages);
        }
      })
      .catch((err) => console.error('Error fetching crawled pages:', err));
  }, []);

  return crawledPages;
};
