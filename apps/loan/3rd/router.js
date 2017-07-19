import React from 'react'
import { Provider } from 'mobx-react'
import {
    HashRouter as Router,
    Route,
    Switch
} from 'react-router-dom'

import AuthFail from './pages/auth-fail.js'
import AuthLogin from './pages/auth-login.js'
import AuthRequest from './pages/auth-request.js'
import AuthResultProxy from './pages/auth-result-proxy.js'

import JRGCHome from "./pages/jrgc-home.js"
import JRGCLogin from "./pages/jrgc-login.js"

export default (stores) => {
    return <Router>
        <Provider {...stores} >
            <Switch>
                <Route exact path='/auth-fail' component={AuthFail} />
                <Route exact path='/auth-login' component={AuthLogin} />
                <Route exact path='/auth-request' component={AuthRequest} />
                <Route exact path='/auth-result-proxy' component={AuthResultProxy} />

                {/* 金融工场作为内部第三方, 有特殊的处理方式  */}
                <Route exact path="/jrgc-home" component={JRGCHome} />
                <Route exact path="/jrgc-login" component={JRGCLogin} />

            </Switch>
        </Provider>
    </Router>
}
