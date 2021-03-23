/*Module Purpose:
This module is responsable for getting data for all garden related components 
*/
import React, { createContext, useState } from "react"

export const GardenContext = createContext()

export const GardenProvider = (props) => {
    const [gardens, setGardens] = useState([])
    const [gardenType, setGardenType] = useState([])

    const getGardens = () => {
    return fetch(`http://localhost:8088/gardens`)
    .then(res => res.json())
    .then(setGardens)
    }

    const addGarden = gardenObj => {
        return fetch("http://localhost:8088/gardens", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(gardenObj)
        })
        .then(getGardens)
    }
    
    const getGardenById = (id) => {
        return fetch(`http://localhost:8088/gardens/${id}`)
            .then(res => res.json())
    }

    const getGardenType = () => {
        return fetch(`http://localhost:8088/gardenTypes`)
        .then(res => res.json())
        .then(setGardenType)
        }

    const DeleteGarden = gardenId => {
        return fetch(`http://localhost:8088/gardens/${gardenId}`, {
            method: "DELETE"
        })
            .then(getGardens)
    }

    const updateGarden = garden => {
        return fetch(`http://localhost:8088/gardens/${garden.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(garden)
        })
          .then(getGardens)
      }

   
    return (
        <GardenContext.Provider value={{
            getGardens, gardens, addGarden, getGardenType, gardenType, getGardenById, 
            DeleteGarden, updateGarden
        }}>
            {props.children}
        </GardenContext.Provider>
    )

}