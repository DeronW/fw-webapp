import { extendObservable, computed } from 'mobx'

export default class PolicyDetail {

    constructor(request, state = {}) {
        this.request = request

        extendObservable(this, {
            selectedFirm: '2', // 0:平安、1:太平洋、2:人保
            temporaryPolicyId: '', // 试算id
            alipayURL: '', // 支付宝支付链接
            payStatus: '', // 支付状态， 未支付 成功 失败等等
        })
    }

    setPolicyId = (id) => {
        this.temporaryPolicyId = id;
    }

    toPay = () => {
        console.log('user wants to pay!');
    }

}