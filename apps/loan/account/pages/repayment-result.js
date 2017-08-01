import React from 'react'
import { inject, observer } from 'mobx-react'
import CSSModules from 'react-css-modules'

import { Header } from '../../lib/components'

import styles from '../css/repayment-result.css'


@inject('repayment_youyi')
@observer
@CSSModules(styles, { allowMultiple: true })
class RepaymentResult extends React.Component {

    componentDidMount() {
        document.title = '还款结果';
        this.props.repayment_youyi.fetchRepaymentResult();
    }

    render() {
        let { history, repayment_youyi } = this.props,
        { repaymentAmount, leftAmount, repaymentResult } = repayment_youyi;

        let paidOff = <div>
            <div styleName="result-container success">
                <div styleName="title">还款成功</div>
                <div styleName="info">本次成功还款{repaymentAmount}元
                    <br/>
                    恭喜您已还清全部借款，请保持良好的信用
                </div>
            </div>
            <div styleName="btn">再借一笔</div>
        </div>

        let stillLeft = <div>
            <div styleName="result-container success">
                <div styleName="title">还款成功</div>
                <div styleName="info">本次成功还款{repaymentAmount}元
                    <br/>
                    还差 <span>{leftAmount}</span>元 未还，请记得按时还款
                </div>
            </div>
            <div styleName="btn">查看订单</div>
        </div>

        let fail = <div>
            <div styleName="result-container fail">
                <div styleName="title">还款成功</div>
                <div styleName="info">请检查网络原因，本次还款失败</div>
            </div>
            <div styleName="btn">查看订单</div>
        </div>

        let waiting = <div>
            <div styleName="result-container waiting">
                <div styleName="title">还款成功</div>
                <div styleName="info">稍后可在还款详情页查看还款记录
                    <br/>
                    如果还款失败我们稍后会发送短信通知您
                </div>
            </div>
            <div styleName="btn">查看订单</div>
        </div>

        return <div styleName="cnt-container">
            <Header title="还款结果" history={history} />

            { repaymentResult == 'success' && leftAmount == 0 && paidOff }
            { repaymentResult == 'success' && leftAmount != 0 && stillLeft }
            { repaymentResult == 'fail' && fail }
            { repaymentResult == 'waiting' && waiting }
        </div>
    }
}

export default RepaymentResult
