import { render } from 'react-dom'
import React from 'react'

import Withdraw from './router'
import { Request } from 'fw-javascripts'


import * as Stores from './stores'

import './css/index.css'

let stores = {
    cash: new Stores.Cash(Request),
    cash_records: new Stores.CashRecords(Request),
    reset_deal_password: new Stores.ResetDealPassword(Request),
}

render(Withdraw(stores), document.getElementById('cnt'))