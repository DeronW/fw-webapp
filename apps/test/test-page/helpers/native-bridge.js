import { NativeBridgeFactory } from 'fw-javascripts'

const NativeBridge = new NativeBridgeFactory('FinancialWorkshop')

NativeBridge.close = function () {
    this.trigger('close')
}.bind(NativeBridge)

NativeBridge.setTitle = function (title) {
    this.trigger('set_title', title)
}.bind(NativeBridge)

export default NativeBridge

