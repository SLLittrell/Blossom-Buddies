import React from "react"
import { Route } from "react-router-dom"
import { CreatedGarden } from "./gardens/CreatedGarden"
import { GardenForm } from "./gardens/GardenForm"
import { MyGardens } from "./gardens/GardenHome"
import { GardenProvider } from "./gardens/GardenProvider"
import { Home } from "./Home"
import { PlantDetails } from "./plants/PlantDetails"
import { PlantList } from "./plants/PlantList"
import { PlantProvider } from "./plants/PlantProvider"
import { UserProvider } from "./users/UserProvider"
import {PlantSearch} from "./plants/PlantSearch"
import {SavedPlantProvider} from "./plants/SavedPlantProvider"
import { NoteProvider } from "./notes/NoteProvider"
import { WeatherProvider } from "./weather/WeatherProvider"

export const ApplicationViews = () => {
    return (
        <UserProvider>
            <WeatherProvider>
                <Route exact path="/">
                    <Home />
                </Route>
            </WeatherProvider>
            <GardenProvider>
                <Route exact path="/gardens">
                    <MyGardens />
                </Route>
                <Route exact path="/gardens/create">
                    <GardenForm />
                </Route>
                <Route exact path="/gardens/edit/:gardenId(\d+)">
                    <GardenForm />
                </Route>
                <PlantProvider>
                    <NoteProvider>
                        <SavedPlantProvider>
                            <Route exact path="/gardens/:gardenId(\d+)">
                                <CreatedGarden />
                            </Route>
                        </SavedPlantProvider>
                    </NoteProvider>
                </PlantProvider>
            </GardenProvider>
            <PlantProvider>
                <Route exact path="/plants">
                    <PlantSearch />
                    <PlantList />
                </Route>
                <GardenProvider>
                    <SavedPlantProvider>
                            <Route exact path="/plants/details/:plantId(\d+)">
                                <PlantDetails />
                            </Route>
                    </SavedPlantProvider>
                </GardenProvider>
            </PlantProvider>
        </UserProvider>
    )
}