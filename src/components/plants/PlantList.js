import React, { useContext, useEffect } from "react"
import { useHistory, useParams } from "react-router"
import { PlantContext } from "./PlantProvider"
import {ListDividers} from "./PlantCard"



export const PlantList = () => {
    const {plants, getPlants} = useContext(PlantContext)

    const history = useHistory()

    useEffect(() =>{
        getPlants()
    }, [])

    return (
        <>
            <h3>Hello</h3>
            {/* <p>{plants.map(plant => plant.Helps)}</p> */}
            <ListDividers />
        </>
    )
}