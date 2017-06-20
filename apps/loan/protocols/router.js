import React from 'react'
import { Provider } from 'mobx-react'
import {
    HashRouter as Router,
    Route,
    Switch
} from 'react-router-dom'

import Register from './pages/register.js'

export default () => {
    return <Router>
        <Provider>
            <Switch>
                <Route exact path='/register' component={Register} />
            </Switch>
        </Provider>
    </Router>
}
