import { useState } from 'react';
import { useSheltersContext } from '../hooks/useSheltersContext';
import React from 'react';

const ShelterDetails = ({ shelter }) => {
    const { dispatch } = useSheltersContext();
    const [isEditing, setIsEditing] = useState(false);
    const [editedName, setEditedName] = useState(shelter.Name);
    const [editedLocation, setEditedLocation] = useState(shelter.Location);
    const [editedCapacity, setEditedCapacity] = useState(shelter.Capacity);
    const [error, setError] = useState('');

    const handleDeleteClick = async () => {
        const response = await fetch('/shelters/' + shelter._id, {
            method: 'DELETE'
        });
        const json = await response.json();

        if(response.ok){
            dispatch({ type: 'DELETE_SHELTER', payload: json });
        }
    };

    const handleEditClick = async () => {
        setIsEditing(true);
    };

    const handleSaveClick = async () => {
        try {
            if (!editedName || !editedLocation || !editedCapacity) {
                throw new Error('All fields are required');
            }
            
            const updatedShelter = {
                ...shelter,
                Name: editedName,
                Location: editedLocation,
                Capacity: editedCapacity
            };
    
            const response = await fetch('/shelters/' + shelter._id, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedShelter)
            });
    
            if (!response.ok) {
                throw new Error('Failed to update shelter');
            }
    
            dispatch({ type: 'UPDATE_SHELTER', payload: { _id: shelter._id, updatedShelter } });
    
            setIsEditing(false);
        } catch (error) {
            console.error('Error updating shelter:', error);
            setError(error.message);
        }
    };

    return (
        <div className="shelter-details">
            {isEditing ? (
                <>
                    <label>Name: </label>
                    <input type="text" value={editedName} onChange={(e) => setEditedName(e.target.value)} />
                    <label>Location: </label>
                    <input type="text" value={editedLocation} onChange={(e) => setEditedLocation(e.target.value)} />
                    <label>Capacity: </label>
                    <input type="number" value={editedCapacity} onChange={(e) => setEditedCapacity(e.target.value)} />
                    <button id="save-button" onClick={handleSaveClick}>Save</button>
                    {error && <div className="error">{error}</div>}
                </>
            ) : (
                <>
                    <h4>{shelter.Name}</h4>
                    <p><strong>Location: </strong>{shelter.Location}</p>
                    <p><strong>Capacity: </strong>{shelter.Capacity}</p>
                    <span id="delete-button" onClick={handleDeleteClick}>Delete</span>
                    <span id="edit-button" onClick={handleEditClick}>Edit</span>
                </>
            )}
        </div>
    );
};

export default ShelterDetails;
