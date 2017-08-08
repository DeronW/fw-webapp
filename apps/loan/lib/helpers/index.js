
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
        this._saveData = () => Storage.setStoreData(KEY, this.data)
    }

    return new Proxy(store, {
        construct: function (target, args, newTarget) {
            let obj = new target(...args)
            extend.call(obj)
            console.log(obj)
            return obj
        },
        get: function (target, name) {
            if (name in target) return target[name]

            const KEY = location.pathname

            // 只需要有一个 存入数据方法, 不需要读取方法
            if (name == 'setStoreData')
                this._setStoreData(KEY, this.data)
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