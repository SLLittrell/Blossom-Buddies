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
    
    //get garden type data
    useEffect(() =>{
        getGardenType()
    }, [])

    //find the associated garden type for a created garden by using id
    useEffect(() => {
        const typeName = gardenType.find(type => parseInt(type.id) === parseInt(garden.gardenTypeId))
        if(typeName) setTypes(typeName)
    }, [garden])
    
    //get garden data by using url params and garden id
    useEffect(() => {
    getGardenById(gardenId)
        .then((response) => {
            setGarden(response)
        })
    }, [])

    //get saved plant data and plant data
    useEffect(() => {
        getSavedPlants()
        .then(getPlants())
    },[garden])

  
    //filter out saved plants by matching the garden id's
    const filterPlants= savedPlants.filter(gardens => gardens.gardenId === garden.id)
    //filter & find plants that match the saved plantId's
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
            <section>{PlantFilter.map(plant =><SavedPlantDividers key={plant?.id} myPlants={plant} savePlants={filterPlants}/>)}</section>
        </>
    )
}