import { fetchPeople } from "./actions";
import CardPeople from "./CardPeople";

export default async function PeopleSection() {
    const people = await fetchPeople();
    console.log(people);
    if (!people || people.length === 0) {
        return <div className="p-6 text-center text-gray-500">No se encontraron personas.</div>;
    }

    return (
        <div className="bg-white my-10 dark:bg-gray-900 max-w-7xl">
            <div className="px-4 lg:px-6">
                <div className="mx-auto lg:mx-0">
                    <h2 className="text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl dark:text-white">
                        Nuestro Talento Humano
                    </h2>
                    {/* <p className="mt-6 text-lg/8 text-gray-600 dark:text-gray-400">
                        Somos un grupo dinámico de individuos que están apasionados por lo que hacen y dedicados a ofrecer los
                        mejores resultados para nuestros clientes.
                    </p> */}
                </div>
                <ul
                    role="list"
                    className="mt-10 grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3 xl:grid-cols-4"
                >
                    {people.map((person) => (
                        <CardPeople key={person.id} person={person} />
                    ))}
                </ul>
            </div>
        </div>
    )
}
