import { render } from 'react-dom'

import AppRouter from './router.js'

import './css/index.css'

import Stores from './stores'
import { Post } from '../lib/helpers'

let stores = {
    account: new Stores.Account(Post),
    bank_card: new Stores.BankCard(Post),
    red_bag: new Stores.RedBag(Post),
    red_packet_detail: new Stores.RedPacketDetail(Post)
}
render(AppRouter(stores), document.getElementById('cnt'))