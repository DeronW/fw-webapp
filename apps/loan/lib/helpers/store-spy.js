
import { spy } from 'mobx'


export default class StoreSpy {
    constructor(stores) {
        this.stores = stores
    }

    log = (txt) => {
        console.log('%c store spy:', 'background: #222; color: #eee', txt)
    }

    wiretap = () => {
        if (document) {
            // 如果在正式环境, 不要添加调试信息
            if (document.getElementById('env').value == 'production')
                return null
        }

        if (window) {
            window._$_show_me_mobx_stores = () => {
                this.log('全部stores')
                console.log(this.stores)
            }
            window._$_show_me_mobx_stores_data = () => {
                this.log('全部stores的data属性')
                for (let i in this.stores) {
                    console.log(i, this.stores[i].data)
                }
            }
        }

        // https://mobx.js.org/refguide/spy.html
        spy((event) => {
            // console.log(event) // for debug
            if (this[`handle_${event.type}`])
                this[`handle_${event.type}`](event)
        })
    }

    handle_computed = event => {
        let obj = event.object.constructor.name
        this.log(`自动计算 ${obj}`)
    }
    handle_update = event => {
        let obj = event.object.constructor.name
        this.log(`更新 ${obj}.${event.name}: "${event.oldValue}" => "${event.newValue}"`)
    }
    handle_add = event => {
        let obj = event.object.constructor.name
        this.log(`新增 ${obj}.${event.name}: "${event.newValue}"`)
    }
    handle_delete = event => {
        let obj = event.object.constructor.name
        this.log(`删除 ${obj}.${event.name}: "${event.oldValue}"`)
    }
}