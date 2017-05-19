import React from 'react'
import CSSModules from 'react-css-modules'
import styles from '../css/index.css'
import { observer, inject } from 'mobx-react'
import { Redirect } from 'react-router'

import * as $FWC from 'fw-components'

@inject("cash") @observer @CSSModules(styles)
export default class Cash extends React.Component {
    static onEnter() {
        document.title = "提现";
    }

    state = {
        title:"提现",
        inputValue:""
    }

//    dataHandler(){
//      let data = this.props; 
//     console.log(this.props);
//     console.log(data);
//    }
   
   
    componentDidMount(){
        
    }
    // jumpToCashRecords = () =>{
    //     let hash=window.location.hash.slice(2);
    //     hash = "cash-records"
    // }
    render(){
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
                            <img styleName="logo" src={require("../images/ico-zhaoshang.jpg")} alt=""/>
                        </div>
                        {/*中间银卡号信息*/}
                        <div styleName="bank-detail">
                            <div styleName="bank-name">工商银行</div>
                            <div styleName="bank-num">123456789012345678</div>
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
                        <span styleName="plain-text">可提现金额(元)：<b styleName="amount">0</b></span>
                    </div>
                    {/*提现输入框*/}
                    <div styleName="money-cover">
                        {/*提现*/}
                        <div styleName="sub-cover">
                            <div styleName="input-side">
                                <input type="text" styleName="input-money" placeholder="请输入提现金额"/>
                            </div>
                            <div styleName="click-side">
                                <span styleName="draw-money">全提</span>
                            </div>
                        </div>
                        {/*选择开户支行*/}
                        <div styleName="modify">
                            <div styleName="wire"></div>
                            <div styleName="jump-side"></div>
                            <div styleName="open-account-side">
                                <div styleName="account-text">请选择开户支行</div>
                            </div>
                        </div>
                        
                    </div>
                    {/*提现方式*/}
                    <div styleName="draw-money-method">
                        <div styleName="draw-title">提现方式</div>
                        <div styleName="draw-info">
                            {/*实时提现*/}
                            <div styleName="info-list">
                                <div styleName="info-select-btn">
                                    <span styleName="select-icon"></span>
                                </div>
                                <div styleName="info-text">
                                    <div styleName="subhead-text">实时提现</div>
                                    <div styleName="detail-text">单笔金额，7*24小时实时到账。</div>
                                </div>
                            </div>
                            {/*大额提现*/}
                            <div styleName="info-list">
                                <div styleName="info-select-btn">
                                    <span styleName="select-btn"></span>
                                </div>
                                <div styleName="info-text">
                                    <div styleName="subhead-text">大额提现</div>
                                    <div styleName="detail-text">工作日9:00-19:00受理，最快30分钟之内到账。</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/*下一步按钮*/}
                    <div styleName="next">下一步</div>
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
        </div>
    }
}