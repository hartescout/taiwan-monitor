import { useRef, useState, useCallback, useEffect } from 'react';

type DragHandle = 'left' | 'right' | 'range';

type UseTimelineDragReturn = {
  trackRef:        React.RefObject<HTMLDivElement | null>;
  dragging:        DragHandle | null;
  handleMouseDown: (e: React.MouseEvent | React.TouchEvent, handle: DragHandle) => void;
  handleTouchStart: (e: React.TouchEvent) => void;
  handleClick:     (e: React.MouseEvent) => void;
};

export function useTimelineDrag(
  viewExtent: [number, number],
  timeRange:  [number, number] | null,
  onTimeRange: (range: [number, number] | null) => void,
): UseTimelineDragReturn {
  const trackRef = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState<DragHandle | null>(null);
  const dragRef = useRef<{ startX: number; startRange: [number, number] } | null>(null);
  const didDragRef = useRef(false);

  const [vMin, vMax] = viewExtent;
  const span = vMax - vMin;
  const rng = timeRange ?? viewExtent;

  const toMs = useCallback((clientX: number) => {
    if (!trackRef.current) return vMin;
    const rect = trackRef.current.getBoundingClientRect();
    return vMin + (Math.max(0, Math.min(1, (clientX - rect.left) / rect.width)) * span);
  }, [vMin, span]);

  const getClientX = useCallback((e: MouseEvent | TouchEvent) => {
    if ('touches' in e && e.touches.length > 0) return e.touches[0].clientX;
    if ('changedTouches' in e && e.changedTouches.length > 0) return e.changedTouches[0].clientX;
    return (e as MouseEvent).clientX;
  }, []);

  const handleMouseDown = useCallback((e: React.MouseEvent | React.TouchEvent, handle: DragHandle) => {
    e.preventDefault(); e.stopPropagation();
    const clientX = 'touches' in e ? (e.touches[0]?.clientX ?? 0) : e.clientX;
    setDragging(handle);
    dragRef.current = { startX: clientX, startRange: [rng[0], rng[1]] };
    didDragRef.current = false;
  }, [rng]);

  useEffect(() => {
    if (!dragging) return;
    const move = (e: MouseEvent | TouchEvent) => {
      if ('touches' in e) e.preventDefault();
      didDragRef.current = true;
      const ms = toMs(getClientX(e));
      if (dragging === 'left') onTimeRange([Math.min(ms, rng[1] - span * 0.005), rng[1]]);
      else if (dragging === 'right') onTimeRange([rng[0], Math.max(ms, rng[0] + span * 0.005)]);
      else if (dragging === 'range' && dragRef.current && trackRef.current) {
        const dMs = ((getClientX(e) - dragRef.current.startX) / trackRef.current.getBoundingClientRect().width) * span;
        let nL = dragRef.current.startRange[0] + dMs, nR = dragRef.current.startRange[1] + dMs;
        if (nL < vMin) { nR += vMin - nL; nL = vMin; }
        if (nR > vMax) { nL -= nR - vMax; nR = vMax; }
        onTimeRange([nL, nR]);
      }
    };
    const up = () => setDragging(null);
    window.addEventListener('mousemove', move);
    window.addEventListener('touchmove', move, { passive: false });
    window.addEventListener('mouseup', up);
    window.addEventListener('touchend', up);
    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('touchmove', move);
      window.removeEventListener('mouseup', up);
      window.removeEventListener('touchend', up);
    };
  }, [dragging, getClientX, rng, vMin, vMax, span, toMs, onTimeRange]);

  const handleClick = useCallback((e: React.MouseEvent) => {
    if (didDragRef.current) { didDragRef.current = false; return; }
    const ms = toMs(e.clientX);
    const w = span * 0.12;
    onTimeRange([Math.max(vMin, ms - w / 2), Math.min(vMax, ms + w / 2)]);
  }, [toMs, span, vMin, vMax, onTimeRange]);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (dragging) return;
    const clientX = e.touches[0]?.clientX;
    if (clientX === undefined) return;
    const ms = toMs(clientX);
    const w = span * 0.12;
    onTimeRange([Math.max(vMin, ms - w / 2), Math.min(vMax, ms + w / 2)]);
  }, [dragging, toMs, span, vMin, vMax, onTimeRange]);

  return { trackRef, dragging, handleMouseDown, handleTouchStart, handleClick };
}
