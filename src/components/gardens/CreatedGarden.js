/*Module Purpose:
This module is responsible for rendering a user created garden component,which includes 
- Garden Name, Start Date, and Garden type
-Affordances to add plants, delete garden, and edit garden
-A list of linked plants added to garden, and a remove affordance for each plant
*/

import React, { useContext, useEffect, useState } from "react"
import { useHistory, useParams } from "react-router"
import { PlantContext } from "../plants/PlantProvider"
import { SavedPlantContext } from "../plants/SavedPlantProvider"
import { GardenContext } from "./GardenProvider"
import { SavedPlantDividers } from "./SavedPlants"
import { makeStyles } from '@material-ui/core/styles';
import { Button } from "@material-ui/core"
import { NoteDialog, SeeNotesDialog } from '../notes/Notes';
import EditIcon from '@material-ui/icons/Edit';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import './Garden.css'
import Tooltip from '@material-ui/core/Tooltip'
import { DeleteDialog } from "./Delete"
import { NoteContext } from "../notes/NoteProvider"

const useStyles = makeStyles((theme) => ({
    root: {
      color:"#cb0004",
      margin: 10
    },
    add: {
        color:"#6d8031",
        margin: 10
    },
    edit:{
        color:"#ee8051",
        margin: 10
    }
  }));

export const CreatedGarden = () => {
    const { getGardenById, getGardenType, gardenType, DeleteGarden } = useContext(GardenContext)
    const {getSavedPlants, savedPlants} = useContext(SavedPlantContext)
    const {getPlants, plants} = useContext(PlantContext)
    const {notes, getNotes, deleteNote} = useContext(NoteContext)

    
    // const[filteredPlants, setFilteredPlants ] = useState([])
    const[garden, setGarden] = useState({})
    const[types, setTypes] = useState({
        type:""
    })

    const {gardenId} = useParams()
    const history = useHistory()
    
    //get garden type data
    useEffect(() =>{
        getGardenType()
    }, [])

    //find the associated garden type for a created garden by using id, useEffect will trigger when garden state is changed
    useEffect(() => {
        const typeName = gardenType.find(type => parseInt(type.id) === parseInt(garden.gardenTypeId))
        if(typeName) setTypes(typeName)
    }, [garden])
    
    //get garden data by using url params and garden id
    useEffect(() => {
    getGardenById(gardenId)
        .then((response) => {
            setGarden(response)
        })
    }, [])

    //get saved plant data and plant data, useEffect will trigger when garden state is changed
    useEffect(() => {
        getSavedPlants()
        .then(getPlants)
        .then(getNotes)
    },[garden])

  
    //filter out saved plants by matching savedPlant gardenId to current garden id
    const filterPlants= savedPlants.filter(gardens => gardens.gardenId === garden.id)
    //filter & find plants that match the saved plantId's
    const PlantFilter = filterPlants.map(match =>plants.find(plant => parseInt(plant.id) === parseInt(match.plantId))) 
    
    const gardenNotes = notes?.filter(note => note.gardenId === parseInt(gardenId))
    
    const classes =useStyles()
    return(
        <> 
            <section>
                <h2 className="created_gardenName">{garden.name}</h2>
                <div className="created_gardenDate">Start my garden on: {garden.startDate}</div>
                <div className="created_gardenType">Garden Type: {types.type}</div>
                
                <div className="garden-icons">
                <Tooltip title="Add Plants"><AddCircleIcon className={classes.add} onClick={()=> history.push("/plants")}></AddCircleIcon></Tooltip>
                <DeleteDialog garden={garden}></DeleteDialog>
                <EditIcon className={classes.edit} onClick={()=> history.push(`/gardens/edit/${garden.id}`)}>Edit Garden</EditIcon>
                <div className="note-icon"><NoteDialog/></div><SeeNotesDialog garden={garden} notes={gardenNotes}/></div>
                
            </section>
            <section>{PlantFilter.map((plant, i) =><SavedPlantDividers key={i} myPlants={plant} savePlants={filterPlants}/>)}</section>
        </>
    )
}