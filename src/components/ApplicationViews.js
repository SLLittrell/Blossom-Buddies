import React from "react"
import { Route } from "react-router-dom"
import { GardenForm } from "./gardens/GardenForm"
import { MyGardens } from "./gardens/GardenHome"
import { GardenProvider } from "./gardens/GardenProvider"
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
            <GardenProvider>
                <Route exact path="/gardens/create">
                    <GardenForm/>
                </Route>
            </GardenProvider>
        </UserProvider>
    )
}