import {render} from 'react-dom'

import {Get, Post, StoreSpy} from './helpers'

import './css/index.css'

import AppRouter from './router.js'
import * as Stores from './stores'

let stores = {
    login: new Stores.Login(Post),
    user: new Stores.User(Get, Post),
    user_coupon: new Stores.UserCoupon(Get, Post),
    investor: new Stores.Investor(Get),
    investor_account: new Stores.InvestorAccount(Get,Post),
    stats_overview: new Stores.StatsOverview(Get),
    stats_investor: new Stores.StatsInvestor(Get)
}

new StoreSpy(stores).wiretap()

render(AppRouter(stores), document.getElementById('cnt'))