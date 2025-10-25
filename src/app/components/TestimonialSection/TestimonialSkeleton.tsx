"use client"

export default function TestimonialSkeleton() {
    return (
        <div className="w-full h-full border border-gray-100 shadow rounded relative isolate overflow-hidden bg-white px-6 py-24 sm:py-32 lg:px-8 dark:bg-gray-900 animate-pulse">
            <div className="mx-auto max-w-2xl lg:max-w-4xl">
                <div className="space-y-4">
                    {/* Título simulado */}
                    <div className="h-8 bg-gray-200 rounded w-3/4 dark:bg-gray-700" />
                    {/* Contenido simulado */}
                    <div className="space-y-3">
                        <div className="h-4 bg-gray-200 rounded w-full dark:bg-gray-700" />
                        <div className="h-4 bg-gray-200 rounded w-5/6 dark:bg-gray-700" />
                        <div className="h-4 bg-gray-200 rounded w-4/6 dark:bg-gray-700" />
                    </div>
                </div>
            </div>
        </div>
    )
}