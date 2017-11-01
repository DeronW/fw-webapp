import React from 'react'
import CSSModules from 'react-css-modules'
import {observer, inject} from 'mobx-react'
import qrcode from 'qrcode'
import {BannerGroup} from 'fw-components'

import {Header, BottomNavBar} from '../../components';
import styles from '../../css/user/qr-code.css'

@inject("user")
@observer
@CSSModules(styles, {"allowMultiple": true, "errorWhenNotFound": false})
class QRCode extends React.Component {
    state = {
        url:''
    }
    componentDidMount(){
        let { info } = this.props.user.data.user
        let url = `https://m.9888.cn/mpwap/orderuser/toRegister.shtml?gcm=${info.promotionCode}`

        qrcode.toDataURL(url,{color:{dark:'#264a7a'}}, (err, url) => {
            this.setState({url:url})
        })
    }
    render(){
        let {history} = this.props
        let { info } = this.props.user.data.user
        let { url } = this.state

        let getHeadUrl = ()=>{
            let u = require('../../images/user/qr-code/default.png')
            if(info.isComp==0){
                if(info.gender==0){
                    u = require('../../images/user/qr-code/woman.png')
                }else if(info.gender==1){
                    u = require('../../images/user/qr-code/man.png')
                }
            }
            return u
        }

        return <div styleName="bg">
            <Header title="我的工场码" history={history}/>
            <img styleName="img" src={getHeadUrl()}/>
            <div styleName="text">工场码:<span>{info.promotionCode}</span></div>
            <div styleName="qr-bg">
            <img styleName="qr-code" src={url}/>
            </div>
            <div styleName="qr-text">邀请好友扫一扫，免费注册</div>
        </div>
    }
}
export default QRCode