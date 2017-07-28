import { extendObservable } from 'mobx'

export default class RepaymentYouyi {

    constructor(Post) {
        this.Post = Post;

        extendObservable(this, {
            loanId: '', //
            unpaidAmount: '', // 待还金额
            overdueAmount: '', // 逾期费
            dueDate: '', // 还款日
            paidAmount: '', // 已还金额
            bank: '', // 银行名称
            cardNo: '', // 银行卡号后四位
            repaymentAmount: '', // 还款金额
            protocolChecked: true // 是否同意协议
        })
    }

    setLoanId = (p, l) => {
        this.product = p;
        this.loanId = l;
    }

    fetchRepaymentInfo = () => {
        this.Post('/api/looploan/repayment/v1/loanDetail.json', { loanUuid: this.loanId })
            .then(data => {
                this.unpaidAmount = data.loanLeftAmt;
                this.overdueAmount = data.overdueFee;
                this.dueDate = (new Date(data.dueTime)).toJSON().slice(0, 10);
                this.paidAmount = data.repaymentAmount;
                this.bank = data.bankName;
                this.cardNo = data.withdrawCardNo;
            })
    }

}
