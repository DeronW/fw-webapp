import $FW from '../../../es7-lib/'
import { DOMReady, Utils } from '../../../es7-lib/'

window.$FW = $FW
window.Utils = Utils
console.log($FW)
console.log(Utils)

DOMReady(()=> {
    console.log('DOMReady')
})
