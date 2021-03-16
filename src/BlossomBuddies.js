import React from "react";
import { Route } from "react-router-dom";
import './BlossomBuddies.css';
import { ApplicationViews } from "./components/ApplicationViews";
import { NavBar } from "./components/nav/NavBar";

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