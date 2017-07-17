import React from 'react'
import { Provider } from 'mobx-react'
import {
    HashRouter as Router,
    Route,
    Switch
} from 'react-router-dom'

import AuthFail from './pages/auth-fail.js'

export default (stores) => {
    return <Router>
        <Provider {...stores} >
            <Switch>
                <Route exact path='/auth-fail' component={AuthFail} />
            </Switch>
        </Provider>
    </Router>
}
