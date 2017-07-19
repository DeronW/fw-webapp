import { render } from 'react-dom'
import AppRouter from './router.js'

import Stores from './stores'
import { Post } from '../lib/helpers'

import './css/index.css'


let stores = {
    jrgc_home: new Stores.Home(Post),
    jrgc_login: new Stores.Login(Post)
}

render(AppRouter(stores), document.getElementById('cnt'))
