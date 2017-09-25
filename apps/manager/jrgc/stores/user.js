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
            des: '第三方发'
        }, {
            des: '电话号给的图'
        }, {
            des: '阿森松岛'
        }]
    }
}
