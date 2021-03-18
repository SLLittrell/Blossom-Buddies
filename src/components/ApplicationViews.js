import React from "react"
import { Route } from "react-router-dom"
import { CreatedGarden } from "./gardens/CreatedGarden"
import { GardenForm } from "./gardens/GardenForm"
import { MyGardens } from "./gardens/GardenHome"
import { GardenProvider } from "./gardens/GardenProvider"
import { Home } from "./Home"
import { PlantList } from "./plants/PlantList"
import { PlantProvider } from "./plants/PlantProvider"
import { UserProvider } from "./users/UserProvider"

export const ApplicationViews = () => {
    return (
        <UserProvider>
            <Route exact path="/">
                <Home />
            </Route>
            <GardenProvider>
                <Route exact path="/gardens">
                    <MyGardens />
                </Route>
                <Route exact path="/gardens/create">
                    <GardenForm />
                </Route>
                <Route exact path="/gardens/:gardenId(\d+)">
                    <CreatedGarden />
                </Route>
            </GardenProvider>
            <PlantProvider>
                <PlantList />
            </PlantProvider>
        </UserProvider>
    )
}