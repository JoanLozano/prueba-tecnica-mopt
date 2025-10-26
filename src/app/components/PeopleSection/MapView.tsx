"use client"

import { useEffect, useRef } from 'react'
import 'maplibre-gl/dist/maplibre-gl.css'
import { People } from './types'
import { MapController } from './map/MapController'

interface MapViewProps {
    people: People
}

export default function MapView({ people }: MapViewProps) {
    const mapContainer = useRef<HTMLDivElement>(null)
    const controllerRef = useRef<MapController | null>(null)

    // Initialize controller once
    useEffect(() => {
        if (!mapContainer.current || controllerRef.current) return
        controllerRef.current = new MapController(mapContainer.current, {
            styleUrl: 'https://demotiles.maplibre.org/style.json',
            center: [0, 20],
            zoom: 1.5,
        })
        return () => {
            controllerRef.current?.destroy()
            controllerRef.current = null
        }
    }, [])

    // Update markers when people change
    useEffect(() => {
        if (!controllerRef.current) return
        controllerRef.current.addPeople(people)
        controllerRef.current.fitToPeople(people)
    }, [people])

    return (
        <div className="w-full mt-10">
            <h3 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
                Ubicaciones del Equipo
            </h3>
            <div 
                ref={mapContainer} 
                className="w-full h-[300px] sm:h-[400px] lg:h-[500px] rounded-lg shadow-lg border border-gray-200 dark:border-gray-700"
            />
            <style jsx global>{`
                .maplibregl-popup-content {
                    padding: 0 !important;
                    box-shadow: none !important;
                    background: transparent !important;
                }
                .maplibregl-popup-tip {
                    display: none !important;
                }
            `}</style>
        </div>
    )
}
