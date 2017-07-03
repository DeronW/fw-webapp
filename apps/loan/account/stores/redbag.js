import {extendObservable, computed} from 'mobx'
import { Components } from 'fw-javascripts'

export default class Redbag {
    constructor(Post) {
        this.Post = Post

        extendObservable(this, {
            minWithdrawAmt: '',
            instruction: '',
            batchGid: '',
            freezeAmt: '',
            hasWithdrawAmt: '',
            cardList: [],
            borrowBtnStatus: '',
            applyTimeStr: '',
            preAccountTimeStr: '',
            failReason: '',
            records: {
                page: 1,
                rows: [],
                hasData: true
            }
        })
    }

    @computed get default_card() {
        let filtered = this.cardList.filter(e => e.isRealNameBindCard === true),
            card = filtered[0];

        return card && {
                uuid: card.uuid,
                text: `${card.bankShortName}(尾号${card.cardNo.slice(-4)})`
            }
    }

    fetch_user_redbag = () => {
        this.Post('/api/redbag/v1/summary.json').then(data => {
            // 红包数量
            this.batchGid = data.batchGid;
            this.freezeAmt = data.freezeAmt;
            this.hasWithdrawAmt = data.hasWithdrawAmt;
            this.minWithdrawAmt = data.minWithdrawAmt;
            this.instruction = data.instruction;
        }).then(() => {
            // 用户是否可提现状态
            return this.Post('/api/loan/v1/baseinfo.json', {productId: 1})
        }).then(data => {
            this.borrowBtnStatus = data.borrowBtnStatus
            // return new Promise(resolve => resolve())
        }).then(() => {
            // 提现银行卡号
            return this.Post('/api/bankcard/v1/bankcardlist.json')
        }).then(data => {
            this.cardList = data.userBankList.withdrawBankcard;
        })
    }

    getSMSCode = () => {
        return this.Post('/api/redbag/v1/veriftycode.json', {
            batchGid: this.batchGid
        })
    }

    withdrawConfirm = (value, uuid) => {
        return this.Post('/api/redbag/v1/apply.json', {
            batchGid: this.batchGid,
            verifyCode: value,
            withdrawAmt: this.hasWithdrawAmt,
            withdrawCardUuid: uuid
        }).then(data => {
            this.applyTimeStr = data.applyTimeStr;
            this.preAccountTimeStr = data.preAccountTimeStr;
        }, e => {
            if(e.code == 26001){
                Components.showToast(e.message)
            }else if(e.code == 26011){
                Components.showToast(e.message)
            }else{
                this.failReason = e.message
                return new Promise(resolve => resolve())
            }
        })
    }
    // 明细页下拉加载更多
    loadMoreRecords = (done, reset) => {
        let {records} = this

        if (reset) {
            records.rows = []
            records.hasData = true
            records.page = 1
        }

        if (!records.hasData) return;

        return this.Post(`/api/redbag/v1/list.json`, {
            pageSize: 20,
            pageIndex: records.page
        }).then(data => {
            records.rows = records.rows.concat(data.resultList)
            records.page += 1
            records.hasData = data.totalPage > records.page
            done && done()
        })
    }

}

