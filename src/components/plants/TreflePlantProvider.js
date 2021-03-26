import React, { createContext, useState } from "react"
import {settings} from '../Settings'

export const TreflePlantContext = createContext()

export const PlantProvider = (props) => {
    const [trefPlants, setTrefPlants] = useState([])

    const getTreflePlants = () => {
    return fetch(`https://trefle.io/api/v1/plants/?token=${settings.TrefleKey}`)
    .then(res => res.json())
    .then(setTrefPlants)
}

const getTreflePlantById = (id) => {
    return fetch(`https://trefle.io/api/v1/plants?token=${settings.TrefleKey}`)
        .then(res => res.json())
}

  
    
    return (
        <PlantContext.Provider value={{
            treflePlants, getTreflePlants, getTreflePlantById  
        }}>
            {props.children}
        </PlantContext.Provider>
    )

}