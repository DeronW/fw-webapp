import "babel-polyfill"

import { render } from 'react-dom'

import { Get, Post,StoreSpy } from './helpers'

import AppRouter from './router.js'
import * as Stores from './stores'

let stores = {
    home:new Stores.Home()
}

new StoreSpy(stores).wiretap()

render(AppRouter(stores),document.getElementById('cnt'))