import { extendObservable, computed } from 'mobx'
import { Components } from 'fw-javascripts'
import { Storage } from '../../lib/helpers'
import * as $FW from 'fw-javascripts'

export default class RedBag {
    constructor(Post) {
        this.Post = Post

        extendObservable(this, {
            batchGid: '',
            freezeAmt: '',
            hasWithdrawAmt: '',
            cardList: [],
            borrowBtnStatus: '',
            applyTimeStr:'',
            preAccountTimeStr:'',
            failReason:'',
            recoreds: {
                page: 1,
                rows: [],
                hasData: true
            }
        })
    }

    @computed get default_card_number() {
        let filtered = this.cardList.filter(e => e.isRealNameBindCard === true);
        return filtered[0] && {bankShortName:filtered[0].bankShortName, uuid: filtered[0].uuid, cardNo: filtered[0].cardNo}
    }

    fetch_packet_num = () => {
        return this.Post('/api/redbag/v1/summary.json').then(data => {
            this.batchGid = data.batchGid;
            this.freezeAmt = data.freezeAmt;
            this.hasWithdrawAmt = data.hasWithdrawAmt;
        })
    }

    fetch_user_status = () => {
        return this.Post('/api/loan/v1/baseinfo.json', { productId: 1 }).then(data => {
            this.borrowBtnStatus = data.borrowBtnStatus;
        })
    }

    fetch_bankcard_list = () => {
        return this.Post('/api/bankcard/v1/bankcardlist.json').then(data => {
            this.cardList = data.userBankList.withdrawBankcard;
        })
    }

    getSMSCode = () => {
        return this.Post('/api/redbag/v1/veriftycode.json', {
            batchGid: this.batchGid
        }).then(data => { })
    }

    withdrawConfirm = (value, uuid, history) => {
        return this.Post('/api/redbag/v1/apply.json', {
            batchGid: this.batchGid,
            verifyCode: value,
            withdrawAmt: this.withdrawAmt,
            withdrawCardUuid: uuid
        }).then(data=>{
            history.push('/red-bag-result');
            this.applyTimeStr = data.applyTimeStr;
            this.preAccountTimeStr = data.preAccountTimeStr;
        }, e => {
            history.push('/red-bag-result');
            this.failReason = e.message;
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

