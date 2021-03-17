import React, { useContext, useEffect, useState } from "react"
import { useHistory, useParams } from "react-router"
import { GardenContext } from "./GardenProvider"

export const CreatedGarden = () => {
    const { getGardenById, getGardenType, gardenType} = useContext(GardenContext)

    const[garden, setGarden] = useState({})
    const[gardenT, setGardenT] =useState([])

    const {gardenId} = useParams()
    const history = useHistory()

    useEffect(() => {
        getGardenById(gardenId)
        .then((response) => {
            setGarden(response)
        })
        .then(() =>{
            getGardenType()
            .then((response) => {
                setGardenT(response)
            })})
        }, [])
        console.log(gardenType)
    const gardType = gardenType.find(type => type.id === parseInt(garden.gardenTypeId))
    console.log(gardType)
   return(
        <> 
            <h2>Hello</h2>
            <section>
                <h3 className="created_gardenName">{garden.name}</h3>
                <div className="created_gardenDate">Start Date: {garden.startDate}</div>
                <div className="created_gardenType">Garden Type:</div>
            </section>
        </>
    )
}