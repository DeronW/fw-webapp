import React from 'react'

import CSSModules from 'react-css-modules'
import styles from '../css/index.css'
import { observer, inject } from 'mobx-react'
import { Redirect } from 'react-router'

@inject("reset_deal_password") @observer @CSSModules(styles)
export default class ResetDealPassword extends React.Component {
    static onEnter() {
        document.title = "重设交易密码";
    }
}