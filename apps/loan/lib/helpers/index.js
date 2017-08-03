
import StorageFactory from './storage-factory.js'
import PostMethodFactory from './post-method-factory.js'
import Browser from './browser.js'
import ThemeFactory from './theme-factory.js'
import NativeBridge from './native-bridge.js'
import StoreSpy from './store-spy.js'

let Storage = new StorageFactory(Browser)
let Post = PostMethodFactory(Storage, Browser, NativeBridge)
let Theme = new ThemeFactory(Storage, Browser)


function mobxStoreExtend(sup, base) {
    let descriptor = Object.getOwnPropertyDescriptor(base.prototype, "constructor")
    base.prototype = Object.create(sup.prototype)

    let handler = {
        construct: function (target, args) {
            let obj = Object.create(base.prototype)
            this.apply(target, obj, args)
            obj._setStoreData = Storage.setStoreData
            obj._getStoreData = Storage.getStoreData
            return obj
        },
        apply: function (target, that, args) {
            sup.apply(that, args)
            base.apply(that, args)
        },
        get: function (target, name) {
            if (name in target) return target[name]

            const KEY = location.pathname

            if (name == 'setStoreData') {
                this._setStoreData(KEY, this.data)
            }

            if (name == 'getStoreData') {
                this.data = this._getStoreData(KEY)
            }
        }
    }

    let proxy = new Proxy(base, handler)
    descriptor.value = proxy
    Object.defineProperty(base.prototype, "constructor", descriptor)
    return proxy
}


export {
    Post,
    Storage,
    NativeBridge,
    Browser,
    Theme,
    StoreSpy
}