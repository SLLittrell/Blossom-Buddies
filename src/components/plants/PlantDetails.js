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
    const [plantFilter, setPlantFilter] = useState([])

    const {plantId} = useParams()
    const history = useHistory()
    const currentUserId = parseInt(sessionStorage.getItem(userStorageKey))

    //get plant using id from url paramas 
    useEffect(() => {
        getPlantById(plantId)
        .then((response) => {
            setPlant(response)
        })
    },[])
    
    //get garden data from garden provider
    useEffect(()=> {
        getGardens()
        .then(getPlants())
    },[])
    
    //filtering gardens by current user, current user can only choose gardens they created
    useEffect(() =>{
        const usersGardens = gardens.filter(garden => garden.userId === currentUserId)
        if(usersGardens !== []) setUserGarden(usersGardens)
    } ,[plant])
    
    
    const [savePlant, setSavePlant] = useState({
        plantId:parseInt(plantId),
        gardenId: 0
    })
    const handleChange = (event) => {
        const newPlant = {...savePlant}
        newPlant[event.target.id]= parseInt(event.target.value)
        setSavePlant(newPlant)
    };
    // console.log(savePlant)

    const PlantSave = () => {
        addSavedPlants(savePlant)
        .then(() => history.push('/plants'))
    }

    
    //Mapping through converted helpers string, then creating a new array only when helpers are rendered
    
    // find matching helper plants with current plant list 
    //    console.log(filterHelpers)
    
     const filterHelpers = []
     const helpersArray= plant.helpers?.split(",")
     helpersArray ? helpersArray.map(helper => filterHelpers.push(helper) ) : filterHelpers.push("")
     
     const findPlants = plants?.filter(plant =>filterHelpers?.find(helper => helper?.includes(plant.commonName.toLowerCase())))
     
   
//    console.log(findPlants)



//    debugger
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
               {filterHelpers.map((helper, i) =><HelperListDividers key={i} helpers={helper} plantFilter={findPlants}/>)} 
               </div>
               <div>
                   <h3>Not so Helpful(avoid):</h3>
                   {plant.avoid ? plant.avoid?.split(",").map((avoid, i) =><AvoidListDividers key={i} NonHelpers={avoid.toUpperCase()}/>) : 'No known plants to worry about!'}
                </div>
               <div>
                   <h3>Fun Fact: </h3>
                   {plant.fact ? plant.fact : 'Sorry No Fun Facts Yet'}
                </div>
            </section>
            
            
        </>
    )
}