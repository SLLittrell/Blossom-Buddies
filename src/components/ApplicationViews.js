import React from "react"
import { Route } from "react-router-dom"
import { GardenForm } from "./gardens/GardenForm"
import { MyGardens } from "./gardens/GardenHome"
import { Home } from "./Home"
import { UserProvider } from "./users/UserProvider"

export const ApplicationViews = () => {
    return (
        <UserProvider>
            <Route exact path="/">
                <Home />
            </Route>
            <Route exact path="/gardens">
                <MyGardens />
            </Route>
            <Route exact path="/gardens/create">
                <GardenForm/>
            </Route>
        </UserProvider>
    )
}