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
import './Home.css'
import Button from '@material-ui/core/Button';
import {makeStyles} from '@material-ui/core/styles';
import { WeatherContext } from "./weather/WeatherProvider";
import {WeatherPreview} from "./weather/Weather"

const useStyles = makeStyles((theme) => ({
    root: {
        background: "#EE8051",
        color: "#FFFFF"
    },
  }));

//Component runs on initial render and will present welcome text when navigating to home
export const Home = () => {
    const classes = useStyles();
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
            <TransitionsModal></TransitionsModal>
            <WeatherPreview></WeatherPreview>
            
            <section className="welcome_info">
                <div>
                    <h4 className="home_heading">What is Blossom Buddies?</h4>
                    <p>Blossom Buddies is a useful tool providing information and convenience to beginner gardeners 
                        who would like to plan and  produce a successful organic garden using companion planting practices. </p>
                    <h4 className="home_heading">Companion planting you say?</h4>
                    <p>Companion planting is a method of growing crops that benefit from growing in close proximity to each other. 
                        Benefits include pest control, balanced soil quality, and an increase in pollinators. Even plants have buddies! </p>
                    <p>Any great garden starts with a good plan, click below to get started!</p>

                    <Button variant="contained" className={classes.root} onClick={() => history.push('/gardens')}>
                    Start Planning
                    </Button>

                </div>
            </section>
            
        </>
    )
}