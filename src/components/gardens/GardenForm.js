import React, { useContext, useEffect, useState } from "react"
import { GardenContext } from "./GardenProvider"
import { userStorageKey } from "../auth/authSettings";
import { useHistory } from "react-router";



export const GardenForm = () => {
    const { addGarden, getGardenType, gardenType} = useContext(GardenContext)
    const currentUserId = parseInt(sessionStorage.getItem(userStorageKey))
    
    
    const [garden, setGarden] = useState({
        name:"",
        userId: currentUserId,
        startDate: "",
        gardenTypeId:0
    })

    const history = useHistory()

    const inputChange = (event) => {
        const newGarden = {...garden}
        newGarden[event.target.id] = event.target.value
        setGarden(newGarden)
    }
   
    const onSaveClick =() => {
        if(garden.name=== "" || garden.gardenType === 0 ){
            window.alert("Please fill in all inputs")
        }
        else{addGarden({
        name: garden.name,
        userId: garden.userId,
        startDate: garden.startDate,
        gardenTypeId:parseInt(garden.gardenTypeId)
        })}
        
    }
    
    useEffect(() => {
        getGardenType()
    }, [])

    return (
        <>
            <form>
                <h3>Create a Garden</h3>
                <fieldset>
                    <div className="garden_form">
                        <label htmlFor="gardenName">Name: </label>
                        <input type="text" id="name" required autoFocus className="gardenInput" placeholder="Garden Name" 
                        onChange={inputChange}/>
                    </div>
              </fieldset>
              <fieldset>
                  <label htmlFor="gardenStart">Start Date:</label>
                  <input type="date" id="startDate" className="gardenInput" onChange={inputChange}></input>
              </fieldset>
              <fieldset>
                <label htmlFor="gardenType">Garden Type:</label>
                <select id="gardenTypeId" onChange={inputChange}>
                    <option value= "0">Select a garden type</option>
                    {gardenType.map(types => (
                    <option key={types.id} value={types.id}>{types.type}</option>
                    ))}         
                </select>
              </fieldset>
              <button className="btn btn-saveGarden"
                onClick={event => { event.preventDefault() 
                onSaveClick()}}>
                Save Garden
            </button>
            </form>
        </>
    )
}