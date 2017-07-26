import React from 'react'
import { Provider } from 'mobx-react'
import {
    HashRouter as Router,
    Route,
    Switch
} from 'react-router-dom'

import UserEvaluate from './pages/user/evaluate.js'
import Details from './pages/details'
import MyReserve from './pages/my-reserve'
import SubmitReserve from './pages/submit-reserve'

export default (stores) => {
    return <Router>
        <Provider {...stores}>
            <Switch>
                <Route exact path="/user/evaluate" component={UserEvaluate} />

                <Route exact path="/details" component={Details} />
                <Route exact path="/submit-reserve" component={SubmitReserve} />
                <Route exact path="/my-reserve" component={MyReserve} />
            </Switch>
        </Provider>
    </Router>
}