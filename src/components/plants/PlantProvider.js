import React, { createContext, useState } from "react"

export const PlantContext = createContext()

export const PlantProvider = (props) => {
    const [plants, setPlants] = useState([])

    const getPlants = () => {
    return fetch(`http://localhost:8088/plants`)
    .then(res => res.json())
    .then(setPlants)
}

}