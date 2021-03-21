import React, { createContext, useState } from "react"


export const SavedPlantContext = createContext()

export const SavedPlantProvider = (props) => {
    const [savedPlants, setSavedPlants] = useState([])
    
    const getSavedPlants = () => {
        return fetch(`http://localhost:8088/plants`)
        .then(res => res.json())
        .then(setSavedPlants)
    }
    
    
    const addSavedPlants = plantObj => {
        return fetch("http://localhost:8088/savedPlants", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(plantObj)
        })
        .then(getSavedPlants)
    }

    return (
        <SavedPlantContext.Provider value={{
            savedPlants, getSavedPlants, addSavedPlants
        }}>
            {props.children}
        </SavedPlantContext.Provider>
    )
}


