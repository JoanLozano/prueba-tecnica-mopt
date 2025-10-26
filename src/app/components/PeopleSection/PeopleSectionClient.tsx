"use client"

import { useState } from "react";
import PeopleGrid from "./PeopleGrid";
import MapView from "./MapView";
import EmptyState from "../EmptyState";
import PersonModal from "../PersonModal";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import { Person } from "./types";

interface PeopleSectionProps {
    initialPeople: Person[]
}

export default function PeopleSectionClient({ initialPeople }: PeopleSectionProps) {
    const [selectedPerson, setSelectedPerson] = useState<Person | null>(null)

    const handleViewDetails = (person: Person) => {
        setSelectedPerson(person)
    }

    const handleCloseModal = () => {
        setSelectedPerson(null)
    }

    return (
        <>
            <section id="people" className=" bg-white my-10 dark:bg-gray-900 max-w-7xl w-full mx-auto">
                <div className="px-4 lg:px-6 py-5">
                    <div className="mx-auto lg:mx-0">
                        <h2 className="text-2xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-[32px] dark:text-white">
                            Nuestro Talento Humano
                        </h2>
                    </div>
                    {(!Array.isArray(initialPeople) || initialPeople.length === 0) ? (
                        <EmptyState
                            icon={faUsers}
                            title="No se encontraron personas"
                            description="Actualmente no hay miembros del equipo para mostrar. Por favor, vuelve más tarde."
                        />
                    ) : (
                        <>
                            <PeopleGrid people={initialPeople} onViewDetails={handleViewDetails} />
                            <MapView people={initialPeople} />
                        </>
                    )}
                </div>
            </section>

            {/* Modal centralizado y centrado, fuera de la sección */}
            {selectedPerson && (
                <PersonModal
                    person={selectedPerson}
                    isOpen={!!selectedPerson}
                    onClose={handleCloseModal}
                />
            )}
        </>
    )
}
