import { extendObservable } from 'mobx'

export default class User {
    constructor() {
        this.data = {}
        extendObservable(this.data, {
            user: {
                notice: [],
                banners:[]
            }
        })
    }
    fetchNotice = () => {
        this.data.user.notice = [{
            des: '第三方发',
            url:'https://www.baidu.com/?tn=78040160_5_pg&ch=1'
        }, {
            des: '电话号给的图',
            url:'https://www.360.cn/'
        }, {
            des: '阿森松岛',
            url:'https://www.baidu.com/'
        }]

        this.data.user.banners = [
            {
                img:''
            }
        ]
    }
}
