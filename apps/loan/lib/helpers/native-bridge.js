import { NativeBridgeFactory } from 'fw-javascripts'

// let ua = navigator.userAgent, stamp,
//     JRGC = 'FinancialWorkshop', FXH = 'EasyLoan888'

// stamp = ua.indexOf(JRGC) > -1 ? JRGC : ua.indexOf(FXH) > -1 ? FXH : null;

const NativeBridge = new NativeBridgeFactory()

NativeBridge.close = function () {
    NativeBridge.trigger('close')
}

NativeBridge.setTitle = function (title) {
    NativeBridge.trigger('set_title', title)
}

NativeBridge.login = function(){
    NativeBridge.trigger('login', '', true)
}

export default NativeBridge

