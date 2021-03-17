import React, { useContext, useEffect } from "react"
import { useParams } from "react-router"
import { GardenContext } from "./GardenProvider"

export const CreatedGarden = () => {
    const { getGardenById} = useContext(GardenContext)
    const {gardenId} = useParams()
   
   
    return(
        <> 
            <h2>Hello</h2>
        </>
    )
}