import { NativeBridgeFactory } from 'fw-javascripts'

const NativeBridge = new NativeBridgeFactory('FinancialWorkshop')

NativeBridge.close = function () {
    this.action('close')
}

NativeBridge.setTitle = function (title) {
    this.action('set_title', title)
}

export default NativeBridge

