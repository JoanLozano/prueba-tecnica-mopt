import type { Person } from "../types"

export type MarkerRenderer = (person: Person) => HTMLElement
export type PopupRenderer = (person: Person) => string

export interface MapControllerOptions {
  styleUrl?: string
  center?: [number, number]
  zoom?: number
  markerRenderer?: MarkerRenderer
  popupRenderer?: PopupRenderer
}
