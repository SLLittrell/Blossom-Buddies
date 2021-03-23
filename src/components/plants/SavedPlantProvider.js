/*Module Purpose:
This module is responsable for getting data for all saved plant related components 
*/
import React, { createContext, useState } from "react"


export const SavedPlantContext = createContext()

export const SavedPlantProvider = (props) => {
    const [savedPlants, setSavedPlants] = useState([])
    
    const getSavedPlants = () => {
        return fetch(`http://localhost:8088/savedPlants`)
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

    const removeSavedPlant = savedPlantId => {
        return fetch(`http://localhost:8088/savedPlants/${savedPlantId}`, {
            method: "DELETE"
        })
            .then(getSavedPlants)
    }


    return (
        <SavedPlantContext.Provider value={{
            savedPlants, getSavedPlants, addSavedPlants, removeSavedPlant
        }}>
            {props.children}
        </SavedPlantContext.Provider>
    )
}


