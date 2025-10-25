"use client"

import { useState, useEffect } from 'react';
import CardPeople from "./CardPeople";
import { Person } from './types';

let peopleExpandedInMemory = false;

export default function PeopleGrid({ people }: { people: Person[] }) {
    const [displayCount, setDisplayCount] = useState(people.length);
    const [isMobile, setIsMobile] = useState(false);
    const [expanded, setExpanded] = useState<boolean>(() => peopleExpandedInMemory);

    useEffect(() => {
        const checkIfMobile = () => {
            const mobile = window.innerWidth < 640;
            setIsMobile(mobile);
            if (!expanded) {
                setDisplayCount(mobile ? 4 : people.length);
            } else {
                setDisplayCount(people.length);
            }
        };

        checkIfMobile();

        window.addEventListener('resize', checkIfMobile);

        return () => window.removeEventListener('resize', checkIfMobile);
    }, [people.length, expanded]);

    useEffect(() => {
        if (expanded) {
            setDisplayCount(people.length);
        }
    }, [people.length, expanded]);

    const displayedPeople = people.slice(0, displayCount);
    const hasMoreToShow = displayCount < people.length;

    return (
        <>
            <ul
                role="list"
                className="mt-10 grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3 xl:grid-cols-4"
            >
                {displayedPeople.map((person, index) => (
                    <li
                        key={person.id}
                        className="animate__animated animate__fadeInUp"
                        style={{ animationDelay: `${index * 0.1}s`, animationDuration: '0.5s' }}
                    >
                        <CardPeople person={person} />
                    </li>
                ))}
            </ul>

            {isMobile && hasMoreToShow && !expanded && (
                <div className="mt-8 flex justify-center">
                    <button
                        onClick={() => {
                            setExpanded(true);
                            peopleExpandedInMemory = true;
                            setDisplayCount(people.length);
                        }}
                        className="rounded-md bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                    >
                        Ver más
                    </button>
                </div>
            )}
        </>
    );
}