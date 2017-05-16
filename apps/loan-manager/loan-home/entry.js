import { render } from 'react-dom'
import React from 'react'

import AppRouter from './router'
import { Request } from 'fw-javascripts'


import * as Stores from './stores'


let stores = {
    products: new Stores.Products(Request)
}

render(AppRouter(stores), document.getElementById('cnt'))
