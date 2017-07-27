import React from 'react'
import CSSModules from 'react-css-modules'
import { observer, inject } from 'mobx-react'
import { Components } from 'fw-javascripts'
import { Header } from '../../lib/components'
import styles from '../css/loop-loan-loan.css'

@inject('loopLoan')
@observer
@CSSModules(styles,{ "allowMultiple": true, "errorWhenNotFound": false })
export default class LoopLoanLoan extends React.Component {
    componentDidMount(){
        document.title = '借钱';
    }
    render(){
        let { history } = this.props;
        return (
            <div styleName="cnt-container">
                <Header title="借钱" history={history} />
                <div styleName="loan-container">
                    <div styleName="loan-input-num">
                        <span styleName="input-title">借多少</span>
                        <input styleName="input-num" type="number" value="10000" placeholder=""/>
                    </div>
                    <div styleName="loan-info-item">
                        <div styleName="loan-info-title">到账金额</div>
                        <div styleName="loan-info-right">888</div>
                    </div>
                    <div styleName="loan-info-item">
                        <div styleName="loan-info-title">应还金额</div>
                        <div styleName="loan-info-right">888</div>
                    </div>
                    <div styleName="loan-info-item">
                        <div styleName="loan-info-title">总利息<span styleName="tip"></span></div>
                        <div styleName="loan-info-right">888</div>
                    </div>
                    <div styleName="loan-info-item">
                        <div styleName="loan-info-title">打款至</div>
                        <div styleName="loan-info-right">888</div>
                    </div>
                </div>
                <div styleName="agreement-issue">
                    <div styleName="checked-box"></div>
                    <div styleName="check-item">同意<a href="/static/loan/protocol-borrowing/index.html">《借款服务协议》</a>、<a
                        href="/static/loan/protocol-partner/index.html">《借款确认书》</a>，<a href="/static/loan/protocol-cost/index.html">《代扣服务协议》</a>，未按时还款将计入信用卡银行的信用报告
                    </div>
                </div>
                <div styleName="btn-container">
                    <div styleName="btn-tip">可提前还款或部分还款，免手续费</div>
                    <div styleName="btn">确定</div>
                </div>
                <div styleName="mask1">
                    <div styleName="detail-pop">
                        <div styleName="close-icon"></div>
                        <div styleName="item-title">借款费用详情</div>
                        <div styleName="item-wrap"></div>
                        <div styleName="know-btn">知道了</div>
                    </div>
                </div>
                <div styleName="mask2">
                    <div styleName="notice-pop">
                        <div styleName="notice-close"></div>
                        <div styleName="notice-title">逾期费用说明</div>
                        <div styleName="close-icon"></div>
                        <div styleName="notice-content"></div>
                        <div styleName="notice-btn">知道了</div>
                    </div>
                </div>
                <div styleName="mask3">
                    <div styleName="verify-popup">
                            <div styleName="verify-popup-wrap">
                                <div styleName="verify-popup-close"></div>
                                <div styleName="verify-popup-title">短信验证</div>
                                <div styleName="verify-popup-tip">
                                    已向手发送短信验证码
                                    {/* 已向{this.props.bankShortName}( {this.props.cardNo.slice(-4)} )银行预留手机号发送短信验证码。 */}
                                </div>
                                <div styleName="verify-input">
                                    <input styleName="sms-input" type="number" name="number"
                                           value="" placeholder="输入验证码"/>
                                    <span styleName="btn-countdown"></span>
                                </div>
                                 <div styleName="confirm-btn">确定</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

