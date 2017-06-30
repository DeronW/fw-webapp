import { extendObservable, computed } from 'mobx'
import { Components } from 'fw-javascripts'

export default class RedBag {
    constructor(Post) {
        this.Post = Post

        extendObservable(this, {
            batchGid: '',
            freezeAmt: '',
            hasWithdrawAmt: '',
            cardList: [],
            borrowBtnStatus: ''
        })
    }

    @computed get default_card_number() {
        let filtered = this.cardList.filter(e => e.isRealNameBindCard === true);
        return filtered[0] && { cardNo: filtered[0].cardNo, uuid: filtered[0].uuid }
    }

    fetch_packet_num = () => {
        return this.Post('/api/redbag/v1/summary.json').then(data => {
            this.batchGid = data.batchGid;
            this.freezeAmt = data.freezeAmt;
            this.hasWithdrawAmt = data.hasWithdrawAmt;
        }, e => Components.showToast(e.message))
    }

    fetch_user_status = () => {
        return this.Post('/api/loan/v1/baseinfo.json', { productId: 1 }).then(data => {
            this.borrowBtnStatus = data.borrowBtnStatus;
        }, e => Components.showToast(e.message))
    }

    fetch_bankcard_list = () => {
        return this.Post('/api/bankcard/v1/bankcardlist.json').then(data => {
            this.cardList = data.userBankList.withdrawBankcard;
        }, e => Components.showToast(e.message))
    }

    getSMSCode = () => {
        return this.Post('/api/redbag/v1/veriftycode.json', {
            batchGid: this.batchGid
        }).then(data => { }, e => Components.showToast(e.message))
    }

    withdrawConfirm = (value, uuid) => {
        return this.Post('/api/redbag/v1/apply.json', {
            batchGid: this.batchGid,
            verifyCode: value,
            withdrawAmt: this.withdrawAmt,
            withdrawCardUuid: uuid
        })
    }

}

