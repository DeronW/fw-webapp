
import StorageFactory from './storage-factory.js'
import PostMethodFactory from './post-method-factory.js'
import Browser from './browser.js'
import ThemeFactory from './theme-factory.js'
import NativeBridge from './native-bridge.js'

let Storage = new StorageFactory()
let Post = PostMethodFactory(Storage, Browser, NativeBridge)
let Theme = new ThemeFactory(Storage, Browser)

export {
    Post,
    Storage,
    NativeBridge,
    Browser,
    Theme
}