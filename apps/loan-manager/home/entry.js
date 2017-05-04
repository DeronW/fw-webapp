import { render } from 'react-dom'
import React from 'react'

import Router from './router.js'
import * as Stores from './stores'

import './less/index.less'

let stores = {
    user: new Stores.User(Request),
    statis_register: new Stores.StatisRegister(Request),
    statis_apply: new Stores.StatisApply(Request),
    statis_chart: new Stores.StatisChart(Request),
}


render(<Router stores={stores} />, document.getElementById('cnt'))
