import React, { useContext, useEffect, useState } from "react"
import { findAllInRenderedTree } from "react-dom/test-utils"
import { useHistory, useParams } from "react-router"
import { PlantContext } from "../plants/PlantProvider"
import { SavedPlantContext } from "../plants/SavedPlantProvider"
import { GardenContext } from "./GardenProvider"
import { SavedPlantDividers } from "./SavedPlants"

export const CreatedGarden = () => {
    const { getGardenById, getGardenType, gardenType, DeleteGarden } = useContext(GardenContext)
    const {getSavedPlants, savedPlants} = useContext(SavedPlantContext)
    const {getPlants, plants} = useContext(PlantContext)

    
    // const[filteredPlants, setFilteredPlants ] = useState([])
    const[garden, setGarden] = useState({})
    const[types, setTypes] = useState({
        type:""
    })

    const {gardenId} = useParams()
    const history = useHistory()
    
    useEffect(() =>{
        getGardenType()
    }, [])

    useEffect(() => {
        const typeName = gardenType.find(type => parseInt(type.id) === parseInt(garden.gardenTypeId))
        if(typeName) setTypes(typeName)
    }, [garden])
    // console.log(typeName)
    
    useEffect(() => {
    getGardenById(gardenId)
        .then((response) => {
            setGarden(response)
        })
    }, [])

    useEffect(() => {
        getSavedPlants()
        .then(getPlants())
    },[garden])

    // console.log(plants)

    const filterPlants= savedPlants.filter(gardens => gardens.gardenId === garden.id)
    // console.log(filterPlants)
    const PlantFilter = filterPlants.map(match =>plants.find(plant => parseInt(plant.id) === parseInt(match.plantId))) 
    // console.log(PlantFilter)
    const handleDelete = () => {
        DeleteGarden(garden?.id)
        .then(() => {
            history.push("/gardens")
        })
    }
    // debugger
   return(
        <> 
            <h2>Hello</h2>
            <section>
                <h3 className="created_gardenName">{garden.name}</h3>
                <div className="created_gardenDate">Start Date: {garden.startDate}</div>
                <div className="created_gardenType">Garden Type: {types.type}</div>
                <button className="btn-findPlants" onClick={()=> history.push("/plants")}>Add Plants</button>
                <button onClick={handleDelete}>Delete Garden</button>
                <button className="btn-findPlants" onClick={()=> history.push("/gardens/create")}>Edit Garden</button>
            </section>
            <section>{PlantFilter.map(plant =><SavedPlantDividers key ={plant?.id} myPlants={plant}/>)}</section>
        </>
    )
}