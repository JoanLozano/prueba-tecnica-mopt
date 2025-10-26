"use client"

import { Person } from './types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAt, faEnvelope } from '@fortawesome/free-solid-svg-icons'

interface CardPeopleProps {
    person: Person
    onViewDetails: (person: Person) => void
}

export default function CardPeople({ person, onViewDetails }: CardPeopleProps) {
    const initials = (person.name ?? '')
        .split(/\s+/)
        .map(n => n[0])
        .filter(Boolean)
        .slice(0, 2)
        .join('')
        .toUpperCase()

    return (
        <article 
            className="bg-white dark:bg-gray-800 shadow-sm rounded-lg p-4 flex flex-col justify-between w-full will-change-transform transform transition-all duration-200 hover:scale-105 hover:shadow-lg cursor-pointer group"
            onClick={() => onViewDetails(person)}
        >
            <div className="flex items-center gap-4 mb-4">
                <div className="h-12 w-12 rounded-full bg-red-600 text-white flex items-center justify-center font-semibold shrink-0 group-hover:bg-red-700 transition-colors">
                    {initials}
                </div>
                <div className="min-w-0 flex-1">
                    <h3 className="text-lg font-medium truncate">{person.name}</h3>
                    <p className="text-sm text-gray-500 truncate">
                        <FontAwesomeIcon icon={faAt} className="inline-block mr-1" />
                        {person.username}
                    </p>
                </div>
            </div>

            <div className="text-sm text-gray-700 dark:text-gray-300 space-y-1 mt-4">
                <p className='w-full flex justify-start items-center truncate'>
                    <FontAwesomeIcon icon={faEnvelope} className="inline-block mr-2 shrink-0" />
                    <a 
                        href={`mailto:${person.email}`} 
                        className="text-indigo-600 hover:text-indigo-700 dark:text-blue-400 dark:hover:text-blue-300 truncate"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {person.email}
                    </a>
                </p>
            </div>
{/* 
            <div className="mt-4 text-xs text-gray-500 dark:text-gray-400 border-t pt-3 border-gray-200 dark:border-gray-700">
                <p className="truncate">📍 {person.address.city}</p>
                <p className="mt-1 text-blue-600 dark:text-blue-400 font-medium">
                    Click para ver más detalles
                </p>
            </div> */}
        </article>
    )
}
