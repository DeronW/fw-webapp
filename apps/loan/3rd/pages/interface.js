import React from 'react'
import CSSModules from 'react-css-modules'

import { Components, Utils } from 'fw-javascripts'
import { Header } from '../../lib/components'

import { Post, Storage } from '../../lib/helpers'

import styles from '../css/interface.css'


@CSSModules(styles, { "allowMultiple": true, "errorWhenNotFound": false })
class Fail extends React.Component {

    componentDidMount() {
        let { history } = this.props;
        return Post('/api/userext/v1/validTokenAndLogin.json', {
            partner: Utils.hashQuery.partner,
            sign: Utils.hashQuery.sigin,
            timestamp: Utils.hashQuery.timestamp,
            token: Utils.hashQuery.token
            // token: 'success'
        }, 'silence').then((data) => {
            let dict = data;
            Storage.login({
                token: dict.userToken,
                status: dict.userStatus,
                uid: dict.uid,
                phone: dict.mobile,
                invite_code: dict.invitationCode
            })
            location.href = '/static/loan/home/index.html';
        }, e => {
            history.push('/fail');
        })
    }

    render() {
        let { history } = this.props;
        return (
            <div>
                <Header title="授权" history={history} />
                <div styleName="info-container">
                    <img styleName="info-img" src={require("../images/interface/wait.png")}/>
                    <div styleName="info-text">请稍等，页面正在跳转...</div>
                </div>
            </div>
        )
    }
}

export default Fail
