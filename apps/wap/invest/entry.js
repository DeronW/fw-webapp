import "babel-polyfill";

import { render } from 'react-dom'
import { Post, Get, Ajax, StoreSpy } from './helpers'

import './css/index.css'
import AppRouter from './router'

import * as Stores from './stores'


let stores = {
    reserve: new Stores.Reserve(Post),
    faxian: new Stores.FaXian(Ajax, Post),
}


new StoreSpy(stores).wiretap()

render(AppRouter(stores), document.getElementById('cnt'))