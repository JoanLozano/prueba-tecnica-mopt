import type { Person } from "../types"

export function getInitials(name: string | null | undefined): string {
  return (name ?? "")
    .split(/\s+/)
    .map((n) => n[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase()
}

export function parseCoords(person: Person): { lat: number; lng: number } | null {
  const lat = parseFloat(person.address.geo.lat)
  const lng = parseFloat(person.address.geo.lng)
  if (Number.isNaN(lat) || Number.isNaN(lng)) return null
  return { lat, lng }
}

export function createMarkerElement(): HTMLElement {
  const el = document.createElement("div")
  el.className = "custom-marker"
  el.innerHTML = `
    <svg width="30" height="40" viewBox="0 0 24 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 0C5.373 0 0 5.373 0 12c0 9 12 24 12 24s12-15 12-24c0-6.627-5.373-12-12-12z" fill="#ef4444"/>
      <circle cx="12" cy="12" r="6" fill="white"/>
      <circle cx="12" cy="12" r="3" fill="#dc2626"/>
    </svg>
  `
  el.style.cursor = "pointer"
  el.style.filter = "drop-shadow(0 2px 4px rgba(0,0,0,0.3))"
  return el
}

export function buildPopupHTML(person: Person): string {
  const initials = getInitials(person.name)
  return `
    <div style="
      background: var(--background);
      border-radius: 8px;
      padding: 16px;
      min-width: 250px;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    ">
      <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
        <div style="
          height: 48px;
          width: 48px;
          border-radius: 50%;
          background-color: #ef4444;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          font-size: 16px;
          flex-shrink: 0;
        ">${initials}</div>
        <div style="flex: 1; min-width: 0;">
          <h3 style="
            margin: 0;
            font-size: 18px;
            font-weight: 500;
            color: var(--foreground);
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          ">${person.name}</h3>
          <p style="
            margin: 2px 0 0 0;
            font-size: 14px;
            color: var(--foreground);
            opacity: 0.7;
            display: flex;
            align-items: center;
            gap: 4px;
          ">
            <span style="opacity: 0.7;">@</span>${person.username}
          </p>
        </div>
      </div>
      <div style="
        font-size: 14px;
        color: var(--foreground);
        opacity: 0.85;
        line-height: 1.5;
      ">
        <p style="
          margin: 0 0 8px 0;
          display: flex;
          align-items: center;
          gap: 6px;
        ">
          <svg width="14" height="14" viewBox="0 0 20 20" fill="currentColor" style="color: #6366f1; flex-shrink: 0;">
            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
          </svg>
          <a href="mailto:${person.email}" style="
            color: #4f46e5;
            text-decoration: none;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          ">${person.email}</a>
        </p>
        <p style="
          margin: 0;
          font-size: 12px;
          color: var(--foreground);
          opacity: 0.6;
        ">${person.address.city}, ${person.address.street}</p>
      </div>
    </div>
  `
}
