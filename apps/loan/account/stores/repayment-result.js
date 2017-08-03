import { extendObservable } from 'mobx'

export default class RepaymentYouyi {

    constructor(Post) {
        this.Post = Post;

        extendObservable(this, {
            repaymentUuid: '',
            product: '', // 'fangxin', 'youyi'
            repaymentResult: '', // 'fail', 'success', 'waiting'
            leftAmount: '' // 还款成功后仍剩余金额
        })
    }

    setUidAndProduct = (id, p) => {
        this.repaymentUuid = id;
        this.product = p;
    }

    fetchRepaymentResult = () => {
        let postUrl, postData;

        if (this.product == 'fangxin') {
            postUrl = '/api/repayment/v1/repaymentstatus.json';
            postData = { repaymentGid: this.repaymentUuid };
        } else if (this.product == 'youyi') {
            postUrl = '/api/looploan/repayment/v1/repaymentStatus.json';
            postData = { repaymentUuid: this.repaymentUuid };
        }

        this.Post(postUrl, postData).then(data => {
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
