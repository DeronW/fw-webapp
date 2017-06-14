import React from 'react'
import {render} from 'react-dom'
import AppRouter from './router'
import { Request } from 'fw-javascripts'
import * as Stores from './stores'
import './css/index.css'

let stores = {
    home: new Stores.Home(Request),
    bill:new Stores.Bill(Request),
    invite:new Stores.Invite(Request),
    market:new Stores.Market(Request),
    mine:new Stores.Mine(Request)
}

render(AppRouter(stores), document.getElementById('cnt'))
