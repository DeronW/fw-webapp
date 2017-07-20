import React from 'react'
import { Provider } from 'mobx-react'
import {
    HashRouter as Router,
    Route,
    Switch
} from 'react-router-dom'

import Fail from './pages/fail.js'
import Authorize from './pages/authorize.js'
import Interface from './pages/interface.js'

import JRGCHome from "./pages/jrgc-home.js"
import JRGCLogin from "./pages/jrgc-login.js"

export default (stores) => {
    return <Router>
        <Provider {...stores} >
            <Switch>
                <Route exact path='/fail' component={Fail} />
                <Route exact path='/authorize' component={Authorize} />
                <Route exact path='/interface' component={Interface} />

                {/* 金融工场作为内部第三方, 有特殊的处理方式  */}
                <Route exact path="/jrgc-home" component={JRGCHome} />
                <Route exact path="/jrgc-login" component={JRGCLogin} />

            </Switch>
        </Provider>
    </Router>
}
