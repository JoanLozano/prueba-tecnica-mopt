import { fetchPeople } from "./actions";
import PeopleGrid from "./PeopleGrid";
import MapView from "./MapView";

export default async function PeopleSection() {
    const people = await fetchPeople();

    return (
        <section className="bg-white my-10 dark:bg-gray-900 max-w-7xl">
            <div className="px-4 lg:px-6 py-5">
                <div className="mx-auto lg:mx-0">
                    <h2 className="text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl dark:text-white">
                        Nuestro Talento Humano
                    </h2>
                </div>
                {(!Array.isArray(people) || people.length === 0) ? (
                    <div className="p-6 text-center text-gray-500">No se encontraron personas.</div>
                ) : (
                    <>
                        <PeopleGrid people={people} />
                        <MapView people={people} />
                    </>
                )}
            </div>
        </section>
    )
}
