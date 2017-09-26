import { render } from 'react-dom'

import AppRouter from './router.js'

import './css/index.css'

import Stores from './stores'
import { Post, StoreSpy } from '../lib/helpers'

let stores = {
}

new StoreSpy(stores).wiretap()

render(AppRouter(stores), document.getElementById('cnt'))
