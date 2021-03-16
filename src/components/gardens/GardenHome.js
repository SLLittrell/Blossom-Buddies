import React from "react"
import { useHistory } from "react-router"

export const MyGardens = () => {

    const history =useHistory()
    return (
        <>
            <section className="gardens_home">
                <h2>My Gardens</h2>
                <div><button className="btn--createGarden"onClick={() =>{history.push("/gardens/create")}}>Create New Garden</button></div>
            </section>
            <section className="myGardenList">
                
            </section>
        </>
    )

}