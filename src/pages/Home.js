import { useEffect, useState } from "react";
import { useSheltersContext } from '../hooks/useSheltersContext'

// components
import ShelterDetails from '../components/ShelterDetails'
import ShelterForm from '../components/ShelterForm'

const Home = () => {
    // const [shelters, setShelters] = useState(null);
    const { shelters, dispatch } = useSheltersContext()

    useEffect(() => {
        const fetchShelters = async () => {
            const response = await fetch('/shelters');
            const json = await response.json();

            if(response.ok){
                const reversedShelters = json.reverse();
                dispatch({type: 'SET_SHELTERS', payload: reversedShelters});
            }
        }

        fetchShelters();
    }, []);


    return (
    <div className="home">
        <div className="shelters">
            {shelters && shelters.map((shelter) => (
                <ShelterDetails key={shelter._id} shelter={shelter} />
            ))}
        </div>
        <ShelterForm />
    </div>
    )
}

export default Home;