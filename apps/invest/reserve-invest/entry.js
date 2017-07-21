import "babel-polyfill";

import { render } from 'react-dom'
import { GET } from './helpers/request.js'

import './css/index/css'
import AppRouter from './router'

import * as Stores from './stores'

let stores = {

}

render(AppRouter(stores), document.getElementById('cnt'))