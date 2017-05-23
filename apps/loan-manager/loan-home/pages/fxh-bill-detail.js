import React from 'react'
import { NavLink } from 'react-router-dom'

import CSSModules from 'react-css-modules'
import styles from '../css/fxh-bill-detail.css'

import Header from './components/header'
import BottomNavBar from './components/bottom-nav-bar'

import { Request } from 'fw-javascripts'


@CSSModules(styles, {"allowMultiple": true, "errorWhenNotFound": false})
class Detail extends React.Component {

    state = { detail: {} };
    loanGid = this.props.match.params.billId;

    componentDidMount() {
        let API_PATH = document.getElementById('api-path').value;

        Request({
            url: `${API_PATH}/api/repayment/v1/loandetail.json`,
            method: 'post',
            data: {
                loanGid: this.loanGid,
                userId: 'sdf' // user credential infos
            }
        }).then(data => {
            this.setState({detail: data});
        })
    }

    render() {
        let st = this.state.detail.extendStatus;
        let userToken = '324';
        let userGid = '324';

        let status_icon = status => {
            let d = {
                '0': 'icon1', '1': 'icon1',
                '2': 'icon2', '3': 'icon2',
                '5': 'icon2', '100':'icon4',
                '101': 'icon3', '102': 'icon3'
            }
            return d[status] && <div styleName={d[status]}></div>
        }

        return (
            <div>
                <Header title="账单详情" />
                { this.state.detail.haveRepaymentRecord &&
                    <NavLink
                        styleName="bill-history-entry"
                        to={`/bill/fxh/${this.props.match.params.billId}/repayment?repaymentUuid=${this.state.detail.repaymentUuid}`}>还款记录</NavLink> }
                <div styleName="logo-box">
                    <img styleName="logo-img" src={require("../images/fxh-bill-detail/logo.png")}/>
                    <div styleName="logo-brand">放心花</div>
                    {status_icon(st)}
                </div>
                <div styleName="detail-items">
                    <div styleName="loan-info">
                        <div styleName="transfer-lines">
                            <div styleName="return-money">
                                <span styleName="return-money-num">{this.state.detail.loanAmountStr}</span>
                                <span styleName="return-money-title">借款金额</span>
                            </div>
                            <div styleName="return-date">
                                <span styleName="return-date-day">{this.state.detail.productPeriod}</span>
                                <span styleName="return-date-title">借款期限</span>
                            </div>
                        </div>
                        <span styleName="vertical-line"></span>
                    </div>

                    {(st == 100 || st == 101 || st == 102 || st == 103) && <div styleName="loan-detail-box">
                        <div>
                            <span>到账金额(元)</span>
                            <span>{this.state.detail.netAmountStr}</span>
                        </div>
                        <div>
                            <span>已还金额(元)</span>
                            <span>{this.state.detail.repaymentAmountStr}</span>
                        </div>
                        {(st == 103 || st == 100) && <div>
                            <span>逾期费(元)</span>
                            <span>{this.state.detail.overdueFeeStr}</span>
                        </div>}
                        <div>
                            <span>待还金额(元)</span>
                            <span>{this.state.detail.loanLeftAmountStr}</span>
                        </div>
                    </div>}
                    {(st == 100 || st == 101 || st == 102 || st == 103) && <div styleName="loan-detail-box">
                        <div>
                            <span>借款时间</span>
                            <span>{this.state.detail.loanTimeStr}</span>
                        </div>
                        <div>
                            <span>到期还款日</span>
                            <span>{this.state.detail.dueTimeStr}</span>
                        </div>
                    </div>}
                    {(st == 0 || st == 1 || st == 2 || st == 3 || st == 5) && <div styleName="loan-detail-box">
                        <div>
                            <span>借款时间</span>
                            <span>{this.state.detail.loanTimeStr}</span>
                        </div>
                    </div>}
                </div>
                {(st == 102 || st == 103) &&
                <div styleName="pay-back-btn-box" ><a href={`/static/loan/bill-payback/index.html?loanGid=${this.loanGid}`}>立即还款</a></div>}
                {st == 101 &&
                <div styleName="pay-back-btn-box"><span>立即还款</span></div>}
            </div>
        )
    }
}

export default Detail
