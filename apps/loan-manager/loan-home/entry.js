import { render } from 'react-dom'
import React from 'react'

import './css/index.css'

import AppRouter from './router'
import { Request } from 'fw-javascripts'

import $LOAN from '../../../es7-lib/javascripts/new-loan'

import * as Stores from './stores'


let stores = { account: new Stores.Account($LOAN.Post) },
    AuthPost = stores.account.authPost;

stores = Object.assign(stores, {
    products: new Stores.Products(AuthPost),
    bills: new Stores.Bills(AuthPost)
})

render(AppRouter(stores), document.getElementById('cnt'))
