import { useSheltersContext } from "../hooks/useSheltersContext";

const ShelterDetails = ({shelter}) => {
    const {dispatch} = useSheltersContext();

    const handleClick = async () => {
        const response = await fetch('/shelters/' + shelter._id, {
            method: 'DELETE'
        });
        const json = await response.json();

        if(response.ok){
            dispatch({type: 'DELETE_SHELTER', payload: json});
        }
    }
    
    return (
        <div className="shelter-details">
            <h4>{shelter.Name}</h4>
            <p><strong>Location: </strong>{shelter.Location}</p>
            <p><strong>Capacity: </strong>{shelter.Capacity}</p>
            <span id="delete-button" onClick={handleClick}>Delete</span>
            {/* <span id="delete-button" onClick={handleClick}>Edit</span> */}
        </div>
    )
}

export default ShelterDetails;