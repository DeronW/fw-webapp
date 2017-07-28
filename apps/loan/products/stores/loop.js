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
            url:''
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
            this.productDesc = data.productDesc;
            this.productUuid = data.productUuid;
            this.userStatus = data.userStatus;
        }).then(()=>{
            return this.Post('/api/zhima/v1/credit/auth.json');
        }).then((data)=>{
            this.url = data.url
        });
    }




}
