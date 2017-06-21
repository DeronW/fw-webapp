import { extendObservable, computed } from 'mobx'

export default class PolicyDetail {

    constructor(Get) {
        this.Get = Get

        extendObservable(this, {
            selectedFirm: '1', // 0:平安、1:太平洋、2:人保
            alipayURL: '', // 支付宝支付链接
            payStatus: '', // 支付状态， 未支付 成功 失败等等
        })
    }

    selectFirm = (history, selected) => {
        // this.Get('/blabla', { selectFirm: this.selected })
        //     then(data => {
        //         this.selectFirm = selected;
                history.push('/customer')
            // })
    }

    toPay = () => {
        console.log('user wants to pay!');
    }

}
