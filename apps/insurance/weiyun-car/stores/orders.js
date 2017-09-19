import { extendObservable, computed } from 'mobx'

export default class Orders {

    constructor(Get) {
        this.Get = Get;
        extendObservable(this, {
            current_type: 'all', // all, paid, unpaid, completed
            all: {
                list: [],
                page_no: 1
            },
            paid: {
                list: [],
                page_no: 1
            },
            unpaid: {
                list: [],
                page_no: 1
            },
            completed: {
                list: [],
                page_no: 1
            }
        })
    }

    @computed get current_list() {
        return this[this.current_type].list
    }

    @computed get current_type_no() {
        return ['unpaid', 'paid', 'completed', 'all'].indexOf(this.current_type)
    }

    get_type_name = (type_no) => ['待付款', '支付超时', '已支付', '退款完成', '已完成'][type_no]

    switch_type = (type) => {
        this.current_type = type;
        if (!this[type].list.length) this.fetch_orders()
    }

    fetch_orders = (done) => {
        let typeData = this[this.current_type];
        if (!typeData.page_no) return

        this.Get('/carInsurance/getOrderList.shtml', {
            orderState: this.current_type_no,
            pageNo: typeData.page_no,
            pageSize: 7
        }).then(data => {
            let { pagination, result } = data.pageData;
            typeData.list.push(...result);
            if (pagination.totalPage == typeData.page_no) {
                typeData.page_no = 0;
            } else {
                typeData.page_no++;
            }
            done && done();
        })
    }

}
