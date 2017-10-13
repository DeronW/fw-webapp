import { extendObservable, computed } from 'mobx'
import { Components, Utils } from 'fw-javascripts'
import { Storage } from '../../lib/helpers'
export default class Fq {
    constructor(Post) {
        this.Post = Post
        extendObservable(this, {
            product:null,
            borrowStatus:null,
            canStatus:null,
            canMessage:null,
            loanUuid:null,
            failMsg:null,
            pid:21,
            productLogo:null,
            productName:null,
            amountStr:null,
            monthRateStr:null,
            termRangeStr:null,
            fastLoanValue:null,
            productLabelList:[],
            loanRateStr:null,
            serviceRateStr:null,
            commRateStr:null,
            idCard: '',
            realName: '',
            address:'',
            balance:'',
            city:'',
            creditCard:'',
            emContact:'',
            emMobile:'',
            emRelationship:'',
            email:'',
            homeSituation:'',
            income:'',
            term:'',
            workExperience:''
        })

    }


    get_base_info = () => {
        return this.Post(`/api/product/v1/productDetail.json`,{productId:this.pid})
        .then(data=>{
            this.productLogo = data.productLogo;
            this.productName = data.productName;
            this.amountStr = data.amountStr;
            this.monthRateStr = data.monthRateStr;
            this.termRangeStr = data.termRangeStr;
            this.fastLoanValue = data.fastLoanValue;
            this.productLabelList = data.productLabelList;
            this.loanRateStr = data.loanRateStr;
            this.serviceRateStr = data.serviceRateStr;
            this.commRateStr = data.commRateStr;
        }).then(()=>{
            return this.Post(`/api/loan/v1/baseinfo.json`,{productId:this.pid})
        }).then(data=>{
            this.borrowStatus = data.borrowStatus
        }).then(()=>{
            return this.Post(`/api/loan/v1/dmStatus.json`)
        }).then(data=>{
            this.canStatus = data.canStatus;
            this.canMessage = data.canMessage;
            this.loanUuid = data.loanUuid;
        },e => {
            this.failMsg = e.message;
            this.errCode = e.code
        })
    }


    @computed get hasRealName() {
        return this.realName !== ''
    }
    
    @computed get allFieldsFilled() {
        return this.idCard && this.realName && this.address && this.balance && this.city && this.creditCard && this.emContact && this.emMobile && this.emRelationship && this.email && this.homeSituation && this.income && this.term && this.workExperience
    }

    _set_field = (k, v) => {
        this[k] = v;
    }

    setFormData = (data) => {
        for (let i in data) {
            if (!data[i]) return
            this._set_field(i, data[i]);
        }
    }

    setCurrentPanel = (history, p) => {
        history.push(`/loan-fq-form#${p}`);
    }

    setPanelData = (history, field, v) => {
        history.goBack();
        this._set_field(field, v);
    }

    fetchBasicInfo = () => {
        this.Post('/api/userBase/v1/userInfoItem.json')
            .then(data => this.setFormData(data));
    }

    submit = (history) => {
        if (!this.allFieldsFilled) return Components.showToast('请填写全部内容')

        this.Post('/api/loan/v1/applyDmLoan.json', {
            idCard: this.idCard,
            realName: this.realName,
            address:this.address,
            balance:this.balance,
            city:this.city,
            creditCard:this.creditCard,
            emContact:this.emContact,
            emMobile:this.emMobile,
            emRelationship:this.emRelationship,
            email:this.email,
            homeSituation:this.homeSituation,
            income:this.income,
            term:this.term,
            workExperience:this.workExperience
        }).then()
    }









}

