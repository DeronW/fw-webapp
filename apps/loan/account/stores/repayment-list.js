import { extendObservable, computed } from 'mobx'
import { Utils } from 'fw-javascripts'
import { Storage } from '../../lib/helpers'

export default class RepaymentList {
    constructor(Post) {
        this.Post = Post;
        extendObservable(this, {
            resultList: [],
            curPage: 1,
            // loopLoanUuid: Utils.urlQuery.loopLoanUuid
            uid: "",
            userGid: ""
        })
    }
    getRepaymentList = () => {
        let loanStatus;
        let USER = Storage.getUserDict();
        console.log(USER)
        this.uid = USER.uid;
        this.userGid = USER.gid;


        // this.Post(`/api/order/v1/orderList.json`, {
        //     // loopLoanUuid: this.loopLoanUuid,
        //     page: this.page,
        //     pageSize: 10,
        //     uid: this.uid,
        //     userGid: this.userGid,

        // }).then(data => {
        //     this.resultList = data.resultList
        // })

        this.Post(`/api/looploan/repayment/v1/repaymentRecordList.json`, {
            loopLoanUuid: this.loopLoanUuid,
            page: this.page,
            pageSize: 10

        }).then(data => {
            this.resultList = data.resultList
        })
    }
}