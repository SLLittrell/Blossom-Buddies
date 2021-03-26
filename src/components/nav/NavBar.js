import React from "react"
import { Link } from "react-router-dom"
import "./NavBar.css"
import {CenteredTabs} from "./nav"

//NavBar takes props object as parameter
//return renders when function is called
export const NavBar = (props) => {
    return (
        <>
            <CenteredTabs />
        </>
    )
}