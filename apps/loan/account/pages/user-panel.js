import React from 'react'
import CSSModules from 'react-css-modules'
import { Link } from 'react-router-dom'
import { observer, inject } from 'mobx-react'
import { Components, Utils } from 'fw-javascripts'

import { Header, BottomNavBar } from '../../lib/components'
import { Post } from '../../lib/helpers'

import styles from '../css/user-panel.css'

@inject('account')
@observer
@CSSModules(styles, { "allowMultiple": true, "errorWhenNotFound": false })
class UserPanel extends React.Component {

    state = {
        unauthorized: null,
        tips: null
    }

    componentDidMount() {
        Post('/api/loan/v1/baseinfo.json', {
            productId: 1
        }).then(data => {
            let st = data.borrowBtnStatus;
            this.setState({
                unauthorized: st === 1,
                tips: st === 101 ? '设置提现卡处理中，请稍等' : false // 实名中
            })
        })
        this.props.account.get_mobile_num();
    }

    clickHandler = type => {
        let { history } = this.props
        let { tips, unauthorized } = this.state
        if (tips) return Components.showToast(tips)

        if (unauthorized) {
            location.href = '/static/loan/user-card-set/index.html'
            // 此处应返回, 不然, 会直接执行到下面的代码
            return
        }

        if (type == 'a') {
            location.href = '/static/loan/user-info/index.html'
        }
        if (type == 'c') {
            history.push('/bank-card')
        }
        if (type == 'd') {
            history.push('/redbag')
        }
    }

    render() {
        let { account, history } = this.props

        return <div styleName="bg">
            <div styleName="banner">
                <img styleName="avatar" src={require("../images/user-panel/avatar.png")} />
                <div styleName="mask-phone">{account.mobile}</div>
            </div>

            <div styleName="links">
                <a styleName="link-item" onClick={() => this.clickHandler('a')}>
                    <img src={require("../images/user-panel/info_icon.png")} />
                    个人信息
                </a>
                <a styleName="link-item" onClick={() => history.push("/bill-records?type=2")}>
                    <img src={require("../images/user-panel/more_repayment.png")} />
                    订单记录
                </a>
                <a styleName="link-item" onClick={() => this.clickHandler('c')}>
                    <img styleName="bank-card-icon" src={require("../images/user-panel/bank_icon.png")} />
                    银行卡
                </a>
                <a styleName="link-item" onClick={() => this.clickHandler('d')}>
                    <img src={require("../images/user-panel/packet_icon.png")} />
                    红包
                </a>
                <a styleName="link-item" href="/static/loan/features/#/more">
                    <img src={require("../images/user-panel/more_icon.png")} />
                    更多
                </a>

            </div>

            <BottomNavBar history={history} />
        </div>
    }

}

export default UserPanel