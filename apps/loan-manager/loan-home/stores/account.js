import React from 'react'

import { extendObservable } from 'mobx'

import { Redirect } from 'react-router-dom'

import { Utils, BrowserFactory as Browser } from 'fw-javascripts'


export default class Account {

    constructor(post) {
        this.post = post;
        extendObservable(this, {
            uid: 'dfg',
            token: 'dfg',
            phone: '',
            status: '',
            inviteCode: '',
            nextPage: ''
        })
    }

    // encapsulate post request, with user auth
    authPost = (url, data) => {
        return this.post(url, data, { uid: this.uid, token: this.token })
    }


    authSyncWithApp = (appAccount) => {
        ['uid', 'token'].forEach( (k) => { this[k] = appAccount[k] || this[k] } );
    }

    get isLoggedIn() {
        if (Browser.inApp) {
            let appCookie = Utils.docCookie;
            this.authSyncWithApp(appCookie);
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

    register = (params, nextPage) => {
        this.post('/api/userBase/v1/register.json', params)
            .then((data) => {
                this.setAccountAuth(data.userLogin);
                return <Redirect to={nextPage ? nextPage : '/loan'}/>
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
