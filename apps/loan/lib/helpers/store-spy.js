
import { spy } from 'mobx'


export default class StoreSpy {
    constructor() {

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
        this.log(`更新字段 ${obj}.${event.name}: "${event.oldValue}" => "${event.newValue}"`)
    }
    handle_add = event => {
        let obj = event.object.constructor.name
        this.log(`新增字段 ${obj}.${event.name}: "${event.newValue}"`)
    }
    handle_delete = event => {
        let obj = event.object.constructor.name
        this.log(`删除字段 ${obj}.${event.name}: "${event.oldValue}"`)
    }
}