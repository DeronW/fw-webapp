import { render } from 'react-dom'

import AppRouter from './router.js'

import './css/index.css'

import Stores from './stores'
import { Post } from '../lib/helpers'

let stores = {
    account: new Stores.Account(Post)
}

render(AppRouter(stores), document.getElementById('cnt'))
