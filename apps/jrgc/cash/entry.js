import {render} from 'react-dom'
import {Ajax, Get, Post} from './helpers'
import './css/index.css'
import AppRouter from './router.js'
import * as Stores from './stores'

let stores = {}

render(AppRouter(stores), document.getElementById('cnt'))