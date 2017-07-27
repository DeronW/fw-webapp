import { extendObservable, computed } from 'mobx'

export default class Orders {

    constructor(Get) {
        this.Get = Get;
        extendObservable(this, {
            current_type: 'all', // all, paid, unpaid, completed
            all_list: [{
                orderNum: 123,
                insuranceAmount: 3400,
                carNum: '京A12345',
                orderState: '1',
            }, {
                orderNum: 1234,
                insuranceAmount: 3400,
                carNum: '京A12345',
                orderState: '0',
            }],
            paid_list: [],
            unpaid_list: [],
            completed_list: [],
        })
    }

    @computed get current_list() {
        return this[`${this.current_type}_list`]
    }

    @computed get current_type_no() {
        return ['unpaid', 'paid', 'completed', 'all'].indexOf(this.current_type)
    }

    get_type_name = (type_no) => ['待付款', '支付超时', '已支付', '退款完成', '已完成'][type_no]

    switch_type = (type) => {
        this.current_type = type
    }

    fetch_orders = () => {
        this.Get('/carInsurance/getOrderList.shtml', {
            orderState: this.current_type_no
        }).then(data => {
            this[`${this.current_type}_list`].push(data.orderInfo)
        })
    }

}
