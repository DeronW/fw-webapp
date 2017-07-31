import React from 'react'
import CSSModules from 'react-css-modules'
import { observer, inject } from 'mobx-react'
import { Components } from 'fw-javascripts'
import { Header } from '../../lib/components'
import styles from '../css/loan-youyi-form.css'
import {Storage} from '../../lib/helpers'

@inject('loopLoan')
@observer
@CSSModules(styles,{ "allowMultiple": true, "errorWhenNotFound": false })
export default class LoopLoanLoan extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            value : "",
            hasInput:false,
            checked:true,
            mask1Show:false,
            mask2Show:false,
            mask3Show:false
        }
    }

    componentDidMount(){
        document.title = '借钱';
    }

    changeHandler = (e) => {
        let {loopLoan} = this.props;
        let v = e.target.value;
        if(v.length <= 5){
            this.setState({value:v, hasInput:true})
            if(parseInt(v) >= 500 && parseInt(v) <= loopLoan.canBorrowAmt){
                this.props.loopLoan.loan_calculate(v);
            }
        }
    }

    checkHandler = () => {
        this.setState({checked:!this.state.checked})
    }

    detailShowHandler = () => {
        this.setState({mask1Show:true})
    }

    detailHideHandler = () => {
        this.setState({mask1Show:false})
    }

    popupHideHandler = () => {
        this.setState({mask3Show:false})
    }


    confirmHandler = () => {
        if(!this.state.checked){
            Components.showToast("请同意相关协议")
        }else if(this.state.value == ''){
            Components.showToast("请输入借款金额")
        }else{
            this.props.loopLoan.loan_confirm(this.state.value);
            this.setState({mask3Show:true})
        }
    }

    render(){
        let { history, loopLoan } = this.props;
        let USER = Storage.getUserDict();
        return (
            <div styleName="cnt-container">
                <Header title="借钱" history={history} />
                <div styleName="loan-container">
                    <div styleName="loan-input-num">
                        <span styleName="input-title">借多少</span>
                        <input styleName="input-num" type="number" value={this.state.value} placeholder={"最多可借"+loopLoan.canBorrowAmt+"元"} onChange={this.changeHandler}/>
                    </div>
                    <div styleName="loan-info-item">
                        <div styleName="loan-info-title">到账金额</div>
                        <div styleName={this.state.hasInput? "loan-info-right has-input": "loan-info-right has-not-input"}>{this.state.hasInput ? loopLoan.accountInAmount : 0 }</div>
                    </div>
                    <div styleName="loan-info-item">
                        <div styleName="loan-info-title">应还金额</div>
                        <div styleName={this.state.hasInput? "loan-info-right has-input": "loan-info-right has-not-input"}>{this.state.hasInput ? loopLoan.shouldRepaymentAmount : 0}</div>
                    </div>
                    <div styleName="loan-info-item">
                        <div styleName="loan-info-title">总利息<span styleName="tip" onClick={this.detailShowHandler}></span></div>
                        <div styleName={this.state.hasInput? "loan-info-right has-input": "loan-info-right has-not-input"}>{this.state.hasInput ? loopLoan.totalFeeAmount : 0}</div>
                    </div>
                    <div styleName="loan-info-item">
                        <div styleName="loan-info-title">打款至</div>
                        <div styleName="loan-bank-info">中国银行(2333)<span styleName="arrow"></span></div>
                    </div>
                </div>
                <div styleName="agreement-issue">
                    <div styleName={this.state.checked ? "checked-box" : "unchecked-box"} onClick={this.checkHandler}></div>
                    <div styleName="check-item">同意<a href="/static/loan/protocol-borrowing/index.html">《借款服务协议》</a>、<a
                        href="/static/loan/protocol-partner/index.html">《借款确认书》</a>，<a href="/static/loan/protocol-cost/index.html">《代扣服务协议》</a>，未按时还款将计入信用卡银行的信用报告
                    </div>
                </div>
                <div styleName="btn-container">
                    <div styleName="btn-tip">可提前还款或部分还款，免手续费</div>
                    <div styleName={this.state.hasInput && this.state.checked ? "btn purple" : "btn gray"} onClick={this.confirmHandler}>确定</div>
                </div>
                {this.state.mask1Show && <div styleName="mask1">
                    <div styleName="detail-pop">
                        <div styleName="close-icon"></div>
                        <div styleName="item-title">借款费用详情</div>
                        <div styleName="item-wrap"></div>
                        <div styleName="know-btn" onClick={this.detailHideHandler}>知道了</div>
                    </div>
                </div>}
                {this.state.mask2Show && <div styleName="mask2">
                    <div styleName="notice-pop">
                        <div styleName="notice-close"></div>
                        <div styleName="notice-title">逾期费用说明</div>
                        <div styleName="close-icon"></div>
                        <div styleName="notice-content"></div>
                        <div styleName="notice-btn">知道了</div>
                    </div>
                </div>}
                {this.state.mask3Show && <div styleName="mask3">
                    <div styleName="verify-popup">
                            <div styleName="verify-popup-wrap">
                                <div styleName="verify-popup-close" onClick={this.popupHideHandler}></div>
                                <div styleName="verify-popup-title">短信验证</div>
                                <div styleName="verify-popup-tip">
                                    已向{USER.phone}发送短信验证码
                                </div>
                                <div styleName="verify-input">
                                    <input styleName="sms-input" type="number" name="number"
                                           value="" placeholder="输入验证码"/>
                                    <span styleName="btn-countdown"></span>
                                </div>
                                 <div styleName="confirm-btn">确定</div>
                        </div>
                    </div>
                </div>}
            </div>
        )
    }
}

