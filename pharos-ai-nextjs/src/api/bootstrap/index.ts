import { useQuery } from '@tanstack/react-query';
import type { BootstrapData } from '@/types/domain';
import { api } from '../client';
import { queryKeys } from '../keys';

export function useBootstrap() {
  return useQuery({
    queryKey: queryKeys.bootstrap.all(),
    queryFn: () => api.get<BootstrapData>('/bootstrap'),
    staleTime: 5 * 60 * 1000,
  });
}
