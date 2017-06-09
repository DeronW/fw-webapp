import { render } from 'react-dom'

import { Request } from 'fw-javascripts'

import './css/index.css'

import AppRouter from './router'

import * as Stores from './stores'


let stores = {
    basic_info: new Stores.BasicInfo(Request),
    basic_info_plus: new Stores.BasicInfoPlus(Request),
    policy_detail: new Stores.PolicyDetail(Request),
};

render(AppRouter(stores), document.getElementById('cnt'))
