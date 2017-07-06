import { extendObservable, computed } from 'mobx'

export default class PolicyDetail {

    constructor(Get) {
        this.Get = Get

        extendObservable(this, {
            selectedFirm: '', // 0:平安、1:太平洋、2:人保
            alipayURL: '', // 支付宝支付链接
            orderId: '',
            orderNo: '',
            orderStatus: ''// 支付状态， 未支付 成功 失败等等
        })
    }

    selectFirm = (selected, hasDetail) => {
        if (!hasDetail) return
        this.selectedFirm = this.selectedFirm == selected ? '' : selected;
    }

    submitSelectedFirm = async (history) => {
        let temporaryPolicyId = await this.Get('/carInsurance/getTempPolicyIdForUser.shtml')
            .then(data => data.temporaryPolicyId)
        this.Get('/carInsurance/submitDisposition.shtml', {
            code: this.selectedFirm,
            temporaryPolicyId: temporaryPolicyId
        }).then(data => history.push('/customer'))
    }

    submitOrder = async (history) => {
        let temporaryPolicyId = await this.Get('/carInsurance/getTempPolicyIdForUser.shtml')
            .then(data => data.temporaryPolicyId)
        this.Get('/carInsurance/submitOrder.shtml', {
            temporaryPolicyId: temporaryPolicyId
        }).then(({ order, payUrl }) => {
            this.alipayURL = payUrl;
            this.orderId = order.orderId;
            this.orderNo = order.orderNo;
            this.orderStatus = order.status;
            history.push('/order-payment')
        })
    }

    toPay = (history) => {
        window.location = this.alipayURL
    }

}
