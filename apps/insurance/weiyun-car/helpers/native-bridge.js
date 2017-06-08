import { NativeBridgeFactory } from 'fw-javascripts'

const NativeBridge = new NativeBridgeFactory('FinancialWorkshop')

NativeBridge.close = function () {
    this.action('close')
}.bind(NativeBridge)

NativeBridge.setTitle = function (title) {
    this.action('set_title', title)
}.bind(NativeBridge)

export default NativeBridge

