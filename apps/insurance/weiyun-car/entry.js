import { render } from 'react-dom'

import { Request } from 'fw-javascripts'

import './css/index.css'

import AppRouter from './router'

import * as Stores from './stores'


let stores = {
    basic_info: new Stores.BasicInfo(Request),
    car_info: new Stores.CarInfo(Request),
    policy_detail: new Stores.PolicyDetail(Request),
    policy_quotation: new Stores.PolicyQuotation(Request),
}

render(AppRouter(stores), document.getElementById('cnt'))
