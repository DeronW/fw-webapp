import React from 'react'
import CSSModules from 'react-css-modules'
import {observer, inject} from 'mobx-react'
import {Header, NavBar} from '../../components'
import styles from '../../css/user/set-bank-card.css'

@CSSModules(styles, {"allowMultiple": true, "errorWhenNotFound": false})
class SetBankCard extends React.Component {
    render() {
        let {history} = this.props
        return <div>
            <Header title="设置提现银行卡" history={history}/>
            <div styleName="info">
                <div styleName="infoItem">
                    <div styleName="itemLeft">姓名</div>
                    <input styleName="itemRight" placeholder="请输入姓名"></input>
                </div>
                <div styleName="infoItem">
                    <div styleName="itemLeft">身份证号</div>
                    <input styleName="itemRight" placeholder="请输入身份证号"></input>
                </div>
                <div styleName="infoItem">
                    <div styleName="itemLeft">储蓄卡号</div>
                    <input styleName="itemRight" placeholder="请输入储蓄卡号"></input>
                </div>
                <div styleName="infoItem">
                    <div styleName="itemLeft">手机号</div>
                    <input styleName="itemRight" placeholder="请输入手机号"></input>
                </div>
            </div>
            <div styleName="nextStep">下一步</div>
        </div>
    }
}

export default SetBankCard