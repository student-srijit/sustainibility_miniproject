"use client"

import { useEffect, useRef } from "react"

export default function MapComponent() {
  const mapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window !== "undefined" && mapRef.current) {
      // Dynamically import Leaflet to avoid SSR issues
      import("leaflet").then((L) => {
        // Dayananda Sagar College of Engineering coordinates
        const lat = 12.9034
        const lng = 77.5428

        const map = L.map(mapRef.current!).setView([lat, lng], 15)

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(map)

        // Custom marker icon
        const customIcon = L.divIcon({
          html: `
            <div class="relative">
              <div class="w-8 h-8 bg-gradient-to-r from-blue-600 to-green-600 rounded-full flex items-center justify-center shadow-lg animate-bounce">
                <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
              </div>
              <div class="absolute top-10 left-1/2 transform -translate-x-1/2 bg-white px-3 py-1 rounded-lg shadow-lg text-sm font-semibold text-gray-800 whitespace-nowrap">
                Dayananda Sagar College
              </div>
            </div>
          `,
          className: "custom-marker",
          iconSize: [32, 32],
          iconAnchor: [16, 16],
        })

        L.marker([lat, lng], { icon: customIcon }).addTo(map)

        // Add a circle to highlight the area
        L.circle([lat, lng], {
          color: "#3B82F6",
          fillColor: "#3B82F6",
          fillOpacity: 0.1,
          radius: 500,
        }).addTo(map)

        // Cleanup function
        return () => {
          map.remove()
        }
      })
    }
  }, [])

  return <div ref={mapRef} className="w-full h-full rounded-lg" />
}
