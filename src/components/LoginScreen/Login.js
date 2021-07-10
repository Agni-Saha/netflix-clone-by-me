import React, { useState } from 'react'
import "./Login.css"
import SignUpScreen from '../SignUpScreen/SignUp'

export default function Login() {

    const [signIn, setSignIn] = useState(false)


    return (
        <div className="loginScreen">
            <div className="loginScreen_background">
                <img
                    onClick={() => setSignIn(false)}
                    className="loginScreen_logo"
                    src="netflix-logo.png" alt=""
                />
                <button
                    onClick={() => setSignIn(true)}
                    className="loginScreen_button">
                    Sign In
                </button>
                <div className="loginScreen_gradient"></div>
            </div>
            <div className="loginScreen_body">
                {signIn
                    ? (<SignUpScreen signIn />)
                    : (<>
                        <h1>Unlimited movies, TV
                            shows and more.</h1>
                        <h2>Watch anywhere, Cancel anytime</h2>
                        <h3>
                            Ready to watch? Enter your email to
                            create or restart your
                            membership.
                        </h3>
                        <div className="loginScreen_input">
                            <form>
                                <div className="row">
                                    <input className="col-8 loginScreen_input_field" type="email" placeholder="Email Address" />
                                    <button
                                        onClick={() => setSignIn(true)}
                                        className="col-4 loginScreen_getStarted">
                                        Get Started
                                        <i className="fas fa-chevron-right ms-3"></i>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </>)
                }
            </div>
        </div>
    )
}
