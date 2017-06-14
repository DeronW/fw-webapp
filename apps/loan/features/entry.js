import { render } from 'react-dom'

import Request from '../../../es7-lib/loan/helpers/request.js'

import AppRouter from './router'

import './css/index.css'

let stores = {}

render(AppRouter(stores), document.getElementById('cnt'))
