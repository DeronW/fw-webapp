import React from 'react'
import { Provider } from 'mobx-react'
import {
    HashRouter as Router,
    Route,
    Switch
} from 'react-router-dom'

import Test from './pages/test.js'


import AuthFail from './pages/auth-fail.js'
import AuthLogin from './pages/auth-login.js'
import AuthRequest from './pages/auth-request.js'
import AuthResultProxy from './pages/auth-result-proxy.js'

export default (stores) => {
    return <Router>
        <Provider {...stores} >
            <Switch>
                <Route exact path='/test' component={Test} />


                <Route exact path='/auth-fail' component={AuthFail} />
                <Route exact path='/auth-login' component={AuthLogin} />
                <Route exact path='/auth-request' component={AuthRequest} />
                <Route exact path='/auth-result-proxy' component={AuthResultProxy} />
            </Switch>
        </Provider>
    </Router>
}
