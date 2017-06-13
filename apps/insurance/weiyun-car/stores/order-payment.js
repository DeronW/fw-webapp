import { extendObservable, computed } from 'mobx'
import * as $FW from 'fw-javascripts'

export default class OrderPayment {
    constructor(request) {
        this.request = request;
        extendObservable(this, {
            money: 3500.00,
            checked: true
        })
    }
    submit = () => {
        //点击支付按钮进行支付
        // this.request('',{

        // }).then(data=>{

        // },e=>{
        //     $FW.Components.Toast(e.message)
        // })
        if (this.checked) {
            $FW.Components.showToast("暂没有支付接口")
        } else {
            $FW.Components.showToast("请勾选支付宝支付")
        }
    }
    setFormData = (filed, value) => {
        this[filed] = value
    }
}