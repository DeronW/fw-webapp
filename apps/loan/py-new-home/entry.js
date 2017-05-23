import React from 'react'
import {render} from 'react-dom'
import AppRouter from './router'
import { Request } from 'fw-javascripts'
import * as Stores from './stores'
import './css/index.css'

let stores = {
    account: new Stores.Account(Request),
    home: new Stores.Home(Request),
    fxh: new Stores.Fxh(Request),
    fxh_want: new Stores.FxhWant(Request),
    fxh_confirm: new Stores.FxhConfirm(Request),
    dumiao:new Stores.Dumiao(Request),
    dumiao_detail:new Stores.DumiaoDetail(Request),
    dumiao_form:new Stores.DumiaoForm(Request),
    bill:new Stores.Bill(Request),
    invite:new Stores.Invite(Request),
    market:new Stores.Market(Request),
    mine:new Stores.Mine(Request)
}

render(AppRouter(stores), document.getElementById('cnt'))
