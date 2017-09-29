import React from 'react'
import { inject, observer } from 'mobx-react'
import CSSModules from 'react-css-modules'

import { Utils } from 'fw-javascripts'

import { Header } from '../../lib/components'

import styles from '../css/repayment-youyi-result.css'


@inject('repayment_youyi')
@observer
@CSSModules(styles, { allowMultiple: true })
class RepaymentYouyiResult extends React.Component {

    componentDidMount() {
        document.title = '还款结果'

        let { repayment_youyi } = this.props,
            repaymentUuid = Utils.hashQuery.id;
        repayment_youyi.setRepaymentId(repaymentUuid);
        repayment_youyi.fetchRepaymentResult();
    }

    render() {
        let { history, repayment_youyi } = this.props,
            { repaymentAmount, leftAmount, repaymentResult, errMessage } = repayment_youyi,
            { loanId } = repayment_youyi.data;

        let to_repayment_page = () => {
            history.push(`/repayment-youyi?id=${loanId}`)
        }

        let paidOff = <div>
            <div styleName="result-container success">
                <div styleName="title">还款成功</div>
                <div styleName="info">本次成功还款{repaymentAmount}元
                    <br />恭喜您已还清全部借款，请保持良好的信用
                </div>
            </div>
            <a styleName="btn" href="/static/loan/products/index.html#/loan-youyi-index">再借一笔</a>
        </div>

        let stillLeft = <div>
            <div styleName="result-container success">
                <div styleName="title">还款成功</div>
                <div styleName="info">本次成功还款{repaymentAmount}元
                    <br />
                    还差 <span>{leftAmount}</span>元未还，请记得按时还款
                </div>
            </div>
            <a styleName="btn" onClick={to_repayment_page}>查看订单</a>
        </div>

        let fail = <div>
            <div styleName="result-container fail">
                <div styleName="title">还款失败</div>
                <div styleName="info">{errMessage}</div>
            </div>
            <a styleName="btn" onClick={to_repayment_page}>查看订单</a>
        </div>

        let waiting = <div>
            <div styleName="result-container waiting">
                <div styleName="title">还款中</div>
                <div styleName="info">稍后可在还款详情页查看还款记录
                    <br />
                    如果还款失败我们稍后会发送短信通知您
                </div>
            </div>
            <a styleName="btn" onClick={to_repayment_page}>查看订单</a>
        </div>

        return <div styleName="cnt-container">
            <Header title="还款结果" history={history} />

            {repaymentResult == 'success' && leftAmount == 0 && paidOff}
            {repaymentResult == 'success' && leftAmount != 0 && stillLeft}
            {repaymentResult == 'fail' && fail}
            {repaymentResult == 'waiting' && waiting}
        </div>
    }
}

export default RepaymentYouyiResult
