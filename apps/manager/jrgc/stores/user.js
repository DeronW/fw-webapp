import { extendObservable } from 'mobx'

export default class User {
    constructor() {
        this.data = {}
        extendObservable(this.data, {
            user: {
                notice: []
            }
        })
    }
    fetchNotice = () => {
        this.data.user.notice = [{
            des: '1234'
        }, {
            des: '5678'
        }, {
            des: '阿森松岛'
        }]
    }
}
