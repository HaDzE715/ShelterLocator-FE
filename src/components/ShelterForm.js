import { useState } from 'react';
import { useSheltersContext } from '../hooks/useSheltersContext';
import React from 'react';

const ShelterForm = () => {
    const { dispatch } = useSheltersContext();

    const [Name, setName] = useState('');
    const [Location, setLocation] = useState('');
    const [Capacity, setCapacity] = useState('');
    const [error, setError] = useState(null);

    const handleSumbit = async (e) => {
        e.preventDefault(); // To prevent page from refreshing

        if (!Name || !Location || !Capacity) {
            setError('Name, Location, and Capacity are required');
            return;
        }

        const shelter = {Name, Location, Capacity};

        const response = await fetch('/shelters', {
            method: 'POST',
            body: JSON.stringify(shelter),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const json = await response.json();

        if(!response.ok){
            setError(json.error);
        }
        if(response.ok){
            setName('');
            setLocation('');
            setCapacity('');
            setError(null);
            console.log('New shelter added', json);
            dispatch({type: 'CREATE_SHELTER', payload: json});
        }
    };

    return (
        <form className="create" onSubmit={handleSumbit}>
            <h3>Add a new Shelter</h3>

            <label>Name:</label>
            <input 
                type="text"
                onChange={(e) => setName(e.target.value)}
                value={Name}
            />

            <label>Location:</label>
            <input 
                type="text"
                onChange={(e) => setLocation(e.target.value)}
                value={Location}
            />

            <label>Capacity:</label>
            <input 
                type="number"
                onChange={(e) => setCapacity(e.target.value)}
                value={Capacity}
            />

            <button>Add Shelter</button>
            {error && <div className="error">{error}</div>}
        </form>
    );
};

export default ShelterForm;