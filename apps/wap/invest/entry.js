import "babel-polyfill";

import { render } from 'react-dom'
import { Post,Get } from './helpers/request.js'

import './css/index.css'
import AppRouter from './router'

import * as Stores from './stores'

let stores = {
    details:new Stores.Details(Post),
    myreserve:new Stores.Details(Post),
    submitReserve:new Stores.SubmitReserve(Post)
}

render(AppRouter(stores), document.getElementById('cnt'))