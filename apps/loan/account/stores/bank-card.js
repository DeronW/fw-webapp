import { extendObservable, computed } from 'mobx'
import { Components } from 'fw-javascripts'
import { Storage } from '../../lib/helpers'

export default class BankCard {

    constructor(Post) {
        this.Post = Post

        extendObservable(this, {
            all: [],
            supported_list: []
        })
    }

    fetch_user_list = () => {
        this.Post('/api/bankcard/v1/bankcardlist.json').then(data => {
            this.all = data.userBankList.withdrawBankcard
        })
    }

    fetch_supported_list = () => {
        if (this.supported_list.length) return;
        this.Post('/api/bankcard/v1/supportbank.json').then(data => {
            this.supported_list = data.pageData.result
        })
    }

    @computed get default_card_number() {
        let filtered = this.all.filter(e => e.isRealNameBindCard === true);
        return filtered[0] && filtered[0].cardNo || ''
    }
}