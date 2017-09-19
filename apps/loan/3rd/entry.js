import { render } from 'react-dom'
import AppRouter from './router.js'

import Stores from './stores'
import { Post, StoreSpy } from '../lib/helpers'

import './css/index.css'


let stores = {
    jrgc_home: new Stores.JRGCHome(Post),
    jrgc_login: new Stores.JRGCLogin(Post),
    idcard_ocr: new Stores.IdcardOcr(Post),
}

new StoreSpy(stores).wiretap()

render(AppRouter(stores), document.getElementById('cnt'))
