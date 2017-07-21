import React from 'react'
import { Provider } from 'mobx-react'
import {
    HashRouter as Router,
    Route,
    Switch
} from 'react-router-dom'

import Details from './pages/details'
import MyReserve from './pages/my-reserve'
import SubmitReserve from './pages/submit-reserve'

export default (stores) => {
    return <Router>
        <Proviser {...stores}>
            <Switch>
                <Route exact path="/details" component={Details} />
                <Route exact path="/my-reserve" component={MyReserve} />
                <Route exact path="/submit-reserve" component={SubmitReserve} />
            </Switch>
        </Proviser>
    </Router>
}