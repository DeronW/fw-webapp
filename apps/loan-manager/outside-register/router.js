import React from 'react'
import { Provider } from 'mobx-react'
import {
    HashRouter as Router,
    Route,
    Switch,
    Redirect,
    Link
} from 'react-router-dom'

import Register from './pages/register'

export default (stores) => {
    return <Router>
        <Provider {...stores} >
            <Route exact path='/' component={Register} />
        </Provider>
    </Router>
}
