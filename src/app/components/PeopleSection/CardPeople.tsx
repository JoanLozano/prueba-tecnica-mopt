"use client"

import { Person } from './types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAt, faEnvelope } from '@fortawesome/free-solid-svg-icons'

export default function CardPeople({ person }: { person: Person }) {
    return (
        <article className="bg-white dark:bg-gray-800 shadow-sm rounded-lg p-4 flex flex-col justify-between w-full will-change-transform transform transition-transform duration-200 hover:scale-105">
            <div className="flex items-center gap-4 mb-4">
                <div className="h-12 w-12 rounded-full bg-red-600 text-white flex items-center justify-center font-semibold">
                    {(person.name ?? '')
                        .split(/\s+/)
                        .map(n => n[0])
                        .filter(Boolean)
                        .slice(0, 2)
                        .join('')
                        .toUpperCase()}
                </div>
                <div>
                    <h3 className="text-lg font-medium">{person.name}</h3>
                    <p className="text-sm text-gray-500">
                        <FontAwesomeIcon icon={faAt} className="inline-block mr-1" />
                        {person.username}
                    </p>
                </div>
            </div>

            <div className="text-sm text-gray-700 dark:text-gray-300 space-y-1 mt-4">
                <p className='w-full flex justify-start items-center'>
                    <FontAwesomeIcon icon={faEnvelope} className="inline-block mr-2" />
                    <a href={`mailto:${person.email}`} className="text-indigo-600">
                        {person.email}
                    </a>
                </p>
            </div>
        </article>
    )
}
