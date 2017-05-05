import React from 'react'
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'
import { Provider } from 'mobx-react'
import {
    HashRouter as Router,
    Route,
    Switch,
    Redirect,
    Link
} from 'react-router-dom'

import Login from './pages/login'
import NoMatch from './pages/no-match'
import StatisRegister from './pages/statis-register'
import StatisChart from './pages/statis-chart'
import StatisApply from './pages/statis-apply'

export default (stores) => {

    return <Router>
        <Provider {...stores} >
            <Switch>
                <Route path='/login' component={Login} />

                <CSSTransitionGroup
                    transitionName="carousel"
                    transitionEnterTimeout={500}
                    transitionLeaveTimeout={300}>
                    <Route exact path='/statis/register' component={StatisRegister} />
                    <Route exact path='/statis/apply' component={StatisApply} />
                    <Route exact path='/statis/chart' component={StatisChart} />
                </CSSTransitionGroup>

                <Route path='/'>
                    <Redirect to='/login' />
                </Route>
                <Route component={NoMatch} />
            </Switch>
        </Provider>
    </Router>

}
