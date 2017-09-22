import { extendObservable, computed } from 'mobx'
import { Storage } from '../../lib/helpers'
import { Components } from 'fw-javascripts'

export default class BankCard {

    constructor(Post) {
        this.Post = Post

        extendObservable(this, {
            all: [],
            supported_list: [],
            new_card: {
                operatorBankcardGid: null,
                phone: ''
            }
        })
    }

    fetch_card_list = () => {
        return this.Post('/api/bankcard/v1/bankcardlist.json').then(data => {
            this.all = data.userBankList.withdrawBankcard
        }, { loading: false })
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

    add_new_card_info = (bank_name, card_no, card_type, phone, user_status) => {
        return this.Post('/api/bankcard/v1/commitinfo.json', {
            bankName: bank_name,
            cardNo: card_no,
            cardType: card_type,
            mobile: phone,
            operatorType: user_status < 2 ? 1 : 2
        }).then(data => {
            this.new_card = {
                operatorBankcardGid: data.bindBankInfo.operatorBankcardGid,
                phone: phone
            }
        }, e => Components.showToast(e.message))
    }

}