import React from "react";
import { Route } from "react-router-dom";
import './BlossomBuddies.css';
import { ApplicationViews } from "./components/ApplicationViews";
import { NavBar } from "./components/nav/NavBar";

export const BlossomBuddies = () => (
  <>
    <Route>
      <NavBar />
      <ApplicationViews />
    </Route>
  </>
)