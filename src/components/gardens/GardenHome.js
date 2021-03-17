import React, { useContext, useEffect } from "react"
import { useHistory, useParams } from "react-router"
import { GardenContext } from "./GardenProvider"
import {Link} from "react-router-dom"

export const MyGardens = () => {
    const {gardens, getGardens} = useContext(GardenContext)
    

    const history =useHistory()
    const {gardenId} = useParams()

    useEffect(() => {
        getGardens()
    }, [])
    console.log(gardens)

    return (
        <>
            <section className="gardens_home">
                <h2>My Gardens</h2>
                <div><button className="btn--createGarden"onClick={() =>{history.push("/gardens/create")}}>Create New Garden</button></div>
            </section>
            <section className="myGardenList">
                {gardens.map(garden =><div><Link to={`/gardens/${garden.id}`}>
                    {garden.name}
                </Link></div>)}
            </section>
        </>
    )

}