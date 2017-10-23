import { extendObservable, computed } from 'mobx'
import { Components } from 'fw-javascripts'
import { Storage } from '../../lib/helpers'


export default class LoopLoan {
    constructor(Post) {
        this.Post = Post

        extendObservable(this, {
            canBorrowAmt: '',
            creditLine: '',
            minLoanAmt: '',
            maxLoanAmt: '',
            period: '',
            productDesc: '',
            productUuid: '',
            userStatus: '',
            errMsg: '',
            errCode:'',
            url: '',
            cardList: [],
            zmScore: '',
            authFail: false,
            accountInAmount: '',
            shouldRepaymentAmount: '',
            totalFeeAmount: '',
            loanUuid: '',
            feeAmoutExts: [],
            bankName: '',
            bankCardNo: '',
            loanStatus: '',
            phone: '',
            applyErrCode:'',
            applyErrMsg:'',
            overdueFeeRateStr:''
        })

        this.init_data()
    }

    init_data = () => {
        let ud = Storage.getUserDict()
        this.phone = ud.phone
    }

    get_baseinfo = () => {
        return this.Post('/api/looploan/loan/v1/baseinfo.json', {
            productUuid: 11
        },{silence:true}).then((data) => {
            this.canBorrowAmt = data.canBorrowAmt;
            this.creditLine = data.creditLine;
            this.minLoanAmt = data.minLoanAmt;
            this.maxLoanAmt = data.maxLoanAmt;
            this.period = data.period;
            this.productDesc = data.productDes;
            this.productUuid = data.productUuid;
            this.userStatus = data.userStatus;
        });
    }

    get_authUrl = () => {
        return this.Post('/api/zhima/v1/credit/auth.json').then((data) => {
            this.url = data.url
        });
    }

    // @computed get loopLoan_card() {
    //     let filtered = this.cardList.filter(e => e.authPlatform == 2)
    //     return filtered;
    // }

    @computed get mask_phone() {
        return this.phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
    }


    get_cardlist = () => {
        this.Post('/api/bankcard/v1/bankcardlist.json').then((data) => {
            this.cardList = data.userBankList.withdrawBankcard;
        })
    }

    submit_bankinfo = (bankCardUuid) => {
        this.Post('/api/looploan/bankcard/v1/commitInfo.json', {
            bankCardUuid: bankCardUuid
        }).then(() => {
            Components.showToast("绑卡成功")
            setTimeout(() => {
                location.href = '/static/loan/products/index.html#/loan-youyi-index'
            }, 2000);
        }, () => {
            Components.showToast("绑卡失败")
            setTimeout(() => {
                location.href = '/static/loan/products/index.html#/loan-youyi-index'
            }, 2000);
        });
    }

    zima_callback = (params, sign) => {
        return this.Post('/api/zhima/v1/credit/callback.json', {
            params: params,
            sign: sign
        },'silence').then((data) => {
            this.zmScore = data.zmScore;
        });
    }

    loan_calculate = (value) => {
        if (value <= 0) return;
        this.Post('/api/looploan/loan/v1/tryLoanBudget.json', {
            loanAmt: value,
            productUuid: this.productUuid
        }).then(data => {
            this.accountInAmount = data.accountInAmount;
            this.shouldRepaymentAmount = data.shouldRepaymentAmount;
            this.totalFeeAmount = data.totalFeeAmount;
            this.feeAmoutExts = data.feeAmoutExts;
            this.overdueFeeRateStr = data.overdueFeeRateStr;
        });
    }

    loan_confirm = (value) => {
        return this.Post('/api/looploan/loan/v1/apply.json', {
            loanAmt: value,
            productUuid: this.productUuid
        },{silence:true}).then((data) => {
            this.loanUuid = data.loanUuid
        })
    }

    check_cardinfo = () => {
        this.Post('/api/looploan/bankcard/v1/cardInfo.json').then((data) => {
            this.bankName = data.bankName;
            this.bankCardNo = data.bankCardNo;
        })
    }

    regetSMSCode = () => {
        this.Post('/api/looploan/loan/v1/resendverifycode.json', {
            loanUuid: this.loanUuid
        }).then();
    }

    check_loanStatus = (value) => {
        return this.Post('/api/looploan/loan/v1/do.json', {
            loanUuid: this.loanUuid,
            verifycode: value
        }).then((data) => {
            this.loanStatus = data.loanStatus;
        });
    }

}
