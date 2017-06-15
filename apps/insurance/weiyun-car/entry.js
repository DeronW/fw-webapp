import { render } from 'react-dom'

import { Get } from './helpers/request.js'

import './css/index.css'

import AppRouter from './router'

import * as Stores from './stores'

console.log(Get);
let stores = {
    basic_info: new Stores.BasicInfo(Get),
    car_info: new Stores.CarInfo(Get),
    policy_detail: new Stores.PolicyDetail(Get),
    customer_info: new Stores.CustomerInfo(Get),
    orders: new Stores.Orders(Get),
    quotations: new Stores.Quotations(Get),
    current_order: new Stores.CurrentOrder(Get)
}

render(AppRouter(stores), document.getElementById('cnt'))
