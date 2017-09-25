import { extendObservable } from 'mobx'

export default class Login {
    constructor() {
        this.data = {}
        extendObservable(this.data, {

        })
    }
    login = (username,password) => {
        //登录接口
        if(!username || !password) return
        console.log(username,password)
    }
}
