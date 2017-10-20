import { extendObservable } from 'mobx'

export default class Login {
    constructor(Post) {
        this.Post = Post
        this.data = {}
        extendObservable(this.data, {
            headUrl:'',
            loginName:'哈哈哈',
            code:'12345'
        })
    }
    login = (username,password) => {
        //登录接口
        return this.Post('/finManager/user/login.shtml',{
            username:username,
            pwd:password,
            sourceType:3
        }).then(data => {
            this.data.loginName = data.userInfo.loginName
            this.data.code = data.userInfo.promotionCode
        })
    }
    exitHandler = () => {
        return this.Post('/finManager/user/logout.shtml')
    }
}
