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
        console.log("支付")
    }
}