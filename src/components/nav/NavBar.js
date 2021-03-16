import React from "react"
import { Link } from "react-router-dom"
import "./NavBar.css"
//NavBar takes props object as paremeter
//return renders when function is called
export const NavBar = (props) => {
    return (
        <>
            <header>Blossom Buddies</header>
            <ul className="navbar">
                <li className="navbar__item active">
                    <Link className="navbar__link" to="/">Home</Link>
                </li>
                <li className="navbar__item">
                    <Link className="navbar__link" to="/gardens">My Gardens</Link>
                </li>
                <li className="navbar__item">
                    <Link className="navbar__link" to="/plants">Plant List</Link>
                </li>
            </ul>
        </>
    )
}