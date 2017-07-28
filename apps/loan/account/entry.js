import { render } from 'react-dom'

import AppRouter from './router.js'

import './css/index.css'

import Stores from './stores'
import { Post } from '../lib/helpers'

let stores = {
    account: new Stores.Account(Post),
    bank_card: new Stores.BankCard(Post),
    redbag: new Stores.Redbag(Post),
    repayment_youyi: new Stores.RepaymentYouyi(Post),
}
render(AppRouter(stores), document.getElementById('cnt'))
