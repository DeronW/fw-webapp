import { render } from 'react-dom'

import Request from './helpers/request.js'

import './css/index.css'

import AppRouter from './router'

import * as Stores from './stores'


let stores = {
    basic_info: new Stores.BasicInfo(Request),
    car_info: new Stores.CarInfo(Request),
    policy_detail: new Stores.PolicyDetail(Request),
    policy_quotation: new Stores.PolicyQuotation(Request),
    customer_info: new Stores.CustomerInfo(Request),
    orders: new Stores.Orders(Request),
}

render(AppRouter(stores), document.getElementById('cnt'))
