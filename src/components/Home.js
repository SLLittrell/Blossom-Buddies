/*Module Purpose:
This module is responsable for rendering: 
- a user welcome with user name
-Information on purpose of application
-Affordance to the my garden component to create a garden
*/
import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";
import { userStorageKey } from "./auth/authSettings";
import { UserContext } from "./users/UserProvider";

//Component runs on initial render and will present welcome text when navigating to home
export const Home = () => {
    const {users, getUsers} =useContext(UserContext)
    const [user, setUser] = useState({
        name: ""
    })
    
    useEffect(() => {
        getUsers()
    }, [])
    
    const history = useHistory()
    
    // gets current user id from session storage
    const currentUserId = parseInt(sessionStorage.getItem(userStorageKey))
    
    useEffect(() => {
        const currentUser = users.find(user => parseInt(user.id) === currentUserId)
        if (currentUser) setUser(currentUser)
    }, [users])
   
   //returns rendered text about the application and a welcome to the current user 
   return (
        <>

            <h2 className="home_welcome">Welcome</h2>
            <div className="currentUserName">{user.name}</div>
            <section>
                <div>
                    <p>Welcome to Blossom Buddies!</p>
                    <p>Blossom Buddies is a useful tool that will help guide you through the world of 
                    companion planting.</p>
                    <p>Any great garden starts with a good plan, click below to get started!</p>

                    <button onClick={() => history.push('/gardens')}>Start Planning</button>

                </div>
            </section>
            
        </>
    )
}