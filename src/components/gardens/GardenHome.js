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
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import  './Garden.css'


const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
  }));

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
    const classes = useStyles();

  return (
      <>
            <section className="gardens_home">
                <h2>My Gardens</h2>
                <Button variant="contained" className="btn--createGarden"onClick={() =>{history.push("/gardens/create")}}>Create New Garden</Button>
            </section>
            
            {usersGarden.map(garden => 
            <List key={garden.id} component="nav" className={classes.root} aria-label="mailbox folders">
            <ListItem  button to={`/gardens/${garden.id}`} component={Link}>
               <ListItemText  primary={garden.name} />
            </ListItem>
            <Divider />
            </List>
            )}
            
     </>
  )

}

// {usersGarden.map(garden =><div key={garden.id}><Link to={`/gardens/${garden.id}`} >
//                     {garden.name}
//                 </Link></div>)}