import React from 'react'
import CSSModules from 'react-css-modules'
import {observer, inject} from 'mobx-react'
import {BannerGroup} from 'fw-components'

import {Header, BottomNavBar} from '../../components';
import styles from '../../css/user/qr-code.css'

@inject('login')
@observer
@CSSModules(styles, {"allowMultiple": true, "errorWhenNotFound": false})
class QRCode extends React.Component {
    render(){
        let {history} = this.props
        let { headUrl,code } = this.props.login.data
        return <div styleName="bg">
            <Header title="我的工场码" history={history}/>
            <img src={headUrl}/>
            <div styleName="text">工场码:<span>{code}</span></div>
            <div styleName="qr-bg">
                <div styleName="qr-code"></div>
            </div>
            <div styleName="qr-text">邀请好友扫一扫，免费注册</div>
        </div>
    }
}
export default QRCode