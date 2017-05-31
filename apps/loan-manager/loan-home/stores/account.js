import React from 'react'

import { extendObservable } from 'mobx'

import { Redirect } from 'react-router-dom'

import { Utils, BrowserFactory as Browser } from 'fw-javascripts'

import $LOAN from '../../../../es7-lib/javascripts/new-loan'


export default class Account {

    constructor(post) {
        this.post = post;
        extendObservable(this, {
            uid: '',
            token: 'dfg',
            phone: '',
            status: '',
            inviteCode: '',
            nextPage: '/loan' // default jump to /loan(home) after login
        })
    }

    // encapsulate post request, with user auth
    authPost = (url, data) => {
        return this.post(url, data, { uid: this.uid, token: this.token })
    }

    localAuthSync = () => {
        let localAccount = $LOAN.LocalAccount.getDict();
        ['uid', 'token'].forEach( (k) => { this[k] = localAccount[k] || this[k] } );
    }

    appAuthSync = (appAccount) => {
        ['uid', 'token'].forEach( (k) => { this[k] = appAccount[k] || this[k] } );
        $LOAN.LocalAccount.setDict({ token: this.token, uid: this.uid });
    }

    get isLoggedIn() {
        this.localAuthSync();
        if (Browser.inApp) {
            let appCookie = Utils.docCookie;
            this.appAuthSync(appCookie);
        }
        return this.token && this.uid
    }

    get maskedPhone() {
        return this.phone.replace(/(\d{3})\d{4}(\d{3})/, "$1****$2");
    }

    setPhone = (phone) => {
        this.phone = phone;
    }

    setAccountAuth = (acc) => {
        this.uid = acc.uid || '';
        this.token = acc.userToken || '';
        this.state = acc.userStatus || '';
        this.inviteCode = acc.invitationCode || '';
        $LOAN.LocalAccount.setDict({ token: this.token, uid: this.uid });
    }

    clearAccount = () => {
        ['uid', 'token', 'phone', 'inviteCode', 'status', 'nextPage'].forEach( (k) => { this[k] = '' } );
    }

    getVeriCode = (phone, forResetPassword) => {
        return this.post('/api/userBase/v1/sendVerifyCode.json', {
            mobile: phone,
            userOperationType: forResetPassword ? 2 : 3
        }).then(() => { this.phone = phone })
    }

    setNextPage = (loc) => {
        console.log(loc);
        this.nextPage = loc;
    }

    register = (params) => {
        this.post('/api/userBase/v1/register.json', params)
            .then((data) => {
                this.setAccountAuth(data.userLogin);
                // return <Redirect to={this.nextPage ? this.nextPage : '/loan'}/>
            })
    }

    login = (password) => {
        let login_params = {
            mobile: this.phone,
            password: password
        };
        return this.post('/api/userBase/v1/login.json', login_params)
            .then((data) => {
                this.setAccountAuth(data.userLogin);
            })
    }

    logout = () => {
        this.clearAccount();
        return <Redirect to='/user-entry'/>
    }

}
