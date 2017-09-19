import React from 'react'
import CSSModules from 'react-css-modules'
import { Link } from 'react-router-dom'

import { Utils } from 'fw-javascripts'

import { Post } from '../../lib/helpers'

import { Header } from '../../lib/components'

import styles from '../css/bill-youyi-detail.css'


@CSSModules(styles)
class BillYouyiDetail extends React.Component {

    state = {
        loanId: '',
        status: '',
        loanAmount: '',
        duration: '',
        actualAmount: '',
        paidAmount: '',
        unpaidAmount: '',
        overdueAmount: '',
        loanDate: '',
        dueDate: '',
        loopLoanUuid: ''
    }

    componentDidMount() {
        document.title = '账单详情';

        let loanId = Utils.hashQuery.id;
        this.setState({ loanId: loanId });

        Post('/api/looploan/repayment/v1/loanDetail.json', {
            loanUuid: loanId
        }).then(data => {
            this.setState({
                status: data.loanStatus,
                loanAmount: data.loanAmountStr,
                duration: data.productPeriod,
                actualAmount: data.netAmountStr,
                paidAmount: data.repaymentAmountStr,
                unpaidAmount: data.loanLeftAmountStr,
                overdueAmount: data.overdueFeeStr,
                loanDate: data.loanTimeStr,
                dueDate: data.dueTimeStr,
                loopLoanUuid: data.loopLoanUuid
            })
        })
    }

    render() {
        let { loanId, status, loanAmount, duration, actualAmount, paidAmount,
            unpaidAmount, overdueAmount, loanDate, dueDate, loopLoanUuid } = this.state,
            statusBar, detailContainer;

        let detail4TruelyLoaned = <div>
            <div styleName="item-grp">
                <div styleName="item">
                    <div styleName="name">到账金额(元)</div>
                    <div styleName="value">{actualAmount}</div>
                </div>
                <div styleName="item">
                    <div styleName="name">已还金额(元)</div>
                    <div styleName="value">{paidAmount}</div>
                </div>
                {overdueAmount != 0 &&
                    <div styleName="item">
                        <div styleName="name">逾期费(元)</div>
                        <div styleName="value">{overdueAmount}</div>
                    </div>
                }
                <div styleName="item">
                    <div styleName="name">待还金额(元)</div>
                    <div styleName="value">{unpaidAmount}</div>
                </div>
            </div>

            <div styleName="item-grp">
                <div styleName="item">
                    <div styleName="name">借款时间</div>
                    <div styleName="value">{loanDate}</div>
                </div>
                <div styleName="item">
                    <div styleName="name">到期还款日</div>
                    <div styleName="value">{dueDate}</div>
                </div>
            </div>
        </div>

        let detail4DidNotLoan = <div>
            <div styleName="item-grp">
                <div styleName="item">
                    <div styleName="name">借款时间</div>
                    <div styleName="value">{loanDate}</div>
                </div>
            </div>
        </div>

        if (status == 1) {
            statusBar = <div styleName="status-bar-applying">申请中</div>
            detailContainer = detail4DidNotLoan;
        } else if (status == 2) {
            statusBar = <div styleName="status-bar-paying">待还款</div>
            detailContainer = detail4TruelyLoaned;
        } else if (status == 3) {
            statusBar = <div styleName="status-bar-paid">已还款</div>
            detailContainer = detail4TruelyLoaned;
        } else if (status == 4) {
            statusBar = <div styleName="status-bar-rejected">未通过</div>
            detailContainer = detail4DidNotLoan;
        }

        return <div styleName="cnt-container">
            <Header title="账单详情" history={this.props.history} enable={'force'} />

            { (status == 2 || status == 3) &&
                <Link styleName="repayment-records-entry" to={`repayment-youyi-records?id=${loopLoanUuid}`}>还款记录</Link>
            }

            <div styleName="logo-container">
                <img src={require('../images/repayment-youyi/logo.png')}></img>
                优易借
                {statusBar}
            </div>


            <div styleName="bill-sum">
                <div styleName="loan-amount">
                    <div styleName="bill-sum-value">{loanAmount}</div>
                    <div styleName="bill-sum-name">借款金额</div>
                </div>
                <div styleName="vertical-line"></div>
                <div styleName="due-date">
                    <div styleName="bill-sum-value">{duration}</div>
                    <div styleName="bill-sum-name">借款期限</div>
                </div>
            </div>

            {detailContainer}

            {status == 2 &&
                <div styleName="submit-btn-container">
                    <Link styleName="submit-btn" to={`/repayment-youyi?id=${loanId}`} >
                        立即还款
                    </Link>
                </div>
            }

        </div>
    }
}

export default BillYouyiDetail
