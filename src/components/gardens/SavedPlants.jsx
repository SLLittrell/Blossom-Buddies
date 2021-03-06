/*Module Purpose:
This module is responsible for rendering the JSX and styling for added plants to gardens 
*/
import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import {Link} from "react-router-dom"
import {SavedPlantContext} from "../plants/SavedPlantProvider"
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle'
import './Garden.css'


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

const removeStyle =makeStyles((theme) => ({
  root: {
    color: "#8C4E6D",
  }
}))

const LinkStyles = makeStyles((theme) => ({
  root: {
    color:"#587085",
    textDecoration: 'none'
    
  },
}));


export const SavedPlantDividers = ({myPlants, savePlants}) => {
  const {removeSavedPlant}= useContext(SavedPlantContext)
  const classes = useStyles();
  const saveId = savePlants.find(plant => plant.plantId === myPlants?.id)
  const handleRemove =() =>{
    removeSavedPlant(saveId.id)
  }
  const glasses = removeStyle()

  const links = LinkStyles();
  
  return (
    <List component="nav" className={classes.root} aria-label="helpers">
      <ListItem >
        <Link className={links.root} to={`/plants/details/${myPlants?.id}`}><ListItemText primary={myPlants?.commonName} /></Link> 
        <div className="noteIcon"><RemoveCircleIcon className={glasses.root} onClick={handleRemove}></RemoveCircleIcon></div>
      </ListItem>
      <Divider light />
    </List>
  );
}

