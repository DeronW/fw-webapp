import React from 'react'
import ReactDOM from 'react-dom'
import CSSModules from 'react-css-modules'
import styles from '../css/index.css'
import { observer, inject } from 'mobx-react'
import { Redirect } from 'react-router'
import BankAccount from './bank-account.js'

import * as $FWC from 'fw-components'

@inject("cash") @observer @CSSModules(styles,{"allowMultiple":true,"errorWhenNotFound": false})
export default class Cash extends React.Component {
    static onEnter() {
        document.title = "提现";
    }
    constructor(props){
        super(props);
        this.state = {
            title:"提现",
            selectBank:false,
            inputVal:"",
            // accountAmount:"",
            minAmt:"",
            criticalValue:"",
            accountAmountVal:"this.props.cash.accountAmount",
            selectWhich:"",
            selectCashMethod: true,
            perDayRealTimeAmountLimit:"",
            doTime:"",
            // noticeText:[],
            data:{}
        }
        this.takeAll = this.takeAll.bind(this);
        this.chooseBank = this.chooseBank.bind(this);
        this.getSelectBankInfo = this.getSelectBankInfo.bind(this);
        this.getOpenBankShow = this.getOpenBankShow.bind(this);
        this.handlerPost = this.handlerPost.bind(this);
        this.handlerImmediatelyCashMethod = this.handlerImmediatelyCashMethod.bind(this);
        this.handlerBlockTradeCashMethod = this.handlerBlockTradeCashMethod.bind(this);
    }
    takeAll(){
        this.setState({inputVal:this.state.accountAmount});
    }
    chooseBank(){
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
        this.setState({ selectBank: true });
    }
    // 是否显示开户支行
   getSelectBankInfo(hide, bankInfo) {
        this.setState({
            selectBank: hide,
            selectBankName: bankInfo.bankName,
            selectBankId: bankInfo.bankNo
        });
    }
    getOpenBankShow(booleanVal) {
        this.setState({
            selectBank: booleanVal
        });
    }
    // 点击实时提现
    handlerImmediatelyCashMethod (b) {
        if (b) {
            this.setState({
                selectWhich: 0,
                selectCashMethod: !this.state.selectCashMethod
            })
        }
    }
    // 点击大额提现
    handlerBlockTradeCashMethod (b) {
        if (b) {
            this.setState({
                selectWhich: 1,
                selectCashMethod: !this.state.selectCashMethod
            })
        }
    }
    // 点击下一步的时候做的一些验证以及toast提示
    handlerPost(){
        (this.state.data);
        if(this.state.inputVal<this.state.minAmt){
            $FWC.showToast("提现金额不能低于10元");
            return false;
        }
        if (this.state.selectWhich == 1) {
            if (this.state.selectBankName === null) {
                $FWC.showToast("请选择开户支行");
                return false;
            }
        }
        if (this.state.selectWhich == 0) {
            if (this.state.inputVal > this.state.criticalValue * 10000) {

                $FWC.showToast("您实时提现单笔已超过" + this.state.criticalValue + "万限制，请使用大额提现！");
                return false;
            }
        }


    }

    componentDidMount(){
        let {cash} = this.props;
        cash.takData().then(() => {
            this.setState({
                accountAmount:cash.accountAmount,
                data:cash.bankInfo,
                minAmt:cash.minAmt,
                selectWhich:cash.isCompanyAgent ? 1 : 0,
                criticalValue:cash.criticalValue,
                perDayRealTimeAmountLimit:cash.perDayRealTimeAmountLimit,
                doTime:cash.doTime,
            })
        })
    }

    render(){

        let immediatelyCashMethodEml = (b) => {
            var valText = this.state.perDayRealTimeAmountLimit;
            return <div styleName="info-list">
                <div styleName="info-select-btn">
                    <span onClick={() => this.handlerImmediatelyCashMethod(b)} styleName={
                        "select-icon " + (this.state.selectWhich == 0 || !b ? "select-icon select-btn" : "")
                    } >
                    </span>
                </div>
                <div styleName="info-text">
                    <div styleName="subhead-text"> 实时提现 </div>
                    <div styleName="detail-text">
                        单笔金额&le;{this.state.criticalValue}万，
                        {this.state.perDayRealTimeAmountLimit && "单日" + "≥" + valText + "万，"}
                        7*24小时实时到账
                    </div>
                </div>
            </div>
        };

        let blockTradeCashMethodEml = (b) => {
            return <div styleName="info-list">
                <div stylesName="info-select-btn">
                    <span
                        onClick={() => this.handlerBlockTradeCashMethod(b)}
                        styleName={
                            "select-icon " + (this.state.selectWhich == 1 || !b ? "select-icon select-btn" : "")
                        }
                    >
                    </span>
                </div>
                <div styleName="info-text">
                    <div styleName="subhead-text"> 大额提现 </div>
                    <div styleName="detail-text">
                        工作日{this.state.doTime}受理，最快30分钟之内到账。
                    </div>
                </div>
            </div>
        }

        // TODO  因为不确定判断逻辑，所以先注释掉
        //  let drawBlock = () => {
        //     if (this.state.data.isCompanyAgent || this.state.data.isSpecial) {
        //         return immediatelyCashMethodEml(true);
        //         //return blockTradeCashMethodEml(false);
        //     } else if (this.state.data.bankName == undefined || this.state.data.bankName == "") {
        //         return immediatelyCashMethodEml(true);
        //     } else {
        //         //return <div>{immediatelyCashMethodEml(true)} {blockTradeCashMethodEml(true)}</div>
        //         return <div>{immediatelyCashMethodEml(true)}</div>;
        //     }
        // }




        return <div>
            <div styleName="cash-wrapper">
                {/*头部*/}
                <div styleName="head">
                    <div styleName="return-btn">
                        <img styleName="back-icon" src={require('../images/back.png')}  alt="" />
                    </div>
                    <div styleName="title" >{this.state.title}</div>
                    <a styleName="to-cash-records" href="#/cash-records">提现记录</a>
                </div>
               {/*内容*/}
                <div styleName="content">
                     {/*卡号信息*/}
                    <div styleName="bank-info">
                        {/*左边银行logo*/}
                        <div styleName="bank-logo">
                            {/*<img styleName="logo" src={require("../images/ico-zhaoshang.jpg")} alt=""/>*/}
                            <img styleName="logo" src={this.state.data.bankLogo} alt=""/>
                        </div>
                        {/*中间银卡号信息*/}
                        <div styleName="bank-detail">
                            <div styleName="bank-name">{this.state.data.bankName}</div>
                            <div styleName="bank-num">{this.state.data.bankCardNo}</div>
                        </div>
                        {/*右边快捷logo*/}
                        <div styleName="fast-payment">
                            <img src={require('../images/ico-kuaijie.png')} alt=""/>
                        </div>
                    </div>
                    {/*绑定卡温馨小提示*/}
                    <div styleName="notice">
                        <div styleName="text">如果您绑定的银行卡暂不支持手机快捷支付请联系客服<a href="tel:400-0322-988" styleName="call-num">400-0322-988</a>
                        </div>
                    </div>
                    {/*可提现金金额*/}
                    <div styleName="aviliable-money">
                        <span styleName="plain-text">可提现金额(元)：<b styleName="amount">{this.state.accountAmount}</b></span>
                    </div>
                    {/*提现输入框*/}
                    <div styleName="money-cover">
                        {/*提现*/}
                        <div styleName="sub-cover">
                            <div styleName="input-side">
                                <input type="text" styleName="input-money" placeholder="请输入提现金额" value={this.state.inputVal}/>
                            </div>
                            <div styleName="click-side">
                                <span styleName="draw-money" onClick={this.takeAll}>全提</span>
                            </div>
                        </div>
                        {/*选择开户支行*/}
                       {this.state.selectWhich == 1 || (this.state.data.isCompanyAgent || this.state.data.isSpecial) ?
                           <div styleName="modify" onClick={this.chooseBank}>
                            <div styleName="wire"></div>
                            <div styleName="jump-side">
                                {this.state.selectBankName === null ? "开户支行" : this.state.selectBankName}
                            </div>
                            <div styleName="open-account-side">
                                <div styleName="account-text">请选择开户支行</div>
                            </div>
                        </div>:null}

                    </div>
                    {/*提现方式*/}
                    <div styleName="draw-money-method">
                        <div styleName="draw-title">提现方式</div>
                        <div styleName="draw-info">
                            {/*实时提现*/}
                            {/*<div styleName="info-list">
                                <div styleName="info-select-btn">
                                    <span styleName="select-icon"></span>
                                </div>
                                <div styleName="info-text">
                                    <div styleName="subhead-text">实时提现</div>
                                    <div styleName="detail-text">单笔金额，7*24小时实时到账。</div>
                                </div>
                            </div>*/}
                            {/*大额提现*/}
                            {/*<div styleName="info-list">
                                <div styleName="info-select-btn">
                                    <span styleName="select-btn"></span>
                                </div>
                                <div styleName="info-text">
                                    <div styleName="subhead-text">大额提现</div>
                                    <div styleName="detail-text">工作日9:00-19:00受理，最快30分钟之内到账。</div>
                                </div>
                            </div>*/}
                            {/*{drawBlock()}*/}
                            {immediatelyCashMethodEml(true)}
                            {blockTradeCashMethodEml(true)}
                        </div>
                    </div>
                    {/*下一步按钮*/}
                    <div styleName="next" onClick={this.handlerPost}>下一步</div>
                    {/*提现说明*/}
                    <div>
                        <div styleName="instruction-title">提现说明</div>
                        <div styleName="instruction-detail">
                            <div>
                                <img styleName="card-d" src={require("../images/card-d.png")} alt=""/>
                                <span styleName="text-line">单笔提现金额不低于10元，提现申请成功后不可撤回。</span>
                            </div>
                            <div>
                                <img styleName="card-d" src={require("../images/card-d.png")} alt=""/>
                                <span styleName="text-line">单笔提现金额不低于10元，提现申请成功后不可撤回。</span>
                            </div>
                            <div>
                                <img styleName="card-d" src={require("../images/card-d.png")} alt=""/>
                                <span styleName="text-line">单笔提现金额不低于10元，提现申请成功后不可撤回。</span>
                            </div>
                            <div>
                                <img styleName="card-d" src={require("../images/card-d.png")} alt=""/>
                                <span styleName="text-line">单笔提现金额不低于10元，提现申请成功后不可撤回。</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {this.state.selectBank && <BankAccount callbackSelectBankInfo={this.getSelectBankInfo} callbackOpenBank={this.getOpenBankShow}/>}
        </div>
    }
}