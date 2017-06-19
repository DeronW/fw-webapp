import { render } from 'react-dom'

import AppRouter from './router.js'

import './css/index.css'

let stores = {}

render(AppRouter(stores), document.getElementById('cnt'))
