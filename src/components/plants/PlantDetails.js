import React, { useContext, useEffect, useState } from "react"
import { useHistory, useParams } from "react-router-dom"
import { GardenContext } from "../gardens/GardenProvider"
import { PlantContext } from "./PlantProvider"
import { userStorageKey } from "../auth/authSettings"
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';



export const PlantDetails = () => {
    const { getPlantById } = useContext(PlantContext)
    const { gardens, getGardens} = useContext(GardenContext)
    
    const [userGarden, setUserGarden] = useState([])
    const [plant, setPlant] = useState({})

    const {plantId} = useParams()
    const history = useHistory()
    const currentUserId = parseInt(sessionStorage.getItem(userStorageKey))

    
    useEffect(() => {
        getPlantById(plantId)
        .then((response) => {
            setPlant(response)
        })
    },[])
    
    useEffect(()=> {
        getGardens()
    },[])
    
    useEffect(() =>{
        const usersGardens = gardens.filter(garden => garden.userId === currentUserId)
        if(usersGardens !== []) setUserGarden(usersGardens)
    } ,[plant])
    
    useEffect(() =>{
        const helper = plant.helpers !== undefined ? plant.helper.split(",") : ""
        console.log(helper)
    },[plant])
    // console.log(userGarden)
    // console.log("plant", plant)

    const useStyles = makeStyles((theme) => ({
        formControl: {
          margin: theme.spacing(1),
          minWidth: 120,
        },
        selectEmpty: {
          marginTop: theme.spacing(2),
        },
      }));

    const classes = useStyles();
    const [garden, setGarden] = useState('');

    const handleChange = (event) => {
        setGarden(event.target.value);
    };
   
    return(
        <>
            <h3>{plant.commonName}</h3>
                <FormControl className={classes.formControl}>
                    <InputLabel id="garden-select-label">Garden</InputLabel>
                    <Select
                    labelId="garden-select-label"
                    id="garden-select"
                    value={garden}
                    onChange={handleChange}
                    >
                    {userGarden.map(garden => <MenuItem key={garden.id} value={garden.id}>{garden.name}</MenuItem>)}
                    </Select>
                </FormControl>
                <button>Save Plant</button>
            <section>
               <div>Helpers: {plant.helpers}</div>
               <div>Not so Helpful:{plant.avoid ? plant.avoid : 'No plants to worry about!'}</div>
               <div>Fun Fact: {plant.fact ? plant.fact : 'Sorry No Fun Facts Yet'}</div>
            </section>
            
            
        </>
    )
}