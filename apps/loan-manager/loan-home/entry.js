import { render } from 'react-dom'
import React from 'react'

import './css/index.css'

import AppRouter from './router'
import { Request } from 'fw-javascripts'

import * as Stores from './stores'

let stores = {
    products: new Stores.Products(Request),
    bills: new Stores.Bills(Request)
}

render(AppRouter(stores), document.getElementById('cnt'))
