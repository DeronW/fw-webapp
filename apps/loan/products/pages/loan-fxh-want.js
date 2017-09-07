
import React from 'react'
import CSSModules from 'react-css-modules'
import {observer, inject} from 'mobx-react'
import {Link} from 'react-router-dom'
import ProductDisplay from '../components/productDisplay'
import {Header} from '../../lib/components'
import {Browser, Post, NativeBridge} from '../../lib/helpers'

import {Utils, Components} from 'fw-javascripts'

import styles from '../css/loan-fxh-want.css'
@inject("fxh")
@observer
@CSSModules(styles, {
    "allowMultiple": true,
    "errorWhenNotFound": false
})
export default class FxhWant extends React.Component {

    state = {
        loanNum: Utils.hashQuery.sliderNum,
        creditLine: Utils.hashQuery.creditLine,
        // orioleOrderGid: Utils.hashQuery.orioleOrderGid,
        orderGid: null,
        loanGid: null,
        showToZH: false,
        failMsg: '',
        loanShow:false
    }
    componentDidMount() {
        document.title = "我要借款";
        let {fxh} = this.props;
        fxh.getBaseInfo();
        fxh.get_info();
    }

    changeHandler = e => {
    let inputNum = e.target.value;
    this.setState({ loanNum: inputNum });
    }

    loanHandler = () => {
        // let query = $FW.Format.urlQuery();
        // let loanNum = Utils.hashQuery.loanNum;
        // let orioleOrderGid = Utils.hashQuery.orioleOrderGid;
        let lowestLoan = Utils.hashQuery.lowestLoan;
        let n = parseInt(this.state.loanNum) || 0, {creditLine} = this.state, err;
        let {fxh} = this.props;


        if (n > creditLine){
            err = '不能输入大于可借额度';
            err && Components.showToast(err);
            return;
        }
        if (n % 100 != 0){
            err = '借款金额必须为100的整数倍';
            err && Components.showToast(err);
            return;
        }
        if (n < lowestLoan) {
            err = '借款金额必须大于等于' + lowestLoan;
            err && Components.showToast(err);
            return;
        }

        let format = x => Math.round(Math.max(lowestLoan, Math.min(x, creditLine)) / 100) * 100;

        //err && $FW.Component.Toast(err);
        this.setState({ loanNum: format(n) });


        // let cashBank = this.props.userBankList.withdrawBankcard;
        //
        // function isRealNameBindCard(ele) {
        //     return ele.isRealNameBindCard == true;
        // }
        // let filtered = cashBank.filter(isRealNameBindCard);
        // let user = $FW.Store.getUserDict();
        Post(`/api/loan/v1/apply.json`, {
                loanAmount: this.state.loanNum,
                orioleOrderGid: fxh.data.orioleOrderGid,
                productId: 1,
                withdrawCardGid: fxh.defaultCardGid
            }
        ).then((data) => {
            this.setState({ loanGid: data.loanGid, orderGid: data.orderGid });
            if (!err) {
                location.href = `/static/loan/products/index.html#/loan-fxh-confirm?loanNum=${this.state.loanNum}&orioleOrderGid=${this.state.orioleOrderGid}&withdrawCardGid=${fxh.defaultCardGid}&orderGid=${this.state.orderGid}`;
            }
        },(err) => {
            if (err.code == 24003 || err.code == 24005) return this.setState({loanShow: true, failMsg: err.message})
            Components.showToast(err.message);
        });
    }

    callbackHandler = () => {
        this.setState({loanShow:false})
    }

    render() {
        let {fxh,history}= this.props;
        // const USER = $FW.Store.getUserDict();
        let interest = fxh.baseRateDay * 100;
        let cashBank = fxh.cashBankList;

        // function isRealNameBindCard(ele) {
        //     return ele.isRealNameBindCard == true;
        // }
        // let filtered = cashBank.filter(isRealNameBindCard);

        return (
            <div>
                <Header title="我要借款" history = {history}/>
                {this.state.loanShow && <ProductDisplay callbackHandler={this.callbackHandler} errorMessage={this.state.failMsg} popTitle={"审核失败"}/>}
                <div styleName="loan-box">
                    <div styleName="loan-box-title">借款金额(元)</div>
                <input styleName="loan-num" type="number" name="number" value={this.state.loanNum} onChange={this.changeHandler} />
            <div styleName="horizonal-line"></div>
        <div styleName="loan-charge"><img styleName="icon" src={require("../images/loan-fxh-want/icon.png")}/>日综合费率<span>{fxh.baseRateDayStr}</span>，期限<span>{fxh.productPeriod}天</span></div>
                </div>
                <div styleName="withdraw-card">
                    <span styleName="withdraw-card-title">提现卡</span>
                <span styleName="withdraw-card-branch">{fxh.bankName}({fxh.bankNo})</span>
                </div>
                {/*<div className="withdraw-tip">审核通过之后，若在24小时之内未确认用钱，视为自动放弃。</div>*/}
                <div styleName="loan-btn-wrap">
                    <div styleName="loan-btn" onClick={this.loanHandler}>立即借款</div>
                </div>
                { this.state.showToZH &&
                    <div styleName="mask">
                        <div styleName="pop">
                            <span styleName="tip-1">审核失败</span>
                        <span styleName="tip-2">{this.state.failMsg}</span>
                    <Nav styleName="to-zhangzhong" href={`/static/loan/products/index.html#/`}>尝试其他借款</Nav>
                <img styleName="close-icon" src={require("../images/loan-fxh-want/close-icon.jpg")} onClick={() => {this.setState({showToZH: false})}}></img>
                        </div>
                    </div>
                }
            </div>
        )
    }
}
