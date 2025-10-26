import { fetchPeople } from "./actions";
import PeopleSectionClient from "./PeopleSectionClient";

export default async function PeopleSection() {
    const people = await fetchPeople();

    return <PeopleSectionClient initialPeople={people} />
}
