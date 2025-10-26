"use client"

import { useEffect, useRef } from 'react'
import maplibregl from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'
import { People } from './types'

interface MapViewProps {
    people: People
}

export default function MapView({ people }: MapViewProps) {
    const mapContainer = useRef<HTMLDivElement>(null)
    const map = useRef<maplibregl.Map | null>(null)

    useEffect(() => {
        if (map.current || !mapContainer.current) return // Initializa el mapa solo una vez

        // Crear el mapa
        map.current = new maplibregl.Map({
            container: mapContainer.current,
            style: 'https://demotiles.maplibre.org/style.json', 
            center: [0, 20],
            zoom: 1.5
        })

        // Agrega controles de navegación
        map.current.addControl(new maplibregl.NavigationControl(), 'top-right')

        // Agregar marcadores para cada persona
        people.forEach((person) => {
            const lat = parseFloat(person.address.geo.lat)
            const lng = parseFloat(person.address.geo.lng)

            // Valida que las coordenadas sean números válidos
            if (isNaN(lat) || isNaN(lng)) return

            // Crear elemento de marcador personalizado con forma de chincheta
            const el = document.createElement('div')
            el.className = 'custom-marker'
            el.innerHTML = `
                <svg width="30" height="40" viewBox="0 0 24 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 9 12 24 12 24s12-15 12-24c0-6.627-5.373-12-12-12z" fill="#ef4444"/>
                    <circle cx="12" cy="12" r="6" fill="white"/>
                    <circle cx="12" cy="12" r="3" fill="#dc2626"/>
                </svg>
            `
            el.style.cursor = 'pointer'
            el.style.filter = 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))'

            // Obtener iniciales para el avatar
            const initials = (person.name ?? '')
                .split(/\s+/)
                .map(n => n[0])
                .filter(Boolean)
                .slice(0, 2)
                .join('')
                .toUpperCase()

            // Crear popup con información de la persona (estilo similar al card)
            const popup = new maplibregl.Popup({ 
                offset: 25,
                closeButton: false,
                className: 'custom-popup'
            }).setHTML(`
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
            `)

            // Agregar marcador al mapa
            new maplibregl.Marker({ element: el })
                .setLngLat([lng, lat])
                .setPopup(popup)
                .addTo(map.current!)
        })

        // Ajustar el mapa para mostrar todos los marcadores
        if (people.length > 0) {
            const bounds = new maplibregl.LngLatBounds()
            people.forEach((person) => {
                const lat = parseFloat(person.address.geo.lat)
                const lng = parseFloat(person.address.geo.lng)
                if (!isNaN(lat) && !isNaN(lng)) {
                    bounds.extend([lng, lat])
                }
            })
            map.current.fitBounds(bounds, { padding: 50, maxZoom: 10 })
        }

        // Cleanup
        return () => {
            map.current?.remove()
            map.current = null
        }
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
