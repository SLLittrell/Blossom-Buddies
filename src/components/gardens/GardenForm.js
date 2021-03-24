/*Module Purpose:
This module is responsible for rendering a a form for user input, 
it is also used to edit user input data.
*/
import React, { useContext, useEffect, useState } from "react"
import { GardenContext } from "./GardenProvider"
import { userStorageKey } from "../auth/authSettings";
import { useHistory, useParams } from "react-router";



export const GardenForm = () => {
    const { addGarden, getGardenType, gardenType, updateGarden, getGardenById} = useContext(GardenContext)
    const currentUserId = parseInt(sessionStorage.getItem(userStorageKey))
    
    //sets state with a boolean, if user has not input data state is true
    const [isLoading, setIsLoading] = useState(true);
    
    const [garden, setGarden] = useState({
        name:"",
        userId: currentUserId,
        startDate: "",
        gardenTypeId:0
    })

    const history = useHistory()
    const {gardenId} = useParams()

    //event change that handles changes on input fields
    //pulls the target id and adds the value to the new object and changes the state value garden
    const inputChange = (event) => {
        const newGarden = {...garden}
        newGarden[event.target.id] = event.target.value
        setGarden(newGarden)
    }
   // saves a new garden or updates an existing garden object when user clicks the affordance
    const onSaveClick =() => {
        if(garden.name=== "" || garden.gardenType === 0 ){
            window.alert("Please fill in all inputs")
        }
        else{
            setIsLoading(true)

            if(gardenId){
                updateGarden({
                    name: garden.name,
                    userId: garden.userId,
                    startDate: garden.startDate,
                    gardenTypeId:parseInt(garden.gardenTypeId),
                    id: garden.id
                })
                .then(() => history.push(`/gardens/${garden.id}`))
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
    //gets gardenType data, garden data by Id and sets data to garden state
    //after data by id is set to state isloading=false for user to save data
    useEffect(() => {
        getGardenType()
        .then(() => {
            if (gardenId) {
              getGardenById(gardenId)
              .then(garden => {
                  setGarden(garden)
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
                        <input type="text" id="name" value={garden.name} autoFocus className="gardenInput" 
                        onChange={inputChange}/>
                    </div>
              </fieldset>
              <fieldset>
                  <label htmlFor="startDate">Start Date:</label>
                  <input type="date" id="startDate" className="gardenInput" value={garden.startDate} onChange={inputChange}></input>
              </fieldset>
              <fieldset>
                <label htmlFor="gardenTypeId">Garden Type:</label>
                <select id="gardenTypeId" value={garden.gardenTypeId} onChange={inputChange}>
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