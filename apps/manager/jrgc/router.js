import React from 'react'
import { Provider } from 'mobx-react'
import {
    HashRouter as Router,
    Route,
    Switch
} from 'react-router-dom'

import { Home } from './pages'
import * as Performance from './pages/performance'

export default (stores) => {
    return <Router>
        <Provider {...stores}>
            <Switch>
                <Route exact path="/" component={Home}/>
                <Route exact path="/performance" component={Performance.Performance}/>
            </Switch>
        </Provider>
    </Router>
}