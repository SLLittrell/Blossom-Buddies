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

    const getGardenType = () => {
        return fetch(`http://localhost:8088/gardenTypes`)
        .then(res => res.json())
        .then(setGardenType)
        }

    const addGardenType = gardenTypeObj => {
        return fetch("http://localhost:8088/gardens", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(gardenTypeObj)
        })
        .then(getGardenType)
    }
       

    return (
        <GardenContext.Provider value={{
            getGardens, gardens, addGarden, addGardenType, getGardenType
        }}>
            {props.children}
        </GardenContext.Provider>
    )

}