import React from 'react'
import CSSModules from 'react-css-modules'
import { Link } from 'react-router-dom'

import { Utils } from 'fw-javascripts'

import { Header } from '../../lib/components'

import { Post, Browser, Storage, NativeBridge } from '../../lib/helpers'

import styles from '../css/repayment-fenqi.css'


@CSSModules(styles)
class RepaymentFenqi extends React.Component {

    state = {
        loanUuid: '',
        logoUrl: '',
        name: '',
        amount: '',
        duration: '',
        dueDate: ''
    }

    componentDidMount() {
        document.title = '还款明细';
        this.setState({ loanUuid: Utils.hashQuery.id })
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.loanUuid != prevState.loanUuid) this.fetchLoanInfo();
    }

    fetchLoanInfo = () => {
        Post('/api/order/v1/orderDetail.json', {
            loanUuid: this.state.loanUuid
        }).then(data => {
            this.setState({
                logoUrl: data.productLogo,
                name: data.productName,
                amount: data.loanAmtStr,
                duration: data.termNumStr,
                dueDate: data.dueTimeStr,
                baseStatus: ''
            })
        })
    }

    handleJump = () => {
        let USER = Storage.getUserDict(),
            link, query = `?token=${USER.token}&uid=${USER.uid}&loanUuid=${this.state.loanUuid}`;
        if (Browser.inApp) {
            link = `https://m.easyloan888.com/api/order/v1/jump.shtml${query}`;
            NativeBridge.goto(link, false, '分期')
        } else {
            const API_PATH = document.getElementById('api-path').value,
                SOURCE_TYPE = Browser.inApp ? 3 : Browser.inWeixin ? 4 : 3;
            link = `${API_PATH}/api/order/v1/jump.shtml${query}&sourceType=${SOURCE_TYPE}`;
            if (link.indexOf('://') < 0)  link = location.protocol + '//' + location.hostname + link;
            location.href = encodeURI(link);
        }
    }

    render() {
        let { logoUrl, name, amount, duration, dueDate, baseStatus } = this.state;

        return <div styleName="cnt-container">
            <Header title="还款明细" />

            <div styleName="logo-container">
                <img src={require("../images/repayment-fenqi/logo.png")} />
                {/* <img src={logoUrl} /> */}
                <div styleName="product-name">{name}</div>
            </div>

            <div styleName="item-grp">
                <div styleName="item">
                    <div styleName="item-name">借款金额</div>
                    <div styleName="item-value">{amount}</div>
                </div>
            </div>

            <div styleName="item-grp">
                <div styleName="item">
                    <div styleName="item-name">借款期限</div>
                    <div styleName="item-value">{duration}</div>
                </div>
                <div styleName="item">
                    <div styleName="item-name">还款日</div>
                    <div styleName="item-value">{dueDate}</div>
                </div>
            </div>

            <div styleName="submit-btn-container">
                <div styleName="submit-btn" onClick={this.handleJump}>
                    点击进入分期
                </div>
            </div>
        </div>
    }
}

export default RepaymentFenqi
