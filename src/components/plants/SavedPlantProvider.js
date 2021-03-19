import React, { createContext, useContext, useState } from "react"


export const SavedPlantContext = useContext()

export const DavedPlantProvider = () => {
    const [savedPlants, setSavedPlants] = useState([])
    
    const getSavedPlants = () => {
        return fetch(`http://localhost:8088/plants`)
        .then(res => res.json())
        .then(setPlants)
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


