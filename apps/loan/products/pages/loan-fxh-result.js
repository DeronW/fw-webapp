import React from 'react'
import CSSModules from 'react-css-modules'
import {observer, inject} from 'mobx-react'
import {Link} from 'react-router-dom'

import {Header} from '../../lib/components'
import {Browser, Post, NativeBridge, Storage} from '../../lib/helpers'

import {Utils, Components} from 'fw-javascripts'

import styles from '../css/loan-fxh-result.css'
@inject("fxh")
@observer
@CSSModules(styles, {
    "allowMultiple": true,
    "errorWhenNotFound": false
})
export default class FxhResult extends React.Component {
    state = {
        waitingResultShow: true,
        successResultShow: false,
        failResultShow: false,
        checkingResult: false,
        countdown: 0,
        loanStatus: null,
        failReason: null
    }

    componentDidMount() {
        document.title = "借款结果"
        let {fxh} = this.props;
        fxh.get_card_list();
        this.countingDown();
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }
    gotoHandler = link => {
        location.href = encodeURI(link);
    }
    countingDown = () => {
        this.setState({countdown: 56});
        this.checkAjax();

        this.timer = setInterval(() => {
            let c = this.state.countdown;
            if (c % 10 === 0)
                this.checkAjax();
            this.setState({
                countdown: c - 1
            });
            if (c <= 0)
                clearInterval(this.timer);
            }
        , 1000);
    }
    checkAjax = () => {
        let orderGid = Utils.hashQuery.orderGid;
        Post(`/api/loan/v1/status.json`, {orderGid: orderGid}).then((data) => {
            let finishFlag = true;
            if (data.loanStatus == 6) {
                this.setState({waitingResultShow: false, successResultShow: true});
                if(data.activityRecomUrl){
                        setTimeout(() => {
                            Browser.inApp ? NativeBridge.goto(`${data.activityRecomUrl}`,false,"放心花"):
                            location.href  = `${data.activityRecomUrl}`;
                        },2000)
                    }
                // setTimeout(() => {
                //     Browser.inApp ? NativeBridge.goto(`https://m.easyloan888.com/static/loan/features/index.html#/invite-activity?yqm=F172001`,false,"放心花"):
                //     location.href  = `/static/loan/features/index.html#/invite-activity?yqm=F172001`;
                // }, 12000)
            } else if (data.loanStatus == 5) {
                this.setState({waitingResultShow: false, failResultShow: true, failReason: data.failReason});
            } else {
                finishFlag = false
            }

            if (this.state.countdown <= 0) {
                if (data.loanStatus == 6) {
                    this.setState({waitingResultShow: false, successResultShow: true});

                } else if (data.loanStatus == 5) {
                    this.setState({waitingResultShow: false, failResultShow: true, failReason: data.failReason});
                } else if (data.loanStatus == 4) {
                    this.setState({waitingResultShow: false, checkingResult: true});
                } else {
                    finishFlag = false
                }
            }
            if (finishFlag)
                clearInterval(this.timer);
            }
        , (err) => {
            Components.showToast(err.message)
        });

    }

    copyHandler = () => {
        NativeBridge.trigger("clipboard", "fxhuaba");
    }
    clickHandler = () => {
        location.href = '/static/loan/user-weixin-new-download/index.html';
    }
    render() {
        let {fxh, history} = this.props;
        let USER = Storage.getUserDict();
        let goBack = () => {
            Browser.inFXHApp
                ? NativeBridge.close()
                : location.href = '/static/loan/products/index.html#/'
        }
        let sourceType;
        let jrgc_ios = Browser.inIOSApp;
        let jrgc_android = Browser.inAndroidApp;
        let jrgc_weixin = Browser.inWeixin;
        let jrgc_wap = Browser.inMobile;
        let jrgc_web = !Browser.inMobile;

        if (jrgc_ios)
            sourceType = 1;
        if (jrgc_android)
            sourceType = 2;
        if (jrgc_wap)
            sourceType = 3;
        if (jrgc_weixin)
            sourceType = 4;
        if (jrgc_web)
            sourceType = 5;
        return (
            <div>
                {!Browser.inJRGCApp && <Header title = "借款结果" goBack = {goBack}/>}
                <div styleName="loan-result">
                    {/* {Browser.inAndroid && <div styleName="header">
                        <div styleName="arrow-left" onClick={() => {
                            Browser.inJRGCApp
                                ? NativeBridge.close()
                                : this.gotoHandler("/static/loan/products/index.html#/")
                        }}></div>
                        <div styleName="title">借款结果</div>
                    </div>
                    } */}
                    {/* {Browser.inAndroid && <Header title="借款结果" goBack={goBack}/>} */}
                    <div styleName={Browser.inIOS
                        ? "result-box-ios"
                        : "result-box"}>
                        <div styleName={this.state.waitingResultShow
                            ? "waiting-result-box"
                            : "waiting-result-box dis"}>
                            <div styleName="wrap-box">
                                <div styleName="success-icon"><img src={require("../images/loan-fxh-result/success-icon.png")}/></div>
                                <div styleName="loan-result1">
                                    <div styleName="icon1"></div>
                                    <div styleName="icon1-info">申请成功</div>
                                    <div styleName="line"></div>
                                    <div styleName="waiting-result">
                                        <div styleName="icon2"></div>
                                        <div styleName="icon2-info">预计{this.state.countdown > 0
                                                ? `${this.state.countdown}s`
                                                : '1s'}之后给您处理结果</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div styleName={this.state.checkingResult
                            ? "check-result-box"
                            : "check-result-box dis"}>
                            <div styleName="wrap-box">
                                <div styleName="success-icon"><img src={require("../images/loan-fxh-result/success-icon.png")}/></div>
                                <div styleName="loan-result2">
                                    <div styleName="icon1"></div>
                                    <div styleName="icon1-info">申请成功</div>
                                    <div styleName="line"></div>
                                    <div styleName="success-result-for-jrgc">
                                        <div styleName="icon3"></div>
                                        <div styleName="icon3-info">
                                            <div styleName="icon3-info-top">借款查询中</div>
                                            <div styleName="icon3-info-btm">一小时之内会打款至您的银行卡</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/*<div className="btn-wrap">
                            <div className="credit-btn" onClick={() => { $FW.Browser.inJRGCApp() ? NativeBridge.close() : this.gotoHandler('/static/loan/products/index.html#/') }}>返回</div>
                        </div>*/}
                        </div>
                        <div styleName={this.state.successResultShow
                            ? "success-result-box"
                            : "success-result-box dis"}>
                            <div styleName="wrap-box">
                                <div styleName="success-icon"><img src={require("../images/loan-fxh-result/success-icon.png")}/></div>
                                <div styleName="loan-result3">
                                    <div styleName="icon1"></div>
                                    <div styleName="icon1-info">申请成功</div>
                                    <div styleName="line"></div>
                                    <div styleName="success-result-for-other">
                                        <div styleName="icon3"></div>
                                        <div styleName="icon3-info">
                                            <div styleName="icon3-info-top">已打款至</div>
                                            <div styleName="icon3-info-btm">
                                                银行卡（{fxh.bankName}{fxh.bankNo}）
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/*<div className="btn-wrap">
                            <div className="credit-btn" onClick={() => {$FW.Browser.inJRGCApp()? NativeBridge.close(): this.gotoHandler('/static/loan/products/index.html#/')}}>返回</div>
                        </div>*/}
                            {!Browser.inJRGCApp && <div styleName="credit-btn" onClick={() => this.gotoHandler(`/api/credit/v1/creditlist.shtml?sourceType=${sourceType}&token=${USER.token}&uid=${USER.uid}`)}>
                                去提额
                            </div>}
                        </div>
                        <div styleName={this.state.failResultShow
                            ? "fail-result-box"
                            : "fail-result-box dis"}>
                            <div styleName="wrap-box">
                                <div styleName="fail-icon"><img src={require("../images/loan-fxh-result/fail-icon.png")}/></div>
                                <div styleName="loan-result4">
                                    <div styleName="icon4"></div>
                                    <div styleName="icon4-info">
                                        <div styleName="icon4-info-top">申请成功</div>
                                    </div>
                                    <div styleName="line2"></div>
                                    <div styleName="waiting-result">
                                        <div styleName="icon5"></div>
                                        <div styleName="icon5-info">借款失败</div>
                                        <div styleName="icon5-info-btm">{this.state.failReason}</div>
                                    </div>
                                </div>
                            </div>
                            <div styleName="btn-wrap">
                                <div styleName="credit-btn" onClick={() => {
                                    Browser.inJRGCApp
                                        ? NativeBridge.close()
                                        : this.gotoHandler('/static/loan/products/index.html#/')
                                }}>重新借款</div>
                            </div>
                        </div>
                        {/*<div className="weixin-attention">
                        <div className="weixin-attention-wrap">
                            <div>关注微信公众号fxhuaba<span className="copy-qr" onClick={this.copyHandler}>点击复制公众号</span></div>
                            <div>可获得更高借款额度，且随时查看还款计划</div>
                        </div>
                    </div>*/}
                    </div>
                    {Browser.inJRGCApp && <div styleName="new-weixin-attention">
                        <div styleName="attention-tip">关注放心花微信公众号或使用APP可获得更高借款额度，且随时查看还款计划。</div>
                        <a styleName="attention-btn copy-bg" onClick={this.copyHandler}>复制微信公众号</a>
                        <a styleName="attention-btn download-bg" onClick={this.clickHandler}>下载放心花APP</a>
                    </div>}
                    <div styleName="customer-service">
                        <div styleName="service-wrap"><img src={require("../images/loan-fxh-result/phone.png")}/>如有问题请致电：<a href="tel:400-102-0066">400-102-0066</a>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}
