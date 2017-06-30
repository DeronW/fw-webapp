import { extendObservable, computed } from 'mobx'
import { Components } from 'fw-javascripts'
import { Storage } from '../../lib/helpers'
import * as $FW from 'fw-javascripts'

export default class Redbag {
    constructor(Post) {
        this.Post = Post

        extendObservable(this, {
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
        }).then(() => {
            // 用户是否可提现状态
            return this.Post('/api/loan/v1/baseinfo.json', { productId: 1 })
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
            withdrawAmt: this.withdrawAmt,
            withdrawCardUuid: uuid
        }).then(data => {
            this.applyTimeStr = data.applyTimeStr;
            this.preAccountTimeStr = data.preAccountTimeStr;
        }, e => {
            this.failReason = e.message
            return new Promise(s => s())
        })
    }
    // 明细页下拉加载更多
    loadMore = (done) => {
        if (!this.records.hasData) return done && done();
        // let user = $FW.Store.getUserDict();

        return this.Post(`/api/redbag/v1/list.json`, {
            pageSize: 20,
            pageIndex: this.records.page
        }).then(data => {
            let RedPacketDetailList = data.resultList;
            this.records.rows = RedPacketDetailList;
            this.records.page = this.records.page < data.totalPage ? this.records.page + 1 : this.records.page = 0;
            this.records.hasData = !!RedPacketDetailList.length;
            done && done()
        })
    }

}

