import React from 'react'
import CSSModules from 'react-css-modules'

import { Header } from '../components'

import styles from '../css/loan-status.css'


@CSSModules(styles, { allowMultiple: true, errorWhenNotFound: false })
class LoanStatus extends React.Component {

    state = {
        status: 'waiting', // 'success', 'fail', 'waiting'
        bank: '招商银行',
        card: '8412',
    }

    getStatusText = () => {
        const { status, bank, card } = this.state;
        const text = {
            'success': <span>借款成功，现金已到账<br /><span>{`提现卡 ${bank}(${card})`}</span></span>,
            'fail': <span>借款失败，银行卡异常</span>,
            'waiting': <span>极速处理中</span>,
        };
        return text[status]
    }

    render() {
        const { status } = this.state;

        const statusText = this.getStatusText();

        return <div styleName="container">
            <Header title="借款结果" history={this.props.history} />

            <div styleName="status">
                <div styleName="step-success">
                    <span>受理成功，银行处理中</span>
                </div>
                <div styleName={`step-${status}`}>
                    { this.getStatusText() }
                </div>
            </div>

            <div styleName="to-bills-entry">查看账单</div>

            <div styleName="service-time">周一至周日8:30-21:00     400-0322-988</div>
        </div>
    }
}


export default LoanStatus