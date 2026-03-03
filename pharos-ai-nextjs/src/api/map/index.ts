import { useQuery } from '@tanstack/react-query';
import type { MapStory } from '@/types/domain';
import type { StrikeArc, MissileTrack, Target, Asset, ThreatZone, HeatPoint } from '@/data/map-data';
import type { DataArrays } from '@/lib/map-filter-engine';
import { api } from '../client';
import { queryKeys } from '../keys';

const CONFLICT_ID = process.env.NEXT_PUBLIC_CONFLICT_ID!;

export type MapDataResponse = {
  strikes: StrikeArc[];
  missiles: MissileTrack[];
  targets: Target[];
  assets: Asset[];
  threatZones: ThreatZone[];
  heatPoints: HeatPoint[];
};

function toDataArrays(r: MapDataResponse): DataArrays {
  return {
    strikes:  r.strikes  ?? [],
    missiles: r.missiles ?? [],
    targets:  r.targets  ?? [],
    assets:   r.assets   ?? [],
    zones:    r.threatZones ?? [],
    heat:     r.heatPoints  ?? [],
  };
}

export function useMapData(id: string = CONFLICT_ID) {
  return useQuery({
    queryKey: queryKeys.map.data(id),
    queryFn: () => api.get<MapDataResponse>(`/conflicts/${id}/map/data`),
    staleTime: 5 * 60 * 1000,
    select: toDataArrays,
  });
}

export function useMapStories(id: string = CONFLICT_ID) {
  return useQuery({
    queryKey: queryKeys.map.stories(id),
    queryFn: () => api.get<MapStory[]>(`/conflicts/${id}/map/stories`),
    staleTime: 5 * 60 * 1000,
  });
}
