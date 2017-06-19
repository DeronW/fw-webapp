import React from 'react'
import { Provider } from 'mobx-react'
import {
    HashRouter as Router,
    Route,
    Switch
} from 'react-router-dom'

import Entry from './pages/entry.js'
import Login from './pages/login.js'
import SetPassword from './pages/set-password.js'

export default (stores) => {
    return <Router>
        <Provider {...stores} >
            <Switch>
                <Route exact path='/entry' component={Entry} />
                <Route exact path='/login' component={Login} />
                <Route exact path='/set-password' component={SetPassword} />
            </Switch>
        </Provider>
    </Router>
}
