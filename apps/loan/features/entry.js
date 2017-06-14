import { render } from 'react-dom'

import AppRouter from './router'

import './css/index.css'

let stores = {}

render(AppRouter(stores), document.getElementById('cnt'))
