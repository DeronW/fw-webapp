import React from 'react'
import {Provider} from 'mobx-react'
import {HashRouter as Router, Route, Switch} from 'react-router-dom'

import More from './pages/more.js'
import AboutUs from './pages/about-us.js'
import FAQ from './pages/faq.js'
import MarketApp from './pages/market-app.js'
import ContactUs from './pages/contact-us.js'
import NotFound from './pages/not-found.js'
import CreditCards from './pages/credit-cards.js'
import InviteActivity from './pages/invite-activity.js'
import Download from './pages/download.js'
import Waiting from './pages/waiting.js'
import FxhappDownload from './pages/fxhapp-download.js'
import JrgcappDownload from './pages/jrgcapp-download.js'
import WeixinInvite from './pages/weixin-invite.js'


export default(stores) => {
    return <Router>
        <Provider {...stores}>
            <Switch>
                <Route exact path='/waiting' component={Waiting}/>
                <Route exact path='/more' component={More}/>
                <Route exact path='/about-us' component={AboutUs}/>
                <Route exact path='/faq' component={FAQ}/>
                <Route exact path='/market-app' component={MarketApp}/>
                <Route exact path='/contact-us' component={ContactUs}/>
                <Route exact path='/credit-cards' component={CreditCards}/>
                <Route exact path='/not-found' component={NotFound}/>
                <Route exact path='/download' component={Download}/>
                <Route exact path='/invite-activity' component={InviteActivity}/>
                <Route exact path='/follow-fxh' component={FxhappDownload}/>
                <Route exact path='/follow-jrgc' component={JrgcappDownload}/>
            <Route exact path='/weixin-invite' component={WeixinInvite}/>
            </Switch>
        </Provider>
    </Router>
}
