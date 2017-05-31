import { observable, computed, extendObservable } from 'mobx'

export default class Bills {

    constructor(authPost) {
        this.authPost = authPost;
    }

    @observable billList = {
        'applying': { typeNo: '1', typeName: '申请中', list: [], pageNo: 1 },
        'repayable': { typeNo: '2', typeName: '还款中', list: [], pageNo: 1 },
        'rejected': { typeNo: '3', typeName: '未通过', list: [], pageNo: 1 },
        'fulfilled': { typeNo: '4', typeName: '已还款', list: [], pageNo: 1 }
    }

    fetchBillItems = (type, pageSize) => done => {
        if (this.billList[type].pageNo === 0) return done && done();

        return this.authPost(`/api/order/v1/orderList.json`, {
                pageSize: pageSize || 10,
                pageIndex: this.billList[type].pageNo,
                loanStatus: this.billList[type].typeNo
            }).then(data => {
                this.billList[type].list.push(...data.resultList)
                this.billList[type].pageNo < data.totalPage ?
                    this.billList[type].pageNo++ :
                    this.billList[type].pageNo = 0;

                done && done();
            })
    }

}
