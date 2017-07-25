import {extendObservable, computed} from 'mobx'
import * as $FW from 'fw-components'
import {Components, Utils,Event} from 'fw-javascripts'
import  NativeBridge  from '../helpers/native-bridge.js'

export default class Details {
    constructor(Post) {
        this.Post = Post
        extendObservable(this, {
            context: {
                avgLoanPeriod: '',//平均起息时间
                bookValidPeriod: null,//预约有效期
                id: null,//预约标id
                loadRate: '',//利率
                minAmt: '',//最小预约额
                repayPeriod: '',//期限
            },
            records: [],
            pageData: {
                pageNo: 1,
                pageSize: 3,
                totalCount: 20
            },
            accountAmount: 88888,//可用余额
            isRisk: 0,//是不是进行风险评估：0-为评估 1-已评估
            batchMaxmum: 0,//批量投资限额
            reserveMoney: '',//用户输入的预约金额
            isChecked: true
        })
    }

    getDataHandler = () => {
        this.Post('/api/invest/v1/entryReserve.json', {applyInvestClaimId: Utils.hashQuery.applyInvestClaimId})
            .then(data => {
                this.context = data.appointClaim;
                this.accountAmount = data.accountAmount;
                this.isRisk = data.isRisk;
                this.batchMaxmum = data.batchMaxmum
                this.minAmt = data.appointClaim.minAmt
                this.avgLoanPeriod = data.appointClaim.avgLoanPeriod
            })
    }
    getReserveList = (done) => {
        if (this.pageData.pageNo === 0) return done && done()

        this.Post('/api/invest/v1/reserveList.json', {
            page: this.pageData.pageNo,
            pageSize: this.pageData.pageSize
        }).then(data => {
            this.pageData = data.pageData;
            this.records = data.result
            this.records.push(...data.result)
            this.records.pageNo < data.totalCount ?
                this.records.pageNo++ :
                this.records.pageNo = 0;
            done && done();
        })
    }
    reserveHandler = (history) => {
        if (this.isRisk === 0) return location.href = "https://m.9888.cn/static/wap/user-evaluate-p2p/index.html";
        if (this.batchMaxmum === 0) return location.href = "";//调到自动投资页面
        history.push(`/submit-reserve`)

    }

    submitRerveHandler = (history) => {
        if (this.reserveMoney == 0) {
            Components.showToast("预约金额不能为空")
        } else if (this.reserveMoney < 100) {
            Components.showToast("预约金额不足100")
        } else if (this.reserveMoney > this.accountAmount) {
            Components.showToast("可用金额不足，请充值后重试")
        } else {
            this.Post('/api/invest/v1/reserveApply.json', {
                applyAmt: this.reserveMoney,
                applyInvestClaimId: this.context.id
            }).then(() => {
                history.push(`/my-reserve`)
            })
        }
    }

    setFormData = (field, value) => {
        this[field] = value
    }
}