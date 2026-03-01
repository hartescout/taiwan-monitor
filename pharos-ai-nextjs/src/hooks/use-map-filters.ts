import { useState, useMemo, useCallback } from 'react';

import {
  STRIKE_ARCS,
  MISSILE_TRACKS,
  TARGETS,
  ALLIED_ASSETS,
  THREAT_ZONES,
  HEAT_POINTS,
} from '@/data/mapData';
import {
  ALL_ACTORS,
  ALL_CATEGORIES,
  ALL_STATUSES,
} from '@/data/mapTokens';

import type { StrikeArc, MissileTrack, Target, Asset, ThreatZone, HeatPoint } from '@/data/mapData';
import type { Actor, MarkerCategory, MarkerStatus } from '@/data/mapTokens';

// ─── Types ────────────────────────────────────────────────────────────────────

export type FilterState = {
  actors:     Set<Actor>;
  categories: Set<MarkerCategory>;
  statuses:   Set<MarkerStatus>;
  showHeat:   boolean;
};

export type FilteredData = {
  strikes:  StrikeArc[];
  missiles: MissileTrack[];
  targets:  Target[];
  assets:   Asset[];
  zones:    ThreatZone[];
  heat:     HeatPoint[];
};

export type UseMapFiltersReturn = FilterState & FilteredData & {
  toggleActor:    (a: Actor) => void;
  toggleCategory: (c: MarkerCategory) => void;
  toggleStatus:   (s: MarkerStatus) => void;
  toggleHeat:     () => void;
  resetFilters:   () => void;
};

// ─── Defaults ─────────────────────────────────────────────────────────────────

const DEFAULT_STATE: FilterState = {
  actors:     new Set(ALL_ACTORS),
  categories: new Set(ALL_CATEGORIES),
  statuses:   new Set(ALL_STATUSES),
  showHeat:   true,
};

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useMapFilters(): UseMapFiltersReturn {
  const [state, setState] = useState<FilterState>(DEFAULT_STATE);

  const toggleActor = useCallback((a: Actor) => {
    setState(prev => {
      const next = new Set(prev.actors);
      next.has(a) ? next.delete(a) : next.add(a);
      // Always keep at least one actor active
      if (next.size === 0) return prev;
      return { ...prev, actors: next };
    });
  }, []);

  const toggleCategory = useCallback((c: MarkerCategory) => {
    setState(prev => {
      const next = new Set(prev.categories);
      next.has(c) ? next.delete(c) : next.add(c);
      if (next.size === 0) return prev;
      return { ...prev, categories: next };
    });
  }, []);

  const toggleStatus = useCallback((s: MarkerStatus) => {
    setState(prev => {
      const next = new Set(prev.statuses);
      next.has(s) ? next.delete(s) : next.add(s);
      if (next.size === 0) return prev;
      return { ...prev, statuses: next };
    });
  }, []);

  const toggleHeat = useCallback(() => {
    setState(prev => ({ ...prev, showHeat: !prev.showHeat }));
  }, []);

  const resetFilters = useCallback(() => {
    setState(DEFAULT_STATE);
  }, []);

  // Derived filtered datasets — recompute only when filter state changes
  const filtered = useMemo<FilteredData>(() => {
    const { actors, categories, statuses, showHeat } = state;
    const showKinetic      = categories.has('KINETIC');
    const showInstallation = categories.has('INSTALLATION');
    const showZone         = categories.has('ZONE');

    return {
      strikes:  showKinetic      ? STRIKE_ARCS.filter(d => actors.has(d.actor) && statuses.has(d.status))  : [],
      missiles: showKinetic      ? MISSILE_TRACKS.filter(d => actors.has(d.actor) && statuses.has(d.status)) : [],
      targets:  showInstallation ? TARGETS.filter(d => actors.has(d.actor) && statuses.has(d.status))       : [],
      assets:   showInstallation ? ALLIED_ASSETS.filter(d => actors.has(d.actor) && statuses.has(d.status)) : [],
      zones:    showZone         ? THREAT_ZONES.filter(d => actors.has(d.actor))                             : [],
      heat:     showHeat         ? HEAT_POINTS                                                               : [],
    };
  }, [state]);

  return {
    ...state,
    ...filtered,
    toggleActor,
    toggleCategory,
    toggleStatus,
    toggleHeat,
    resetFilters,
  };
}
