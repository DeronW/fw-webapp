import React from 'react'
import {Provider} from 'mobx-react'
import {IndexRoute} from 'react-router'
import {
    HashRouter as Router,
    Route,
    Switch,
    Redirect,
    Link,
    hashHistory
} from 'react-router-dom'

import Home from './pages/home'
import Bill from './pages/bill'
import Invite from './pages/invite'
import Market from './pages/market'
import Mine from './pages/mine'

export default (stores) => {
    return <Router>
        <Provider {...stores}>
           <switch>
               <Route path="/home" component={Home}/>
               <Route exact path="/bill" component={Bill}/>
               <Route exact path="/invite" component={Invite}/>
               <Route exact path="/market" component={Market}/>
               <Route exact path="/mine" component={Mine}/>
           </switch>
        </Provider>
    </Router>
}
