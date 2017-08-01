import { extendObservable } from 'mobx'

export default class RepaymentYouyi {

    constructor(Post) {
        this.Post = Post;

        extendObservable(this, {
            loanId: '', //
            repaymentUuid: '',
            unpaidAmount: '', // 待还金额
            overdueAmount: '', // 逾期费
            dueDate: '', // 还款日
            paidAmount: '', // 已还金额
            bank: '', // 银行名称
            cardNo: '', // 银行卡号后四位
            repaymentAmount: '', // 还款金额
            protocolChecked: true, // 是否同意协议
        })
    }

    setLoanId = id => this.loanId = id

    setRepaymentId = id => this.repaymentUuid = id

    setAmount = v => {
        this.repaymentAmount = v;
    }

    fetchRepaymentInfo = () => {
        return this.Post('/api/looploan/repayment/v1/loanDetail.json', { loanUuid: this.loanId })
            .then(data => {
                this.unpaidAmount = data.loanLeftAmt;
                this.overdueAmount = data.overdueFee;
                this.dueDate = (new Date(data.dueTime)).toJSON().slice(0, 10);
                this.paidAmount = data.repaymentAmount;
                this.bank = data.bankName;
                this.cardNo = data.withdrawCardNo;
                if (this.unpaidAmount < 200) this.repaymentAmount = this.unpaidAmount;
            })
    }

    submitRepayment = () => {
        return this.Post('/api/looploan/repayment/v1/checkSmsVerifyCode.json', {
            loopLoanUuid: this.loanId,
            repaymentAmt: this.repaymentAmount
        }).then(data => {
            this.setRepaymentId(data.repaymentUuid);
            return data.repaymentUuid
        })
    }

    getSMS = () => {
        return this.Post('/api/looploan/repayment/v1/resendVerifyCode.json', {
            repaymentUuid: this.repaymentUuid
        })
    }

    confirmRepayment = (history, SMSInput) => {
        this.Post('/api/looploan/repayment/v1/do.json', {
            repaymentUuid: this.repaymentUuid,
            verifycode: SMSInput
        }).then(data => {
            setTimeout(() => {
                history.push('/repayment-result')
            }, 1700)
        })
    }

}
