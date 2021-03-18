import React, { useContext, useEffect, useState } from "react"
import { useHistory, useParams } from "react-router"
import { PlantContext } from "./PlantProvider"
import {ListDividers} from "./Plant"



export const PlantList = () => {
    const {plants, getPlants, searchTerms} = useContext(PlantContext)

    const [filteredPlants, setFiltered] = useState([])
    const history = useHistory()

    useEffect(() =>{
        getPlants()
    }, [])

    useEffect(() => {
        if(searchTerms !== ""){
            const subset = plants.filter(plant => plant.commonName.toLowerCase().includes(searchTerms.toLowerCase()))
            setFiltered(subset)
        } else {
            setFiltered(plants)
        }
    },[searchTerms, plants])

    return (
        <>
            <h3>Plants</h3>
            <div className="plants">
                {filteredPlants.map(plant => { 
                    return <ListDividers key={plant.id} plantObj={plant}/>
                })}
            </div>
        </>
    )
}