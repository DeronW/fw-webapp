import { extendObservable } from 'mobx'

export default class Login {
    constructor(Post) {
        this.Post = Post
        this.data = {}
        extendObservable(this.data, {

        })
    }
    login = (username,password) => {
        //登录接口
        return this.Post('/finManager/user/login.shtml',{
            username:username,
            pwd:password,
            sourceType:3
        }).then(data => {
        })
    }
}
