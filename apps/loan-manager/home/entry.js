import { render } from 'react-dom'
import React from 'react'

import AppRouter from './router'
import { Request } from 'fw-javascripts'


import * as Stores from './stores'

import './css/index.css'

let stores = {
    account: new Stores.Account(Request),
    statis_register: new Stores.StatisRegister(Request),
    statis_apply: new Stores.StatisApply(Request),
    statis_chart: new Stores.StatisChart(Request),
}

render(AppRouter(stores), document.getElementById('cnt'))
