
import { render } from 'react-dom'

import { Get, Post } from './helpers/request.js'

import './css/index.css'

import AppRouter from './router'
import StoreSpy from './helpers/store-spy.js'

import * as Stores from './stores'


let stores = {
    common: new Stores.Common(Get),
    basic: new Stores.Basic(Get),
    car: new Stores.Car(Get),
    policy_detail: new Stores.PolicyDetail(Get),
    customer: new Stores.Customer(Get, Post),
    orders: new Stores.Orders(Get),
    quotations: new Stores.Quotations(Get),
    current_order: new Stores.CurrentOrder(Get)
}

new StoreSpy(stores).wiretap()

render(AppRouter(stores), document.getElementById('cnt'))
