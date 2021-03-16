import React from "react"
import { Route } from "react-router-dom"
import { Home } from "./Home"
import { UserProvider } from "./users/UserProvider"

export const ApplicationViews = () => {
    return (
        <UserProvider>
            <Route exact path="/">
                <Home />
            </Route>
        </UserProvider>
    )
}