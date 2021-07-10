import React, { useEffect } from 'react';
import HomeScreen from "./components/HomeScreen/HomeScreen"
import LoginScreen from "./components/LoginScreen/Login"
import ProfileScreen from './components/ProfileScreen/Profile';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import { auth } from './firebase';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout, selectUser } from './features/userSlice';

function App() {
    const user = useSelector(selectUser)
    const dispatch = useDispatch();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(userAuth => {
            if (userAuth) {
                dispatch(
                    login({
                        uid: userAuth.uid,
                        email: userAuth.email
                    })
                )
            }
            else {
                dispatch(logout())
            }
        })

        return unsubscribe
    }, [dispatch])

    return (
        <div className="app">
            <Router>
                {
                    (!user)
                        ? (<LoginScreen />)
                        : (
                            <Switch>
                                <Route path="/profile" component={ProfileScreen} />
                                <Route exact path="/" component={HomeScreen} />
                            </Switch>
                        )
                }
            </Router>
        </div>
    );
}

export default App;
