import { SheltersContext } from '../context/ShelterContext';
import { useContext } from 'react';

export const useSheltersContext = () => {
    const context = useContext(SheltersContext);

    if(!context){
        throw Error('useShelterContext have to be used in ShelterContextProvider');
    }
    
    return context;
};