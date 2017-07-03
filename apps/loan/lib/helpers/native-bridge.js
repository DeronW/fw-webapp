import { NativeBridgeFactory } from 'fw-javascripts'
import Browser from './browser.js'

let NativeBridge;

Browser.inApp ?
    NativeBridge = new NativeBridgeFactory() :
    NativeBridge = { trigger: () => null }

NativeBridge.close = function () {
    NativeBridge.trigger('close')
}

NativeBridge.setTitle = function (title) {
    NativeBridge.trigger('set_title', title)
}

NativeBridge.login = function () {
    NativeBridge.trigger('login', '', true)
}

export default NativeBridge

