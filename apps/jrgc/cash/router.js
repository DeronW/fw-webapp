import React from 'react'
import { Provider } from 'mobx-react'
import {
    HashRouter as Router,
    Route,
    Switch
} from 'react-router-dom'


import Home from './pages/home'


export default (stores) => {
    return <Router>
        <Provider {...stores}>
            <Switch>
                {/* 首页 */}
                <Route exact path="/" component={Home}/>
            </Switch>
        </Provider>
    </Router>
}