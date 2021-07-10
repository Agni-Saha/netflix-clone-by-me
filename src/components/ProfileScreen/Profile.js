import React, { Component } from 'react'
import { auth } from '../../firebase'
import PlanScreen from '../PlanScreen/PlanScreen'
import "./Profile.css"

export default class Profile extends Component {
    render() {
        return (
            <div className="profileScreen">
                <nav className="profileScreen_Nav">
                    <img
                        onClick={() => this.props.history.push("/")}
                        src="netflix-logo.png" alt=""
                    />
                    <h2 onClick={() => {
                        auth.signOut();
                        this.props.history.push("/")
                    }} >
                        Sign Out
                    </h2>
                </nav>
                <PlanScreen />
            </div>
        )
    }
}


