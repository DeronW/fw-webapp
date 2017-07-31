import { extendObservable, computed } from 'mobx'
import { Utils } from 'fw-javascripts'
import { Storage } from '../../lib/helpers'

export default class RepaymentList {
    constructor(Post) {
        this.Post = Post;
        extendObservable(this, {
            resultList: [],
            curPage: 1,
            uid: ""
        })
    }
    getRepaymentList = () => {
        this.Post(`/api/order/v1/orderList.json`, {
            page: this.page,
            pageSize: 10,
            loanStatus: 2
        }).then(data => {
            this.resultList = data.resultList
        })

    }
}