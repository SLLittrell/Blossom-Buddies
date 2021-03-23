import React, { useContext, useEffect, useState } from "react"
import { GardenContext } from "./GardenProvider"
import { userStorageKey } from "../auth/authSettings";
import { useHistory, useParams } from "react-router";



export const GardenForm = () => {
    const { addGarden, getGardenType, gardenType, updateGarden, getGardenById} = useContext(GardenContext)
    const currentUserId = parseInt(sessionStorage.getItem(userStorageKey))
    
    const [isLoading, setIsLoading] = useState(true);
    const [gardens, setGardens] =useState({})
    
    const [garden, setGarden] = useState({
        name:"",
        userId: currentUserId,
        startDate: "",
        gardenTypeId:0
    })

    const history = useHistory()
    const {gardenId} = useParams()

    const inputChange = (event) => {
        const newGarden = {...garden}
        newGarden[event.target.id] = event.target.value
        setGarden(newGarden)
    }
   
    const onSaveClick =() => {
        if(garden.name=== "" && garden.gardenType === 0 ){
            window.alert("Please fill in all inputs")
        }
        else{
            setIsLoading(true)

            if(gardenId){
                updateGarden({
                    name: gardens.name,
                    userId: gardens.userId,
                    startDate: gardens.startDate,
                    gardenTypeId:parseInt(gardens.gardenTypeId),
                    id: gardenId
                })
                .then(() => history.push(`/gardens/${gardens.id}`))
            }else {
                addGarden({
                    name: garden.name,
                    userId: garden.userId,
                    startDate: garden.startDate,
                    gardenTypeId:parseInt(garden.gardenTypeId)
                })
                .then(() => history.push(`/gardens`))
            }
        
        }
        
    }
    
    useEffect(() => {
        getGardenType()
        .then(() => {
            if (gardenId) {
              getGardenById(gardenId)
              .then(garden => {
                  setGardens(garden)
                  setIsLoading(false)
                })
              } else {
                setIsLoading(false)
              }
            })
          }, [])

    return (
        <>
            <form>
                <h3>{gardenId ? "Edit your Garden" : "Create a Garden"}</h3>
                <fieldset>
                    <div className="garden_form">
                        <label htmlFor="name">Name: </label>
                        <input type="text" id="name" value={gardens.name} autoFocus className="gardenInput" 
                        onChange={inputChange}/>
                    </div>
              </fieldset>
              <fieldset>
                  <label htmlFor="startDate">Start Date:</label>
                  <input type="date" id="startDate" className="gardenInput" value={gardens.startDate} onChange={inputChange}></input>
              </fieldset>
              <fieldset>
                <label htmlFor="gardenTypeId">Garden Type:</label>
                <select id="gardenTypeId" value={gardens.gardenTypeId} onChange={inputChange}>
                    <option value= "0">Select a garden type</option>
                    {gardenType.map(types => (
                    <option key={types.id} value={types.id}>{types.type}</option>
                    ))}         
                </select>
                </fieldset>
                <button className="btn btn-saveGarden"
                    disabled={isLoading}
                    onClick={event => { event.preventDefault() 
                    onSaveClick()}}>
                    {gardenId ? "Update Garden" : "Save Garden"}
                </button>
            </form>
        </>
    )
}