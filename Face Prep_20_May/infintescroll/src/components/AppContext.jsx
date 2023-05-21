import {createContext, useState} from 'react'

// context creation
export const Appcontext = createContext();

const AppContextProvider = ({children})=>{

const [authenticate,setAuthentication] = useState(false);



return <Appcontext.Provider value={{authenticate,setAuthentication}}>{children}</Appcontext.Provider>

}

export default AppContextProvider;