import { render } from 'react-dom'

import { Request } from 'fw-javascripts'

import './css/index.css'

import AppRouter from './router'

import * as Stores from './stores'


let stores = {
    currentOrder: new Stores.CurrOrder(),
    basic_info: new Stores.BasicInfo(Request),
    orders: new Stores.Orders(Request)
};

render(AppRouter(stores), document.getElementById('cnt'))
