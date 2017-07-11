import React from "react"
import { Provider } from "mobx-react"
import {
    HashRouter as Router,
    Route,
    Switch
} from "react-router-dom"

import Home from "./pages/home.js"
import Login from "./pages/login.js"

export default (stores) =>{
    return <Router>
        <Provider {...stores}>
            <Switch>
                <Route exact path="/home" component={Home}/>
                <Route exact path="/login" component={Login}/>
            </Switch>
        </Provider>
    </Router>
}