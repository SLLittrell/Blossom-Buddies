import React, { createContext, useState } from "react"
import {settings} from '../Settings'

export const TreflePlantContext = createContext()

export const TreflePlantProvider = (props) => {
    const [treflePlants, setTreflePlants] = useState([])

    const getTreflePlants = () => {
    return fetch(`https://powerful-plateau-15272.herokuapp.com/https://trefle.io/api/v1/plants/?token=${settings.TrefleKey}`)
    .then(res => res.json())
    .then(setTreflePlants)
}

// const getTreflePlantById = (id) => {
//     return fetch(`https://trefle.io/api/v1/plants?token=${settings.TrefleKey}`)
//         .then(res => res.json())
// }

  
    
    return (
        <TreflePlantContext.Provider value={{
            treflePlants, getTreflePlants, 
            // getTreflePlantById  
        }}>
            {props.children}
        </TreflePlantContext.Provider>
    )

}