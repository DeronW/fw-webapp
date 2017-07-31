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
        // let USER = Storage.getUserDict();
        // this.uid = USER.uid;
        // this.userGid = USER.Gid;


        this.Post(`/api/order/v1/orderList.json`, {
            // loopLoanUuid: this.loopLoanUuid,
            page: this.page,
            pageSize: 10,
            // uid: this.uid,
            // userGid: this.userGid,
            loanStatus: 2

        }).then(data => {
            this.resultList = data.resultList
        })

    }
}