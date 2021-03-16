import React, { useContext, useEffect, useState } from "react";
import { userStorageKey } from "./auth/authSettings";
import { UserContext } from "./users/UserProvider";


export const Home = () => {
    const {users, getUsers} =useContext(UserContext)
    
    useEffect(() => {
        getUsers()
    }, [])
    console.log(users)
    
    const currentUserId = parseInt(sessionStorage.getItem(userStorageKey))
    const currentUser = users.find(user => parseInt(user.id) === currentUserId)

   return (
        <>

            <h2 className="home_welcome">Welcome</h2>
            <div className="currentUserName">{currentUser.name}</div>
            <section>
                <div>
                    <p>This section will be information on companion planting</p>
                </div>
            </section>
            
        </>
    )
}