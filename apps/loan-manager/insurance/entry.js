import { render } from 'react-dom'
import React, { Component } from 'react'

import Insurance from './router'
import { Request } from 'fw-javascripts'


import * as Stores from './stores'

import './css/index.css'

let stores = {
    home: new Stores.Home(Request),
    car: new Stores.Car(Request),
    insurance: new Stores.Insurance(Request),
    quote: new Stores.Quote(Request),
    customer: new Stores.Customer(Request),
    confirm: new Stores.Confirm(Request),
    payment: new Stores.Payment(Request),
    result: new Stores.Result(Request),
    order_list: new Stores.OrderList(Request),
    quote_detail: new Stores.QuoteDetail(Request)
}

render(Insurance(stores), document.getElementById('cnt'))