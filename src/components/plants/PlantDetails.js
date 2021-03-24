/*Module Purpose:
This module is responsible for rendering plant details including:
-Plant name
-An affordance to choose a garden to save a plant, and a save plant affordance
-A List of helper plants that include some clickable links to their plant detail page
-A List of plants to avoid planting together
-A fact involving companion planting with chosen plant
*/
import React, { useContext, useEffect, useState } from "react"
import { useHistory, useParams } from "react-router-dom"
import { GardenContext } from "../gardens/GardenProvider"
import { PlantContext } from "./PlantProvider"
import { userStorageKey } from "../auth/authSettings"
import { HelperListDividers } from "./PlantDetail"
import {AvoidListDividers} from "./PlantDetail"
import { SavedPlantContext } from "./SavedPlantProvider"

export const PlantDetails = () => {
    //get data to render plants, gardens details from plant & garden provider
    // oseContext to add plants to saved list
    const { getPlantById, getPlants, plants } = useContext(PlantContext)
    const {addSavedPlants} =useContext(SavedPlantContext)
    const { gardens, getGardens} = useContext(GardenContext)
    
    const [userGarden, setUserGarden] = useState([])
    const [plant, setPlant] = useState({})

   
    const {plantId} = useParams()
    
    const currentUserId = parseInt(sessionStorage.getItem(userStorageKey))

    //get plant using id from url params, useEffect will trigger every time the plantId(params) change
    useEffect(() => {
        getPlantById(plantId)
        .then((response) => {
            setPlant(response)
        })
    },[plantId])
    
    //get garden & plant data from garden & plant provider, will trigger every time plantId(params) changes
    useEffect(()=> {
        getGardens()
        .then(getPlants())
    },[plantId])
    
    //filtering gardens by current user, current user can only choose gardens they created
    useEffect(() =>{
        const usersGardens = gardens.filter(garden => garden.userId === currentUserId)
        if(usersGardens !== []) setUserGarden(usersGardens)
    } ,[gardens])
    
    
    //initial state of saved plant is set
    const [savePlant, setSavePlant] = useState({
        plantId:parseInt(plantId),
        gardenId: 0
    })
    //Triggers and updates the plantId state when routing to a new plant details page
    useEffect(() => {
        const newPlant = {...savePlant}
        newPlant.plantId = parseInt(plantId)
        setSavePlant(newPlant)  
    }, [plantId])

    //input field change handle that sets the new saved plant object
    const handleChange = (event) => {
        const newPlant = {...savePlant}
        newPlant[event.target.id]= parseInt(event.target.value)
        setSavePlant(newPlant)  
    };
   
    //when PlantSave is invoked with onClick addSavedPlant post function is called using savePlant state as a parameter 
    const PlantSave = () => {
        addSavedPlants(savePlant)
        window.alert(`${plant.commonName} saved to your garden!`)
    }

    //Splitting the helpers string into multiple strings by the "," and assigning to an array
    const helpersArray= plant.helpers?.split(",")
    
    // filtering and finding matching helper plants with current plant list returning an array of matching plant objects
     const findPlants = plants?.filter(plant =>helpersArray?.find(helper => helper?.includes(plant.commonName.toLowerCase())))
     
    

    return(
        <>
            <h3>{plant.commonName}</h3> 
            
            <section>
                <label id="gardenId">Which garden would you like to add {plant.commonName} to?<br></br></label>
                <select id="gardenId" onChange={handleChange}>
                    <option value={0} >Your Gardens</option>
                    {userGarden.map(garden =><option key={garden.id} value={garden.id}>{garden.name}</option>)}
                </select>
            </section>
                
            <div><button onClick={PlantSave}>Save Plant</button></div>
                
            <section>
               <div><h3>Helpers:</h3>
               {helpersArray?.map((helper, i) =><HelperListDividers key={i}helpers={helper} plantFilter={findPlants}/>)} 
               </div>
               <div>
                   <h3>Not so Helpful(avoid):</h3>
                   {plant.avoid ? plant.avoid?.split(",").map((avoid, i) =><AvoidListDividers key={i} NonHelpers={avoid}/>) : 'No known plants to worry about!'}
                </div>
               <div>
                   <h3>Fun Fact: </h3>
                   {plant.fact ? plant.fact : 'Sorry No Fun Facts Yet'}
                </div>
            </section>
            
            
        </>
    )
}