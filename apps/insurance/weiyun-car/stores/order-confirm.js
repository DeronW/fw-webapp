import {extendObservable, computed} from 'mobx'

export default class OrderConfirm {

    constructor(request, state = {}) {
        this.request = request
        extendObservable(this, {
            offer_money: 4000, //报价
            preferential_amount: 500,//优惠额度
            settlement_amount: 3500 //实际结算金额
        }, state)
    }

}
