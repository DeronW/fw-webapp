import React from 'react'
import CSSModules from 'react-css-modules'

import { NavBar, Turntable } from '../components'

import styles from '../css/home.css'


@CSSModules(styles, { allowMultiple: true, errorWhenNotFound: false })
class Home extends React.Component {

    state = {
        amountMax: '1500',
        amountMin: '500',
        registered: 10001,
        loanStatus: '2',  // '1': 可借款, '2': 已逾期, '3': 未授信
        loanAmount: 500,
    }

    componentDidMount() {
        const body = document.querySelector('body');

        body.style.backgroundColor = '#fff';
    }

    componentWillUnmount() {
        const body = document.querySelector('body');

        body.style.backgroundColor = '';
    }

    handleAmountChange = amount => this.setState({ loanAmount: amount })

    getStatusInfo = status => {
        const info = {
            '1': {
                text: '我要借款',
            },
            '2': {
                text: '您有逾期订单，请还款后发起借款',
                style: {
                    backgroundColor: '#d2d0e2',
                    boxShadow: '0px 8px 8px 0 rgba(207, 205, 224, 0.32)',
                }
            },
            '3': {
                text: '评估授信额度',
            },
        }
        return info[status]
    }

    render() {
        const { amountMax, amountMin, registered, loanStatus, loanAmount } = this.state;

        const statusInfo = this.getStatusInfo(loanStatus);

        return <div styleName="bg">

            <div styleName="slogan">最快30秒极速放款</div>

            <Turntable amountMax={amountMax} amountMin={amountMin}
                loanStatus={loanStatus} changeHandler={this.handleAmountChange} />

            <div styleName="loan-info-grp">
                <div styleName="loan-info">
                    <span>14</span> <br/>
                    借款期限(天)
                </div>
                <div styleName="loan-info">
                    <span>{amountMax}</span> <br/>
                    总额度(元)
                </div>
            </div>

            <div styleName="loan-status-btn" style={statusInfo.style ? statusInfo.style : {}}>{statusInfo.text}</div>

            <div styleName="registered-info">
                已有<span>{registered}人</span>加入现金大师
            </div>

            <div styleName="service-time">周一至周日8:30-21:00     400-0322-988</div>

            <NavBar />
        </div>
    }
}

export default Home