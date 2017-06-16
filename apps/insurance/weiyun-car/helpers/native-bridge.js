import { NativeBridgeFactory } from 'fw-javascripts'

const NativeBridge = new NativeBridgeFactory('FinancialWorkshop')

NativeBridge.close = function () {
    NativeBridge.trigger('close')
}

NativeBridge.setTitle = function (title) {
    NativeBridge.trigger('set_title', title)
}

NativeBridge.goto = function (link, need_login) {
    NativeBridge.trigger('goto', link, need_login)
}

export default NativeBridge

