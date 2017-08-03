import { extendObservable } from 'mobx'

export default class RepaymentFangXinResult {

    constructor(Post) {
        this.Post = Post;

        extendObservable(this, {
            repaymentUuid: '',
            product: '', // 'fangxin', 'youyi'
            repaymentResult: '', // 'fail', 'success', 'waiting'
            leftAmount: '' // 还款成功后仍剩余金额
        })
    }

    setUidAndProduct = (id) => {
        this.repaymentUuid = id;
    }

    fetchRepaymentResult = () => {
        this.Post('/api/repayment/v1/repaymentstatus.json', {
            repaymentGid: this.repaymentUuid
        }).then(data => {
            let { loanLeftAmount, repaymentAmount, status } = data;
            this.leftAmount = loanLeftAmount;
            this.repaymentAmount = repaymentAmount;
            if (status == 0) {
                this.repaymentResult = 'waiting'
            } else if (status == 1) {
                this.repaymentResult = 'success'
            } else if (status == 2) {
                this.repaymentResult = 'fail'
            }
        })
    }

}
