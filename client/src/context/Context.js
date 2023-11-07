import {createContext, useEffect, useReducer} from 'react';
import Reducer from './Reducer';

const INITIAL_STATE = {
    //agar user hai inside local storage toh user mai aajaye warna nahi hai kuch storage mei toh null
    user:JSON.parse(localStorage.getItem("user"))||null,
    isFeteching: false,
    error: false,
};

export const Context = createContext(INITIAL_STATE);

// children mei sabke sab components aajayenge
export const ContextProvider = ({children}) =>{
    const [state,dispatch] = useReducer(Reducer,INITIAL_STATE);

    useEffect(()=>{
        localStorage.setItem("user",JSON.stringify(state.user));
    },[state.user])

    return (
        <Context.Provider
            value={{
                user: state.user,
                isFeteching:state.isFeteching,
                error:state.error,
                dispatch,
            }}
        >
            {children}
        </Context.Provider>
    );
};