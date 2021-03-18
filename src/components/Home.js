import React, { useContext, useEffect, useState } from "react";
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
                    <p>This section will be information on companion planting</p>
                </div>
            </section>
            
        </>
    )
}