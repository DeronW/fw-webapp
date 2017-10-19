import {
    extendObservable,
    computed
} from 'mobx'
import {
    Components,
    Utils
} from 'fw-javascripts'
import {
    NativeBridge, Browser, Storage
} from '../../lib/helpers'
export default class Fq {
    constructor(Post) {

        this.Post = Post

        this.put_in_data = {}

        this.product_data = {}

        extendObservable(this.put_in_data, {
            idCard: '',
            realName: '',
            address: '',
            balance: '',
            city: '',
            creditCard: '',
            emContact: '',
            emMobile: '',
            emRelationship: '',
            email: '',
            homeSituation: '',
            income: '',
            term: '',
            workExperience: ''
        })

        extendObservable(this.product_data, {
            product: null,
            borrowStatus: null,
            canStatus: null,
            canMessage: null,
            loanUuid: null,
            failMsg: null,
            pid: 21,
            productLogo: null,
            productName: null,
            amountStr: null,
            monthRateStr: null,
            termRangeStr: null,
            fastLoanValue: null,
            productLabelList: [],
            loanRateStr: null,
            serviceRateStr: null,
            commRateStr: null
        })
    }


    get_base_info = () => {
        return this.Post(`/api/product/v1/productDetail.json`, {
                productId: this.product_data.pid
            })
            .then(data => {
                this.product_data.productLogo = data.productLogo;
                this.product_data.productName = data.productName;
                this.product_data.amountStr = data.amountStr;
                this.product_data.monthRateStr = data.monthRateStr;
                this.product_data.termRangeStr = data.termRangeStr;
                this.product_data.fastLoanValue = data.fastLoanValue;
                this.product_data.productLabelList = data.productLabelList;
                this.product_data.loanRateStr = data.loanRateStr;
                this.product_data.serviceRateStr = data.serviceRateStr;
                this.product_data.commRateStr = data.commRateStr;
            }).then(() => {
                return this.Post(`/api/loan/v1/baseinfo.json`, {
                    productId: this.product_data.pid
                })
            }).then(data => {
                this.borrowStatus = data.borrowStatus
            }).then(() => {
                return this.Post(`/api/loan/v1/dmStatus.json`)
            }).then(data => {
                this.product_data.canStatus = data.canStatus;
                this.product_data.canMessage = data.canMessage;
                this.product_data.loanUuid = data.loanUuid;
            }, e => {
                this.product_data.failMsg = e.message;
                this.product_data.errCode = e.code
            })
    }


    @computed get allFieldsFilled() {
        // return this.put_in_data.idCard && this.put_in_data.realName && this.put_in_data.address && this.put_in_data.balance && this.put_in_data.city && this.put_in_data.creditCard && this.put_in_data.emContact && this.put_in_data.emMobile && this.put_in_data.emRelationship && this.put_in_data.email && this.put_in_data.homeSituation &&
        //     this.put_in_data.income && this.put_in_data.term && this.put_in_data.workExperience

        return Object.keys(this.put_in_data).every(k => !!this.put_in_data[k])
    }

    _set_field = (k, v) => {
        this.put_in_data[k] = v;
    }

    // setFormData = (data) => {
    //     for (let i in data) {
    //         if (!data[i]) continue
    //         this._set_field(i, data[i]);
    //     }
    // }

    setCurrentPanel = (history, p) => {
        history.push(`/loan-fq-form#${p}`);
    }

    setPanelData = (history, field, v) => {
        history.goBack();
        this._set_field(field, v);
    }

    setFormData = (form, data) => {

        // let tmp_dict = {}

        for (let k in data) {
            if (this[form].hasOwnProperty(k)) {
                // tmp_dict[k] = data[k]
                this[form][k] = data[k]
            }
        }

        // this[form] = tmp_dict

        console.log(this[form])
    }

    fetchPutInData = () => {
        this.Post('/api/userBase/v1/userInfoItem.json')
            .then(data => {
                this.setFormData('put_in_data', data)
            });
    }

    submit = (history) => {
        if (!this.allFieldsFilled) return Components.showToast('请填写全部内容')

        this.Post('/api/loan/v1/applyDmLoan.json', {
            idCard: this.put_in_data.idCard,
            realName: this.put_in_data.realName,
            address: this.put_in_data.address,
            balance: this.put_in_data.balance,
            city: this.put_in_data.city,
            creditCard: this.put_in_data.creditCard,
            emContact: this.put_in_data.emContact,
            emMobile: this.put_in_data.emMobile,
            emRelationship: this.put_in_data.emRelationship,
            email: this.put_in_data.email,
            homeSituation: this.put_in_data.homeSituation,
            income: this.put_in_data.income,
            term: parseInt(this.put_in_data.term),
            workExperience: this.put_in_data.workExperience,
            productId:21
        }).then(()=>{
            let u = Storage.getUserDict();
            let ua = window.navigator.userAgent;
            let inWX = ua.indexOf('MicroMessenger') > -1;
            let inFXHApp = ua.indexOf('Easyloan888') > -1;
            let SOURCE_TYPE = inFXHApp ? 3 : inWX ? 4 : 3;
            let params = `loanUuid=${this.product_data.loanUuid}&uid=${u.uid}&sourceType=${SOURCE_TYPE}&token=${u.token}`;
            Browser.inFXHApp ? NativeBridge.goto(`https://m.easyloan888.com/api/order/v1/jump.shtml?${params}`,false,"分期"):location.href = `/api/order/v1/jump.shtml?${params}`
        })
    }









}