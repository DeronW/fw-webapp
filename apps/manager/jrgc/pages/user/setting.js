import React from 'react'
import CSSModules from 'react-css-modules'
import {observer, inject} from 'mobx-react'
import { Event, Components, Utils } from 'fw-javascripts'
import {BannerGroup} from 'fw-components'

import {Header, BottomNavBar} from '../../components';
import styles from '../../css/user/setting.css'

@inject("login","user")
@observer
@CSSModules(styles, {"allowMultiple": true, "errorWhenNotFound": false})
class Setting extends React.Component{
    state = {
        close:false
    }
    exitLoginHandler = () =>{
        let {history} = this.props
        this.setState({close:false})
        this.props.login.exitHandler()
                        .then(()=>Components.showToast('退出成功'))
                        .then(() => history.push('/login'))
    }
    showPopHandler = () => {
        this.setState({close:true})
    }
    closePopHandler = () => {
        this.setState({close:false})
    }
    gotoQRCode = () => {
        let {history} = this.props
        history.push('/user-qr-code')
    }
    render(){
        let {history} = this.props
        let {close} = this.state
        let { loginName } = this.props.login.data
        let { info } = this.props.user.data.user
        let pop = <div styleName="pop-bg">
            <div styleName="pop">
                <div styleName="reminder">提示</div>
                <div styleName="text">确认退出登录吗？</div>
                <div styleName="exitBtn" onClick={this.exitLoginHandler}>退出</div>
                <div styleName="close" onClick={this.closePopHandler}></div>
            </div>
        </div>
        return <div styleName="bg">
            <Header title="个人设置" history={history}/>
            <div styleName="set">
                <div styleName="set-item">
                    <img src={require('../../images/user/setting/name.png')}/>
                    <span>账号</span>
                    <div styleName="loginName">{loginName}</div>
                </div>
                <div styleName="set-item">
                    <img src={require('../../images/user/setting/code.png')}/>
                    <span>工场码</span>
                    <div styleName="loginName gcm" onClick={this.gotoQRCode}>
                        {info.promotionCode}
                        <img src={require('../../images/user/setting/arrow.png')}/>
                    </div>
                </div>
            </div>
            <div styleName="exit" onClick={this.showPopHandler}>退出登录</div>
            {close && pop}
        </div>
    }
}
export default Setting