import { useAppSelector, useAppDispatch } from '@/store';
import {
  toggleDataset  as toggleDatasetAction,
  toggleType     as toggleTypeAction,
  toggleActor    as toggleActorAction,
  togglePriority as togglePriorityAction,
  toggleStatus   as toggleStatusAction,
  toggleHeat     as toggleHeatAction,
  setTimeRange   as setTimeRangeAction,
  setViewExtent  as setViewExtentAction,
  resetFilters   as resetFiltersAction,
  DATA_EXTENT,
} from '@/store/map-slice';
import { selectFilterState, selectFilteredData, selectIsFiltered } from '@/store/map-selectors';

import type { FilterState, FilteredData, FilterFacets } from '@/lib/map-filter-engine';

// ─── Re-exports ─────────────────────────────────────────────────────────────────

export type { FilterState, FilteredData, FilterFacets };

// ─── Dataset names (for the top bar) ────────────────────────────────────────────

export type DatasetName = 'strikes' | 'missiles' | 'targets' | 'assets' | 'zones';

export const ALL_DATASETS: DatasetName[] = ['strikes', 'missiles', 'targets', 'assets', 'zones'];

export const DATASET_LABEL: Record<DatasetName, string> = {
  strikes: 'STRIKES', missiles: 'MISSILES', targets: 'TARGETS', assets: 'ASSETS', zones: 'ZONES',
};

// ─── Return type ────────────────────────────────────────────────────────────────

export type UseMapFiltersReturn = {
  state:    FilterState;
  filtered: FilteredData;
  facets:   FilterFacets;
  /** Absolute min/max of all timestamped data */
  dataExtent:   [number, number];
  /** Current visible window on the timeline (zoom level) */
  viewExtent:   [number, number];
  setViewExtent: (ext: [number, number]) => void;
  toggleDataset:  (d: string) => void;
  toggleType:     (t: string) => void;
  toggleActor:    (a: string) => void;
  togglePriority: (p: string) => void;
  toggleStatus:   (s: string) => void;
  toggleHeat:     () => void;
  setTimeRange:   (range: [number, number] | null) => void;
  resetFilters:   () => void;
  isFiltered:     boolean;
};

// ─── Hook (Redux adapter — same return type as before) ──────────────────────────

export function useMapFilters(): UseMapFiltersReturn {
  const dispatch = useAppDispatch();
  const viewExtent = useAppSelector(s => s.map.viewExtent);
  const { filtered, facets } = useAppSelector(selectFilteredData);
  const isFiltered = useAppSelector(selectIsFiltered);
  const state: FilterState = useAppSelector(selectFilterState);

  return {
    state,
    filtered,
    facets,
    dataExtent: DATA_EXTENT,
    viewExtent,
    setViewExtent: (ext) => dispatch(setViewExtentAction(ext)),
    toggleDataset:  (d) => dispatch(toggleDatasetAction(d)),
    toggleType:     (t) => dispatch(toggleTypeAction(t)),
    toggleActor:    (a) => dispatch(toggleActorAction(a)),
    togglePriority: (p) => dispatch(togglePriorityAction(p)),
    toggleStatus:   (s) => dispatch(toggleStatusAction(s)),
    toggleHeat:     ()  => dispatch(toggleHeatAction()),
    setTimeRange:   (r) => dispatch(setTimeRangeAction(r)),
    resetFilters:   ()  => dispatch(resetFiltersAction()),
    isFiltered,
  };
}
