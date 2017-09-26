
import { render } from 'react-dom'

import { Get, StoreSpy } from './helpers'

import './css/index.css'

import AppRouter from './router.js'
import * as Stores from './stores'

let stores = {
    login: new Stores.Login(),
    user: new Stores.User(),
    stats_overview: new Stores.StatsOverview(Get),
    stats_investor: new Stores.StatsInvestor(Get)
}

new StoreSpy(stores).wiretap()

render(AppRouter(stores),document.getElementById('cnt'))