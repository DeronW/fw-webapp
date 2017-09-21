import React from 'react'
import { Provider } from 'mobx-react'
import {
    HashRouter as Router,
    Route,
    Switch
} from 'react-router-dom'

import * as Home from './pages/home'

export default (stores) => {
    return <Router>
        <Provider {...stores}>
            <Switch>
                <Route exact path="/" component={Home.Mine}/>
            </Switch>
        </Provider>
    </Router>
}