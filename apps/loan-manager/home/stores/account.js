import { extendObservable } from 'mobx'

export default class Account {

    constructor(request, state = {}) {
        this.request = request
        extendObservable(this, {
            phone: null,
            sms_code: null,
        }, state)
    }

    isLoggedIn() {
        return !!this.phone
    }

    login(params) {
        console.log('user want to login')

        return this.request('api/account/login', params).then(account => {
            extendObservable(this, account)
        })
    }

    logout() {
        return this.request('api/account/logout')
            .then(() => {
                this.phone = null
                this.sms_code = null
            })
    }

}
