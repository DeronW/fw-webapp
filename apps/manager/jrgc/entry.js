
import { render } from 'react-dom'

import { Get, StoreSpy } from './helpers'

import './css/index.css'

import AppRouter from './router.js'
import * as Stores from './stores'

let stores = {
    home: new Stores.Home(Get),
    stats: new Stores.Stats(Get)
}

new StoreSpy(stores).wiretap()

render(AppRouter(stores),document.getElementById('cnt'))