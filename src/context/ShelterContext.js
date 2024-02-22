import { createContext, useReducer } from "react";

export const SheltersContext = createContext();

export const sheltersReducer = (state, action) => {
    switch (action.type){
        case 'SET_SHELTERS':
            return {
                shelters: action.payload
            }
        case 'CREATE_SHELTER':
            return {
                shelters: [action.payload, ...state.shelters]
            }
        case 'DELETE_SHELTER':
            return {
                shelters: state.shelters.filter((s) => s._id !== action.payload._id)
                }
        case 'UPDATE_SHELTER':
            return {
                ...state,
                shelters: state.shelters.map(shelter => {
                    if (shelter._id === action.payload._id) {
                        return action.payload.updatedShelter;
                    }
                    return shelter;
                })
            };
        default:
            return state
    }
}

export const SheltersContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(sheltersReducer, {
        shelters: null
    });
    
    return(
        <SheltersContext.Provider value={{...state, dispatch}}>
            { children }
        </SheltersContext.Provider>
    )
} 