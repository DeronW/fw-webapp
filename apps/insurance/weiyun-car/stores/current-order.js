import { extendObservable, computed } from 'mobx'

export default class PolicyDetail {

    constructor(Get) {
        this.Get = Get

        extendObservable(this, {
            selectedFirm: '0', // 0:平安、1:太平洋、2:人保
            alipayURL: '', // 支付宝支付链接
            payStatus: '', // 支付状态， 未支付 成功 失败等等
        })
    }

    selectFirm = selected => {
        this.selectedFirm = this.selectedFirm == selected ? '' : selected;
    }

    submitSelectedFirm = (history) => {
        // this.Get('/blabla', { selectFirm: this.selectedFirm })
        //     then(data => {
                history.push('/customer')
            // })
    }

    toPay = () => {
        console.log('user wants to pay!');
    }

}
