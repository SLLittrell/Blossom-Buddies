import React, { useContext, useState } from "react"
import { GardenContext } from "./GardenProvider"
import { userStorageKey } from "../auth/authSettings";
import { useHistory } from "react-router";



export const GardenForm = () => {
    // const {gardens, getGardens, addGarden, addGardenType, getGardenType} = useContext(GardenContext)
    const currentUserId = parseInt(sessionStorage.getItem(userStorageKey))
    
    const [garden, setGarden] = useState({
        name:"",
        userId: currentUserId,
        startDate: "",
        gardenTypeId: 0
    })

    const history = useHistory()

    const inputChange = (event) => {
        const newGarden = {...garden}
        newGarden[event.target.id] = event.target.value
        setGarden(newGarden)
    }

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
                  <input type="text" list="typeList" id="gardenType" className="gardenInput"onChange={inputChange}></input>
                      <datalist id="typeList">
                          <option value="Container"></option>
                          <option value="Raised Bed"></option>
                      </datalist>
              </fieldset>
            </form>
        </>
    )
}