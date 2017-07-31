import { extendObservable, computed } from 'mobx'
import { Components } from 'fw-javascripts'

export default class LoopLoan {
    constructor(Post) {
        this.Post = Post

        extendObservable(this, {
            canBorrowAmt:'',
            creditLine:'',
            minLoanAmt:'',
            period:'',
            productDesc:'',
            productUuid:'',
            userStatus:'',
            url:'',
            cardList:[],
            zmScore:'',
            authFail:false,
            accountInAmount:'',
            shouldRepaymentAmount:'',
            totalFeeAmount:'',
            loanUuid:'',
            feeAmoutExts:[]
        })
    }

    get_baseinfo = () => {
        this.Post('/api/looploan/loan/v1/baseinfo.json',{
            productUuid:11
        }).then((data)=>{
            this.canBorrowAmt = data.canBorrowAmt;
            this.creditLine = data.creditLine;
            this.minLoanAmt = data.minLoanAmt;
            this.period = data.period;
            this.productDesc = data.productDes;
            this.productUuid = data.productUuid;
            this.userStatus = data.userStatus;
        }).then(()=>{
            return this.Post('/api/zhima/v1/credit/auth.json');
        }).then((data)=>{
            this.url = data.url
        });
    }

    // @computed get loopLoan_card() {
    //     let filtered = this.cardList.filter(e => e.authPlatform == 2)
    //     return filtered;
    // }

    get_cardlist = () => {
        this.Post('/api/bankcard/v1/bankcardlist.json').then((data)=>{
            this.cardList = data.userBankList.withdrawBankcard;
        })
    }

    submit_bankinfo = (bankCardUuid) => {
        this.Post('/api/looploan/bankcard/v1/commitInfo.json',{
            bankCardUuid:bankCardUuid
        }).then(()=>{
            Components.showToast("绑卡成功")
        },()=>{
            Components.showToast("绑卡失败")
        });
    }

    zima_callback = (params,sign) => {
        this.Post('/api/zhima/v1/credit/callback.json',{
            params:params,
            sign:sign
        }).then((data)=>{
            this.zmScore = data.zmScore;
        },()=>{
            this.authFail = true
        });
    }

   loan_calculate = (value) => {
        this.Post('/api/looploan/loan/v1/tryLoanBudget.json',{
            loanAmt:value,
            productUuid:this.productUuid
        }).then((data)=>{
            this.accountInAmount = data.accountInAmount;
            this.shouldRepaymentAmount = data.shouldRepaymentAmount;
            this.totalFeeAmount = this.totalFeeAmount;
            this.feeAmoutExts = data.feeAmoutExts;
        });
   }

   loan_confirm = (value) => {
        this.Post('/api/looploan/loan/v1/apply.json',{
            loanAmt:value,
            productUuid:this.productUuid
        }).then((data)=>{
            this.loanUuid = data.loanUuid
        })
   }



}
