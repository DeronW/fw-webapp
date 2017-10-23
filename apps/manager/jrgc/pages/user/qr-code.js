import React from 'react'
import CSSModules from 'react-css-modules'
import {observer, inject} from 'mobx-react'
import {BannerGroup} from 'fw-components'

import {Header, BottomNavBar} from '../../components';
import styles from '../../css/user/qr-code.css'

@inject('login',"user")
@observer
@CSSModules(styles, {"allowMultiple": true, "errorWhenNotFound": false})
class QRCode extends React.Component {
    render(){
        let {history} = this.props
        let { headUrl } = this.props.login.data
        let { info } = this.props.user.data.user
        return <div styleName="bg">
            <Header title="我的工场码" history={history}/>
            <img src={headUrl}/>
            <div styleName="text">工场码:<span>{info.promotionCode}</span></div>
            <div styleName="qr-bg">
                <div styleName="qr-code"></div>
            </div>
            <div styleName="qr-text">邀请好友扫一扫，免费注册</div>
        </div>
    }
}
export default QRCode