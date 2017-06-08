import { NativeBridgeFactory } from 'fw-javascripts'

const NativeBridge = new NativeBridgeFactory('FinancialWorkshop')


NativeBridge.extendAction('close', function () {
    this.action('close')
})

export default NativeBridge

