/*Module Purpose:
This module is responsible for rendering: 
- An affordance to create a new garden
-a linked list of user created gardens
*/
import React, { useContext, useEffect } from "react"
import { useHistory, useParams } from "react-router"
import { GardenContext } from "./GardenProvider"
import {Link} from "react-router-dom"
import { userStorageKey } from "../auth/authSettings";


//pulls created garden data with useContext
export const MyGardens = () => {
    const {gardens, getGardens} = useContext(GardenContext)
    

    const history =useHistory()
    
    const currentUserId = parseInt(sessionStorage.getItem(userStorageKey))
    
    //invokes getGarden fetch function on initial render
    useEffect(() => {
        getGardens()
    }, [])
   
    //filters gardens by current user id
    const usersGarden = gardens.filter(garden => garden.userId === currentUserId)

    return (
        <>
            <section className="gardens_home">
                <h2>My Gardens</h2>
                <div><button className="btn--createGarden"onClick={() =>{history.push("/gardens/create")}}>Create New Garden</button></div>
            </section>
            <section className="myGardenList" >
                {usersGarden.map(garden =><div key={garden.id}><Link to={`/gardens/${garden.id}`} key={garden.id}>
                    {garden.name}
                </Link></div>)}
            </section>
        </>
    )

}