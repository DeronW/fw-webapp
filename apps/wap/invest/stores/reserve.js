import {extendObservable, computed} from 'mobx'
import {Components, Utils, Event} from 'fw-javascripts'

export default class Reserve {
    constructor(Post) {
        this.Post = Post

        this.data = {}

        extendObservable(this.data, {})

        extendObservable(this, {
            context: {
                avgLoanPeriod: '',//平均起息时间
                bookValidPeriod: null,//预约有效期
                id: null,//预约标id
                loadRate: '',//利率
                minAmt: '',//最小预约额
                repayPeriod: '',//期限
            },
            records: [],//记录的列表
            records_page_no: 1,
            accountAmount: null,//可用余额
            isRisk: 0,//是不是进行风险评估：0-为评估 1-已评估
            batchMaxmum: 0,//批量投资限额
            reserveMoney: '',//用户输入的预约金额
            isChecked: true,
            applyInvestClaimId: '',
            contractMsg: ''
        })
    }

    getApplyInvestClaimId = () => {
        let id = Utils.hashQuery.applyInvestClaimId
        if (id) this.applyInvestClaimId = id
        return this.applyInvestClaimId
    }

    fetchProduct = () => {
        return this.Post('/api/v1/intoAppointPage.shtml', {
            applyInvestClaimId: this.getApplyInvestClaimId()
        }).then(data => {
            this.context = data.appointClaim;
            this.accountAmount = data.accountAmount;
            this.isRisk = data.isRisk;
            this.batchMaxmum = data.batchMaxmum
            this.minAmt = data.appointClaim.minAmt
            this.avgLoanPeriod = data.appointClaim.avgLoanPeriod
            return {
                isRisk: this.isRisk,
                batchMaxmum: this.batchMaxmum
            }
        })
    }

    getReserveList = (done, reset) => {
        if (reset) {
            this.records_page_no = 1
            this.records = []
        }
        if (this.records_page_no === 0) return done && done();

        const PAGE_SIZE = 10

        this.Post('/api/v1/appointRecordList.shtml', {
            page: this.records_page_no,
            pageSize: PAGE_SIZE
        }).then(data => {
            this.records.push(...data.pageData.result)
            this.records_page_no++

            if (this.records.length >= data.pageData.pagination.totalCount)
                this.records_page_no = 0

            done && done();
        })
    }

    submitReserveHandler = () => {
        return this.Post('/api/v1/intoAppointPage.shtml', {
            applyInvestClaimId: this.getApplyInvestClaimId()
        }).then((data)=> {
            return this.Post('/api/v1/investAppoint.shtml', {
                applyAmt: this.reserveMoney,
                applyInvestClaimId: this.context.id,
                bookInvestToken: data.bookInvestToken
            })
        })
    }

    cancelHandler = (id) => {
        return this.Post('/api/v1/cancelAppoint.shtml', {
            applyId: id
        })
    }

    getContractHandler = () => {
        return this.Post('/api/v1/appointContractMess.shtml').then(data => {
            this.contractMsg = data.contractMsg
            return {
                contractMsg: this.contractMsg
            }
        })
    }

    setFormData = (field, value) => {
        this[field] = value
    }
}