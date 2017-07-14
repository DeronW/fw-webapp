import { render } from 'react-dom'

import AppRouter from './router.js'
import Stores from './stores'
import { Post } from '../lib/helpers'

let stores = {
    home:new Stores.Home(Post),
    login:new Stores.Login(Post)
}
render(AppRouter(stores),document.getElementById("cnt"))
