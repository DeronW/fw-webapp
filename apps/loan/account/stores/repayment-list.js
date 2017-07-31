import { extendObservable, computed } from 'mobx'
import { Utils } from 'fw-javascripts'

export default class RepaymentList {
    constructor(Post) {
        this.Post = Post;
        extendObservable(this, {
            resultList: [],
            curPage: 1,
            loopLoanUuid: Utils.urlQuery.loopLoanUuid
        })
    }
    getRepaymentList = () => {
        this.Post(`/api/looploan/repayment/v1/repaymentRecordList.json`, {
            loopLoanUuid: this.loopLoanUuid,
            page: this.page,
            pageSize: 10
        }).then(data => {
            this.resultList = data.resultList
        })
    }
}