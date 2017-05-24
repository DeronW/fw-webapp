import { observable, computed, extendObservable } from 'mobx'

// class BillItem {
//     constructor(itemInfo)
// }

export default class Bills {

    constructor(request) {
        this.request = request;
    }

    @observable billList = {
        'applying': { typeNo: '1', typeName: '申请中', list: [], pageNo: 1 },
        'repayable': { typeNo: '2', typeName: '还款中', list: [], pageNo: 1 },
        'rejected': { typeNo: '3', typeName: '未通过', list: [], pageNo: 1 },
        'fulfilled': { typeNo: '4', typeName: '已还款', list: [], pageNo: 1 }
    }

    fetchBillItems = (type, pageSize) => done => {
        if (this.billList[type].pageNo === 0) return done && done();

        let API_PATH = document.getElementById('api-path').value;
        return this.request({
            url: `${API_PATH}/api/order/v1/orderList.json`,
            method: 'post',
            data: {
                pageSize: pageSize || 10,
                pageIndex: this.billList[type].pageNo,
                loanStatus: this.billList[type].typeNo
            }
        }).then(data => {
            this.billList[type].list.push(...data.resultList)
            this.billList[type].pageNo < data.totalPage ?
                this.billList[type].pageNo++ :
                this.billList[type].pageNo = 0;

            done && done();
        })
    }

}
