import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../api/client';

export const useCrawledStats = () => {
  const { data } = useQuery({
    queryKey: ['crawledPages'],
    queryFn: async () => {
      const response = await apiClient.get('/crawledPages');
      const data = response.data;
      
      if (typeof data === 'number') {
        return data;
      } else if (data && typeof data.count === 'number') {
        return data.count;
      } else if (data && typeof data.total === 'number') {
        return data.total;
      } else if (data && typeof data.pages === 'number') {
        return data.pages;
      }
      return null;
    },
    staleTime: 60000, // cache for 1 minute
  });

  return data ?? null;
};
