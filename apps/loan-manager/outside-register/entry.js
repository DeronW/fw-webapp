import { render } from 'react-dom'
import React from 'react'

import AppRouter from './router'

import { Request } from 'fw-javascripts'


import * as Stores from './stores'

import './css/index.css'

let stores = {
    registerInfo: new Stores.registerInfo(Request),
    uiStores: new Stores.uiStores(Request),
}

render(AppRouter(stores), document.getElementById('cnt'))
