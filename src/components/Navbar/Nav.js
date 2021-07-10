import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import "./Nav.css"

export default function Nav() {
    const [show, handleShow] = useState(false)
    const history = useHistory()

    const transitionNavbar = () => {
        if (window.scrollY > 100) {
            handleShow(true)
        }
        else {
            handleShow(false)
        }
    }

    useEffect(() => {
        window.addEventListener("scroll", transitionNavbar)
        return () => {
            window.removeEventListener("scroll", transitionNavbar)
        }
    }, [])

    return (
        <div className={`nav ${show && "nav_black"}`}>
            {/* navblack is added as class iff show is true */}
            <div className="nav_contents">
                <img
                    onClick={() => history.push("/")}
                    className="nav_logo" src="netflix-logo.png" alt="" />
                <img
                    onClick={() => history.push("/profile")}
                    className="nav_avatar" src="netflix-avatar.png" alt="" />
            </div>
        </div>
    )
}
