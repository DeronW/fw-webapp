
import { spy } from 'mobx'


export default class StoreSpy {
    constructor() {
    }

    log = (desc, field, old_value, new_value) => {
        let color = {
            desc: '',
            field: 'color: #428bca',
            old_value: 'color: #f0ad4e',
            new_value: 'color: #5cb85c'
        }

        console.log(
            `%c${desc}:`, `%c${field}`,
            `%c${old_value}`, `%c${new_value}`,
            color.desc, color.field,
            color.old_value, color.new_value)
    }

    wiretap = () => {
        // https://mobx.js.org/refguide/spy.html
        spy((event) => {
            if (this[`handle_${event.type}`])
                this[`handle_${event.type}`]
        })

    }

    handle_computed = event => { }
    handle_update = event => { }
    handle_add = event => {

    }
    handle_delete = event => {

    }
}