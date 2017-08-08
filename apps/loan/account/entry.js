import { render } from 'react-dom'

import AppRouter from './router.js'
import './css/index.css'
import Stores from './stores'
import { Post, StoreSpy, mobxStoreExtend } from '../lib/helpers'

let stores = {
    account: new (mobxStoreExtend(Stores.Account))(Post),
    bank_card: new Stores.BankCard(Post),
    redbag: new Stores.Redbag(Post),
    repayment_youyi: new Stores.RepaymentYouyi(Post),
    repayment_fangxin: new Stores.RepaymentFangXin(Post),
}

new StoreSpy(stores).wiretap()

render(AppRouter(stores), document.getElementById('cnt'))
