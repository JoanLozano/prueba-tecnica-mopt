"use client"

import { useEffect, useState } from 'react'

export default function ScrollProgress() {
    const [scrollProgress, setScrollProgress] = useState(0)

    useEffect(() => {
        const updateScrollProgress = () => {
            const scrollPx = document.documentElement.scrollTop
            const winHeightPx = document.documentElement.scrollHeight - document.documentElement.clientHeight
            const scrolled = (scrollPx / winHeightPx) * 100

            setScrollProgress(scrolled)
        }

        window.addEventListener('scroll', updateScrollProgress)
        return () => window.removeEventListener('scroll', updateScrollProgress)
    }, [])

    return (
        <div className="fixed top-0 left-0 right-0 z-[60] h-1 bg-gray-200 dark:bg-gray-800">
            <div
                className="h-full bg-gradient-to-r from-blue-600 to-indigo-600 transition-all duration-150 ease-out"
                style={{ width: `${scrollProgress}%` }}
            />
        </div>
    )
}
