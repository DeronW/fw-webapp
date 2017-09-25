
import { render } from 'react-dom'

import { Get, Post,StoreSpy } from './helpers'

import './css/index.css'

import AppRouter from './router.js'
import * as Stores from './stores'

let stores = {
    login: new Stores.Login(),
    user: new Stores.User(),
    stats: new Stores.Stats()
}

new StoreSpy(stores).wiretap()

render(AppRouter(stores),document.getElementById('cnt'))