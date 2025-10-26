"use client"

import { useState, useEffect, useMemo } from 'react';
import CardPeople from "./CardPeople";
import { Person } from './types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSortAlphaDown, faSortAlphaUp } from '@fortawesome/free-solid-svg-icons';

let peopleExpandedInMemory = false;

interface PeopleGridProps {
    people: Person[]
    onViewDetails: (person: Person) => void
}

export default function PeopleGrid({ people, onViewDetails }: PeopleGridProps) {
    const [displayCount, setDisplayCount] = useState(people.length);
    const [isMobile, setIsMobile] = useState(false);
    const [expanded, setExpanded] = useState<boolean>(() => peopleExpandedInMemory);
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

    // Sort people
    const sortedPeople = useMemo(() => {
        const sorted = [...people];
        sorted.sort((a, b) => {
            const comparison = a.name.localeCompare(b.name);
            return sortOrder === 'asc' ? comparison : -comparison;
        });
        return sorted;
    }, [people, sortOrder]);

    useEffect(() => {
        const checkIfMobile = () => {
            const mobile = window.innerWidth < 640;
            setIsMobile(mobile);
            if (!expanded) {
                setDisplayCount(mobile ? 4 : sortedPeople.length);
            } else {
                setDisplayCount(sortedPeople.length);
            }
        };

        checkIfMobile();
        window.addEventListener('resize', checkIfMobile);
        return () => window.removeEventListener('resize', checkIfMobile);
    }, [sortedPeople.length, expanded]);

    useEffect(() => {
        if (expanded) {
            setDisplayCount(sortedPeople.length);
        }
    }, [sortedPeople.length, expanded]);

    const displayedPeople = sortedPeople.slice(0, displayCount);
    const hasMoreToShow = displayCount < sortedPeople.length;

    return (
        <>
            {/* Sort and Counter */}
            <div className="mt-8 flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
                {/* Sort Button */}
                <button
                    onClick={() => setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')}
                    className="px-4 py-2 text-sm font-medium border border-gray-300 rounded-lg hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800 dark:text-white transition-colors flex items-center gap-2"
                >
                    <FontAwesomeIcon 
                        icon={sortOrder === 'asc' ? faSortAlphaDown : faSortAlphaUp} 
                        className="w-4 h-4"
                    />
                    <span>
                        Ordenar: {sortOrder === 'asc' ? 'A-Z' : 'Z-A'}
                    </span>
                </button>

                {/* Results Counter */}
                <div className="text-sm text-gray-600 dark:text-gray-400">
                    <span className="font-medium">{sortedPeople.length}</span> 
                    {sortedPeople.length === 1 ? ' persona' : ' personas'}
                </div>
            </div>

            {/* People Grid */}
            <ul
                role="list"
                className="mt-6 grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3 xl:grid-cols-4"
            >
                {displayedPeople.map((person, index) => (
                    <li
                        key={person.id}
                        className="animate__animated animate__fadeInUp"
                        style={{ animationDelay: `${index * 0.05}s`, animationDuration: '0.4s' }}
                    >
                        <CardPeople person={person} onViewDetails={onViewDetails} />
                    </li>
                ))}
            </ul>

            {isMobile && hasMoreToShow && !expanded && (
                <div className="mt-8 flex justify-center">
                    <button
                        onClick={() => {
                            setExpanded(true);
                            peopleExpandedInMemory = true;
                            setDisplayCount(sortedPeople.length);
                        }}
                        className="rounded-md bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-colors"
                    >
                        Ver más
                    </button>
                </div>
            )}
        </>
    );
}