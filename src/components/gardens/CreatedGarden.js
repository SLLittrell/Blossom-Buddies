import React, { useContext, useEffect, useState } from "react"
import { useHistory, useParams } from "react-router"
import { GardenContext } from "./GardenProvider"

export const CreatedGarden = () => {
    const { getGardenById, getGardenType, gardenType } = useContext(GardenContext)

    const[garden, setGarden] = useState({})
    const[types, setTypes] = useState({
        type:""
    })
    
   

    const {gardenId} = useParams()
    const history = useHistory()
    
    useEffect(() =>{
        getGardenType()
    }, [])

    useEffect(() => {
        const typeName = gardenType.find(type => parseInt(type.id) === parseInt(garden.gardenTypeId))
        if(typeName) setTypes(typeName)
    }, [garden])
    // console.log(typeName)
    
    useEffect(() => {
    getGardenById(gardenId)
        .then((response) => {
            setGarden(response)
        })
    }, [])

    // debugger
   return(
        <> 
            <h2>Hello</h2>
            <section>
                <h3 className="created_gardenName">{garden.name}</h3>
                <div className="created_gardenDate">Start Date: {garden.startDate}</div>
                <div className="created_gardenType">Garden Type: {types.type}</div>
            </section>
        </>
    )
}