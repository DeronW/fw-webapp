import { extendObservable } from 'mobx'
import { Utils } from 'fw-javascripts'

export default class RepaymentFangXin {
    constructor(Post) {
        this.Post = Post;
        extendObservable(this, {
            logo: '',//logo url
            loanLeftAmount: 0,//待还金额
            overdueFee: 0,//逾期费
            dueTime: '',//还款日期
            repaymentAmount: 0,//已还金额
            withdrawBankShortName: '',//提现银行卡
            withdrawCardNo: null,//银行卡号
            inputAmount:""
        })
    }

    repaymentHandler = () => {
        this.Post('/api/repayment/v1/loandetail.json', {
            loanGid: Utils.urlQuery.loanGid,
            userGid: Utils.urlQuery.userGid,
            userId: Utils.urlQuery.userId
        }).then(data => {
            console.log(data);
            this.logo = data.productLogo;
            this.loanLeftAmount = data.loanLeftAmount;
            this.overdueFee = data.overdueFee || 0;
            this.dueTime = new Date(data.dueTime).toLocaleDateString();
            this.repaymentAmount = data.repaymentAmount;
            this.withdrawBankShortName = data.withdrawBankShortName;
            this.withdrawCardNo = data.withdrawCardNo.slice(-4);
        })
    }

    setLoanAmount = (value) => {
        this.inputAmount = value
    }
}