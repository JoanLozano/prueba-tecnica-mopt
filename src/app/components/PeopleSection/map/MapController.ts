import maplibregl from "maplibre-gl"
import type { People } from "../types"
import { buildPopupHTML, createMarkerElement, parseCoords } from "./utils"
import type { MapControllerOptions, MarkerRenderer, PopupRenderer } from "./types"

export class MapController {
  private map: maplibregl.Map
  private markers: maplibregl.Marker[] = []
  private markerRenderer: MarkerRenderer
  private popupRenderer: PopupRenderer

  constructor(container: HTMLDivElement, options?: MapControllerOptions) {
    const {
      styleUrl = "https://demotiles.maplibre.org/style.json",
      center = [0, 20],
      zoom = 1.5,
      markerRenderer = createMarkerElement,
      popupRenderer = buildPopupHTML,
    } = options || {}

    this.markerRenderer = markerRenderer
    this.popupRenderer = popupRenderer

    this.map = new maplibregl.Map({
      container,
      style: styleUrl,
      center,
      zoom,
    })

    this.map.addControl(new maplibregl.NavigationControl(), "top-right")
  }

  addPeople(people: People) {
    // clear existing markers
    this.clearMarkers()

    people.forEach((person) => {
      const coords = parseCoords(person)
      if (!coords) return

      const el = this.markerRenderer(person)
      const popup = new maplibregl.Popup({ offset: 25, closeButton: false, className: "custom-popup" })
        .setHTML(this.popupRenderer(person))

      const marker = new maplibregl.Marker({ element: el })
        .setLngLat([coords.lng, coords.lat])
        .setPopup(popup)
        .addTo(this.map)

      this.markers.push(marker)
    })
  }

  fitToPeople(people: People) {
    const bounds = new maplibregl.LngLatBounds()
    let hasAny = false
    people.forEach((p) => {
      const coords = parseCoords(p)
      if (!coords) return
      hasAny = true
      bounds.extend([coords.lng, coords.lat])
    })
    if (hasAny) {
      this.map.fitBounds(bounds, { padding: 50, maxZoom: 10 })
    }
  }

  destroy() {
    this.clearMarkers()
    this.map.remove()
  }

  private clearMarkers() {
    this.markers.forEach((m) => m.remove())
    this.markers = []
  }
}
