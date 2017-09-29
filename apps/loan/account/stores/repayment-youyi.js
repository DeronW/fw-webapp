import { extendObservable } from 'mobx'

export default class RepaymentYouyi {

    constructor(Post) {
        this.Post = Post

        this.data = {}

        extendObservable(this.data, {
            loanId: ''
        })

        extendObservable(this, {
            logoUrl: '',
            repaymentUuid: '',
            loopLoanUuid: '',
            unpaidAmount: '', // 待还金额
            overdueAmount: '', // 逾期费
            dueDate: '', // 还款日
            paidAmount: '', // 已还金额
            bank: '', // 银行名称
            cardNo: '', // 银行卡号后四位
            repaymentAmount: '', // 还款金额
            protocolChecked: true, // 是否同意协议,
            records: [], // 还款记录
            repaymentResult: '', // 'fail', 'success', 'waiting'
            leftAmount: '', // 还款成功后仍剩余金额
            errMessage:''
        })
    }

    setLoanId = id => this.data.loanId = id

    setLoopLoanUuid = id => this.loopLoanUuid = id

    setRepaymentId = id => this.repaymentUuid = id

    setAmount = v => this.repaymentAmount = v

    resetAmount = () => this.repaymentAmount = ''

    clearRecords = () => this.records = []

    fetchRepaymentInfo = () => {
        return this.Post('/api/looploan/repayment/v1/loanDetail.json', {
            loanUuid: this.data.loanId
        }).then(data => {
            this.logoUrl = data.productLogo;
            this.unpaidAmount = data.loanLeftAmountStr;
            this.overdueAmount = data.overdueFeeStr;
            this.dueDate = data.dueTimeStr;
            this.paidAmount = data.repaymentAmountStr;
            this.bank = data.bankName;
            this.cardNo = data.withdrawCardNo.slice(-4);
            this.loopLoanUuid = data.loopLoanUuid;
            if (this.unpaidAmount < 200) this.repaymentAmount = this.unpaidAmount;
        })
    }

    submitRepayment = () => {
        return this.Post('/api/looploan/repayment/v1/checkSmsVerifyCode.json', {
            loopLoanUuid: this.loopLoanUuid,
            repaymentAmt: this.repaymentAmount
        }).then(data => {
            this.setRepaymentId(data.repaymentUuid);
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
                history.push(`/repayment-youyi-result?id=${this.repaymentUuid}`)
            }, 1700)
        })
    }

    fetchRecords = pageNo => {
        return this.Post('/api/looploan/repayment/v1/repaymentRecordList.json', {
            loopLoanUuid: this.loopLoanUuid,
            page: pageNo,
            pageSize: 10
        }).then(data => {
            this.records.push(...data.resultList);
            let moreToLoad = data.totalPage > pageNo;
            return moreToLoad
        })
    }

    fetchRepaymentResult = () => {
        this.Post('/api/looploan/repayment/v1/repaymentStatus.json', {
            repaymentUuid: this.repaymentUuid
        }).then(data => {
            let { loanLeftAmountStr, repaymentAmountStr, status } = data;
            this.leftAmount = loanLeftAmountStr;
            this.repaymentAmount = repaymentAmountStr;
            if (status == 0) {
                this.repaymentResult = 'waiting'
            } else if (status == 1) {
                this.repaymentResult = 'success'
            } else if (status == 2) {
                this.repaymentResult = 'fail'
            }
        }, e => {
            this.errMessage = e.message;
        })
    }

}
