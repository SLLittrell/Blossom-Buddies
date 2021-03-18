import React, { createContext, useState } from "react"

export const PlantContext = createContext()

export const PlantProvider = (props) => {
    const [plants, setPlants] = useState([])

    const getPlants = () => {
    return fetch(`http://localhost:8088/plants`)
    .then(res => res.json())
    .then(setPlants)
}

const getPlantById = (id) => {
    return fetch(`http://localhost:8088/plants/${id}`)
        .then(res => res.json())
}

    const [ searchTerms, setSearchTerms ] = useState("")
    
    return (
        <PlantContext.Provider value={{
            plants, getPlants, searchTerms, setSearchTerms, getPlantById  
        }}>
            {props.children}
        </PlantContext.Provider>
    )

}