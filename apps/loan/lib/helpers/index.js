
import StorageFactory from './storage-factory.js'
import PostMethodFactory from './post-method-factory.js'
import Browser from './browser.js'
import ThemeFactory from './theme-factory.js'
import NativeBridge from './native-bridge.js'
import StoreSpy from './store-spy.js'

let Storage = new StorageFactory(Browser)
let Post = PostMethodFactory(Storage, Browser, NativeBridge)
let Theme = new ThemeFactory(Storage, Browser)


function mobxStoreExtend(store) {

    function extend() {
        const KEY = `${location.pathname}:${store.name}`

        // read data from Storage, and merge into this.data
        if (!this.data) this.data = {}
        Object.assign(this.data, Storage.getStoreData(KEY))

        // 增加保存方法
        this._cacheData = () => Storage.setStoreData(KEY, this.data)
    }

    return new Proxy(store, {
        construct: function (target, args, newTarget) {
            let obj = new target(...args)
            extend.call(obj)
            console.log(obj)
            return obj
        }
    })
}


export {
    Post,
    Storage,
    NativeBridge,
    Browser,
    Theme,
    StoreSpy,
    mobxStoreExtend
}