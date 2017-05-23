import React from 'react'
import {Provider} from 'mobx-react'
import {IndexRoute} from 'react-router'
import {
    HashRouter as Router,
    Route,
    Switch,
    Redirect,
    Link
} from 'react-router-dom'

import Home from './pages/home'
import Fxh from './pages/fxh'
import FxhWant from './pages/fxh-want'
import FxhConfirm from './pages/fxh-confirm'
import Dumiao from './pages/dumiao'
import DumiaoDetail from './pages/dumiao-detail'
import DumiaoForm from './pages/dumiao-form'
import Bill from './pages/bill'
import Invite from './pages/invite'
import Market from './pages/market'
import Mine from './pages/mine'

export default (stores) => {
    return <Router>
        <Provider {...stores}>
           <switch>
               <Route path="/home" component={Home}/>
               <Route exact path="/fxh" component={Fxh}/>
               <Route exact path="/fxh-want" component={FxhWant}/>
               <Route exact path="/fxh-confirm" component={FxhConfirm}/>
               <Route exact path="/dumiao" component={Dumiao}/>
               <Route exact path="/dumiao-detail" component={DumiaoDetail}/>
               <Route exact path="/dumiao-form" component={DumiaoForm}/>
               <Route exact path="/bill" component={Bill}/>
               <Route exact path="/invite" component={Invite}/>
               <Route exact path="/market" component={Market}/>
               <Route exact path="/mine" component={Mine}/>
           </switch>
        </Provider>
    </Router>
}
