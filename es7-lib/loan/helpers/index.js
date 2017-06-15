
import StorageFactory from './storage-factory.js'
import Post from './post.js'
import Browser from './browser.js'
import ThemeFactory from './theme-factory.js'
import NativeBridge from './native-bridge.js'

let Storage = new StorageFactory()

let Theme = new ThemeFactory(Storage, Browser)

export {
    Post,
    Storage,
    NativeBridge,
    Browser,
    Theme
}