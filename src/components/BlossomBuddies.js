import React from "react";
import { Route, Redirect } from "react-router-dom"
import { Login } from "./auth/Login"
import { Register } from "./auth/Register"
import { userStorageKey } from "./auth/authSettings"
import './BlossomBuddies.css';
import { ApplicationViews } from "./ApplicationViews";
import { NavBar } from "./nav/NavBar";

export const BlossomBuddies = () => (
  <>
        <Route render={() => {
          if (sessionStorage.getItem(userStorageKey)) {
            return (
              <>
                <Route>
                  <NavBar />
                  <ApplicationViews />
                </Route>
              </>
            )
          } else {
            return <Redirect to="/login" />;
          }
      }} />

      <Route path="/login">
        <Login />
      </Route>
      <Route path="/register">
        <Register />
      </Route>
    
  </>
)