import React, { useRef } from 'react'
import { auth } from '../../firebase'
import "./SignUp.css"

export default function SignUp() {
    const emailRef = useRef(null)
    const passwordRef = useRef(null)

    const register = (event) => {
        event.preventDefault()
        auth.createUserWithEmailAndPassword(
            emailRef.current.value,
            passwordRef.current.value
        )
            .then((authUser) => {
                console.log(authUser)
            })
            .catch(error => console.log(error))
    }

    const signIn = (event) => {
        event.preventDefault()
        auth.signInWithEmailAndPassword(
            emailRef.current.value,
            passwordRef.current.value
        )
            .then((authUser) => {
                console.log(authUser)
            })
            .catch(error => console.log(error))
    }

    return (
        <div className="signUpScreen">
            <form>
                <h1>Sign In</h1>
                <input ref={emailRef} type="email" placeholder="Email" />
                <input ref={passwordRef} type="password" placeholder="Password" />
                <button onClick={signIn} type="submit">Sign In</button>
                <h4>
                    <span className="signUpScreen_grey">New to Netflix? </span>
                    <span onClick={register} className="signUpScreen_link">Sign Up Now.</span>
                </h4>
            </form>
        </div>
    )
}
