import React from 'react'
import { Provider } from 'mobx-react'
import {
    HashRouter as Router,
    Route,
    Switch
} from 'react-router-dom'


import * as Home from './pages/home'
import * as Stats from './pages/stats'

export default (stores) => {
    return <Router>
        <Provider {...stores}>
            <Switch>
                <Route exact path="/" component={Home.Mine}/>
                <Route exact path="/home-rebate" component={Home.Rebate}/>
                {/* 业绩 相关页面 */}
                <Route exact path="/stats" component={Stats.Stats}/>
            </Switch>
        </Provider>
    </Router>
}