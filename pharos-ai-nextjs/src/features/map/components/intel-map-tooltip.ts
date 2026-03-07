import type { PickingInfo } from '@deck.gl/core';

import type {
  StrikeArc,
  MissileTrack,
  Target,
  Asset,
  ThreatZone,
} from '@/data/map-data';

import type { TooltipObject } from './intel-map-layers';

export function getMapTooltip({ object, layer }: PickingInfo<TooltipObject>) {
  if (!object) return null;
  const layerId = layer?.id ?? '';
  let html = '';

  if (layerId === 'strikes') {
    const d = object as StrikeArc;
    const typeLabel = d.type === 'NAVAL_STRIKE' ? 'NAVAL STRIKE' : d.actor === 'ISRAEL' ? 'IDF STRIKE' : 'US STRIKE';
    const typeColor = d.type === 'NAVAL_STRIKE' ? '#32C8C8' : d.actor === 'ISRAEL' ? '#32C878' : '#4C9BE8';
    html = `
      <div style="font-weight:700;font-size:11px;color:#E8E8E8;margin-bottom:6px">${d.label}</div>
      <div style="color:${typeColor};font-size:10px;margin-bottom:2px">TYPE: ${typeLabel}</div>
      <div style="color:${d.severity === 'CRITICAL' ? '#E84C4C' : '#E8A84C'};font-size:10px">SEVERITY: ${d.severity}</div>
    `;
  } else if (layerId === 'missiles') {
    const d = object as MissileTrack;
    html = `
      <div style="font-weight:700;font-size:11px;color:#E84C4C;margin-bottom:6px">${d.label}</div>
      <div style="color:#E84C4C;font-size:10px;margin-bottom:2px">TYPE: IRGC BALLISTIC MISSILE</div>
      <div style="color:${d.severity === 'CRITICAL' ? '#E84C4C' : '#E8A84C'};font-size:10px;margin-bottom:2px">SEVERITY: ${d.severity}</div>
      <div style="color:${d.status === 'INTERCEPTED' ? '#FFC800' : '#E84C4C'};font-size:10px">STATUS: ${d.status === 'INTERCEPTED' ? '✓ INTERCEPTED' : '⚠ IMPACT CONFIRMED'}</div>
    `;
  } else if (layerId === 'targets') {
    const d = object as Target;
    const statusColor = d.status === 'DESTROYED' ? '#E84C4C' : d.status === 'DAMAGED' ? '#E8A84C' : '#E8E84C';
    const typeColor = d.type === 'NUCLEAR_SITE' ? '#B84CE8' : d.type === 'COMMAND' ? '#E84C4C' : d.type === 'NAVAL_BASE' ? '#4C9BE8' : '#8F99A8';
    html = `
      <div style="font-weight:700;font-size:12px;color:#E8E8E8;margin-bottom:6px">${d.name}</div>
      <div style="display:flex;gap:4px;margin-bottom:6px">
        <span style="background:${typeColor}22;border:1px solid ${typeColor};color:${typeColor};font-size:8px;padding:1px 5px;border-radius:2px">${d.type}</span>
        <span style="background:${statusColor}22;border:1px solid ${statusColor};color:${statusColor};font-size:8px;padding:1px 5px;border-radius:2px">${d.status}</span>
      </div>
      <div style="color:#C0C8D4;font-size:10px;line-height:1.5">${d.description}</div>
    `;
  } else if (layerId === 'assets') {
    const d = object as Asset;
    const nationColor = d.actor === 'US' ? '#4C9BE8' : '#32C8C8';
    let extraLine = '';
    if (d.type === 'CARRIER') {
      extraLine = `<div style="color:#E8E84C;font-size:10px;margin-top:4px;font-weight:700">▶ CARRIER STRIKE GROUP</div>`;
    }
    html = `
      <div style="font-weight:700;font-size:12px;color:#E8E8E8;margin-bottom:6px">${d.name}</div>
      <div style="display:flex;gap:4px;margin-bottom:4px">
        <span style="background:${nationColor}22;border:1px solid ${nationColor};color:${nationColor};font-size:8px;padding:1px 5px;border-radius:2px">${d.actor}</span>
        <span style="background:#2A2F38;border:1px solid #404854;color:#8F99A8;font-size:8px;padding:1px 5px;border-radius:2px">${d.type}</span>
      </div>
      ${d.description ? `<div style="color:#C0C8D4;font-size:10px;line-height:1.5;margin-top:4px">${d.description}</div>` : ''}
      ${extraLine}
    `;
  } else if (layerId === 'zones') {
    const d = object as ThreatZone;
    const zoneColor = d.type === 'CLOSURE' ? '#E84C4C' : d.type === 'PATROL' ? '#E8A84C' : d.type === 'NFZ' ? '#E8E84C' : '#E84C4C';
    html = `
      <div style="font-weight:700;font-size:11px;color:#E8E8E8;margin-bottom:4px">${d.name}</div>
      <div style="color:${zoneColor};font-size:10px">TYPE: ${d.type}</div>
    `;
  } else {
    const obj = object as unknown as Record<string, unknown>;
    const hasContent = obj.label || obj.name;
    if (!hasContent) return null;
    html = `<div style="font-size:11px;color:#E8E8E8">${String(obj.label ?? obj.name ?? '')}</div>`;
  }

  if (!html) return null;
  return {
    html: `<div style="background:#1C2127;border:1px solid #404854;padding:8px 10px;font-family:monospace;max-width:260px;border-radius:2px">${html}</div>`,
    style: { backgroundColor: 'transparent', border: 'none', padding: '0' },
  };
}
