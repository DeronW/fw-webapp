import React from 'react'
import { Provider } from 'mobx-react'
import {
    HashRouter as Router,
    Route,
    Switch
} from 'react-router-dom'


export default () => {
    return <Router>
        <Provider>
            <Switch>
            </Switch>
        </Provider>
    </Router>
}
