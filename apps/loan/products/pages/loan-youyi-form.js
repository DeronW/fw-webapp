import React from 'react'
import CSSModules from 'react-css-modules'
import {observer, inject} from 'mobx-react'
import {Components} from 'fw-javascripts'
import {Header} from '../../lib/components'
import styles from '../css/loan-youyi-form.css'
import {Storage} from '../../lib/helpers'

@inject('loopLoan')
@observer
@CSSModules(styles, {"allowMultiple": true, "errorWhenNotFound": false})
export default class LoopLoanLoan extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            value: "",
            smsValue: "",
            checked: true,
            mask1Show: false,
            mask2Show: false,
            mask3Show: false,
            remain: 0
        }
    }

    componentDidMount() {
        document.title = '借钱';
        this.props.loopLoan.check_cardinfo();
        this.props.loopLoan.get_baseinfo();
    }

    resetCalculateTimer = () => {
        clearTimeout(this._$_timer)

        this._$_timer = setTimeout(()=> {
            this.props.loopLoan.loan_calculate(this.state.value);
        }, 1000)

    }

    resetValidateTimer = () => {
        let {loopLoan} = this.props;
        clearTimeout(this._validate_timer);
        this._validate_timer = setTimeout(()=>{
            if(this.state.value > loopLoan.canBorrowAmt){
                Components.showToast("输入金额大于可借额度")
            }else if(this.state.value < loopLoan.minLoanAmt){
                Components.showToast("输入金额小于最低可借额度")
            }else if(!this.state.value){
                Components.showToast("请输入借款金额")
            }
        },1000)
    }

    validate = () => {
        let {loopLoan} = this.props;
        if(this.state.value > loopLoan.canBorrowAmt){
            this.resetValidateTimer();
        }else if(this.state.value < loopLoan.minLoanAmt){
            this.resetValidateTimer();
        }else if(!this.state.value){
            this.resetValidateTimer();
        }else if(this.state.value <= loopLoan.canBorrowAmt && this.state.value >= loopLoan.minLoanAmt){
            this.resetCalculateTimer();
        }
    }

    changeHandler = (e) => {
        let v = e.target.value;
        if(v.length > 5) return;
        this.setState({value:v}, this.validate);
        // v = Math.min(loopLoan.canBorrowAmt, v)
        // v = Math.max(loopLoan.minLoanAmt, v)



        // let {loopLoan} = this.props;
        // let v = e.target.value;
        // if (v.length <= 5) {
        //     this.setState({value: v})
        //
        //     if (v > loopLoan.canBorrowAmt) {
        //         this.setState({value: loopLoan.canBorrowAmt})
        //         // this.props.loopLoan.loan_calculate(this.state.value);
        //     } else if (v < loopLoan.minLoanAmt) {
        //         this.setState({value: loopLoan.minLoanAmt})
        //         // this.props.loopLoan.loan_calculate(this.state.value);
        //     } else if (this.state.value >= loopLoan.minLoanAmt && this.state.value <= loopLoan.canBorrowAmt) {
        //         // this.props.loopLoan.loan_calculate(v);
        //     }
        // }

    }

    smsValueHandler = (e) => {
        this.setState({smsValue:e.target.value})
    }

    checkHandler = () => {
        this.setState({checked: !this.state.checked})
    }

    detailShowHandler = () => {
        this.setState({mask1Show: true})
    }

    detailHideHandler = () => {
        this.setState({mask1Show: false})
    }

    popupHideHandler = () => {
        this.setState({mask3Show: false})
    }

    overdueShowHandler = () => {
        this.setState({mask2Show: true})
    }

    overdueHideHandler = () => {
        this.setState({mask2Show: false})
    }

    countingDown = () => {
        if (this.state.remain <= 1) window.clearInterval(this._timer);
        this.setState({remain: this.state.remain - 1});
    }

    tick = () => {
        this.setState({remain: 60});
        window.clearInterval(this._timer);
        this._timer = setInterval(this.countingDown, 1000);
    }

    componentWillUnmount() {
        clearInterval(this._timer);
    }

    getSMSCode = () => {
        if (this.state.remain <= 0) {
            this.tick();
            this.props.loopLoan.regetSMSCode();
        }
    }

    confirmHandler = () => {
        let {loopLoan} = this.props;
        if (!this.state.checked) {
            Components.showToast("请同意相关协议")
        } else if (this.state.value == '') {
            Components.showToast("请输入借款金额")
        } else if (this.state.value >= loopLoan.minLoanAmt && this.state.value <= loopLoan.canBorrowAmt) {
            this.props.loopLoan.loan_confirm(this.state.value).then(() => {
                this.setState({mask3Show: true});
                this.tick();
            }, e => {
                window.clearInterval(this._timer);
            });

        }
    }

    loanConfirmHandler = () => {
        if(this.state.smsValue.length>=4){
            this.props.loopLoan.check_loanStatus(this.state.smsValue).then(() => {
                this.props.history.push('/loan-youyi-result')
            }, (e) => {
                this.setState({mask3Show:false});
                Components.showToast(e.message)
            });
        }
    }

    render() {
        let {history, loopLoan} = this.props;
        let USER = Storage.getUserDict();
        let item_list = (item, index) => {
            return (
                <div styleName="item-list" key={index}><span styleName="item-left">{item.feeName}</span><span
                    styleName="item-right">{item.feeAmout}元</span></div>
            )
        };

        let validate_term = this.state.value >= loopLoan.minLoanAmt && this.state.value <= loopLoan.canBorrowAmt;

        return (
            <div styleName="cnt-container">
                <Header title="借钱" history={history} enable={'force'}/>
                <div styleName="loan-container">
                    <div styleName="loan-input-num">
                        <span styleName="input-title">借多少</span>
                        <input styleName="input-num" type="number" value={this.state.value}
                               placeholder={"最多可借" + loopLoan.canBorrowAmt + "元"} onChange={this.changeHandler}/>
                    </div>
                    <div styleName="loan-info-item">
                        <div styleName="loan-info-title">到账金额</div>
                        <div
                            styleName={validate_term ? "loan-info-right has-input" : "loan-info-right has-not-input"}>{validate_term ? loopLoan.accountInAmount : 0 }</div>
                    </div>
                    <div styleName="loan-info-item">
                        <div styleName="loan-info-title">应还金额</div>
                        <div
                            styleName={validate_term ? "loan-info-right has-input" : "loan-info-right has-not-input"}>{validate_term ? loopLoan.shouldRepaymentAmount : 0}</div>
                    </div>
                    <div styleName="loan-info-item">
                        <div styleName="loan-info-title">总利息{validate_term &&
                        <span styleName="tip" onClick={this.detailShowHandler}></span>}</div>
                        <div
                            styleName={validate_term ? "loan-info-right has-input" : "loan-info-right has-not-input"}>{validate_term ? loopLoan.totalFeeAmount : 0}</div>
                    </div>
                    <div styleName="overdue-tip">
                        请按时还款，避免<span styleName="overdue-btn" onClick={this.overdueShowHandler}>逾期费用</span>
                    </div>
                    <div styleName="loan-info-item">
                        <div styleName="loan-info-title">打款至</div>
                        <div styleName="loan-bank-info">{loopLoan.bankName}({loopLoan.bankCardNo.slice(-4)})<span
                            styleName="arrow"></span></div>
                    </div>
                </div>
                <div styleName="agreement-issue">
                    <div styleName={this.state.checked ? "checked-box" : "unchecked-box"}
                         onClick={this.checkHandler}></div>
                    <div styleName="check-item">同意<a href="/static/loan/products/index.html#/protocols/youyi-loan">《借款合同》</a>、<a
                        href="/static/loan/products/index.html#/protocols/youyi-loan-service">《借款服务协议》</a>，未按时还款将计入信用卡银行的信用报告
                    </div>
                </div>
                <div styleName="btn-container">
                    <div styleName="btn-tip">可提前还款或部分还款，免手续费</div>
                    <div
                        styleName={validate_term && this.state.checked ? "btn purple" : "btn gray"}
                        onClick={this.confirmHandler}>确定
                    </div>
                </div>
                {this.state.mask1Show && <div styleName="mask1">
                    <div styleName="detail-pop">
                        <div styleName="close-icon" onClick={this.detailHideHandler}></div>
                        <div styleName="item-title">借款费用详情</div>
                        <div styleName="item-wrap">
                            {loopLoan.feeAmoutExts.map(item_list)}
                        </div>
                        <div styleName="know-btn" onClick={this.detailHideHandler}>知道了</div>
                    </div>
                </div>}
                {this.state.mask2Show && <div styleName="mask2">
                    <div styleName="notice-pop">
                        <div styleName="notice-title">逾期费用说明</div>
                        <div styleName="close-icon" onClick={this.overdueHideHandler}></div>
                        <div styleName="notice-content">{loopLoan.latedescription}</div>
                        <div styleName="notice-btn" onClick={this.overdueHideHandler}>知道了</div>
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
                                       value={this.state.smsValue} placeholder="输入验证码" onChange={this.smsValueHandler}/>
                                <span styleName="btn-countdown" onClick={this.getSMSCode}>
                                {this.state.remain > 0 ? this.state.remain + 's' : '获取验证码'}</span>
                            </div>
                            <div styleName={this.state.smsValue.length >=4 ? "confirm-btn blue" : "confirm-btn gray"}
                                 onClick={this.loanConfirmHandler}>确定
                            </div>
                        </div>
                    </div>
                </div>}
            </div>
        )
    }
}

