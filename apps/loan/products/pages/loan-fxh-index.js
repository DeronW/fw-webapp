import React from 'react'
import {render} from 'react-dom'
import { Redirect, Link } from 'react-router-dom'
import CSSModules from 'react-css-modules'
import styles from '../css/loan-fxh-index.css'
import { observer, inject } from 'mobx-react'
import Slider from '../components/slider'
import ProductDisplay from '../components/productDisplay'
import { Header } from '../../lib/components'
import { Components } from 'fw-javascripts'
import { NativeBridge, Browser, Storage } from '../../lib/helpers'

function gotoHandler(link) {
    if (link.indexOf('://') < 0)
        link = location.protocol + '//' + location.hostname + link;
        location.href = link
}

@inject('fxh') @observer @CSSModules(styles, { "allowMultiple": true, "errorWhenNotFound": false })
export default class FxhIndex extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            popShow:false,
            start:0,
            end:580,
            defaultValue:580,
            loanNum:0,
            loanShow: false,
            improveShow: false
        }
    }
    componentDidMount() {
        let { fxh } = this.props;
        document.title = '放心花'
        fxh.getBaseInfo();
    }

    getBorrowBtn = () => {
        let { fxh } = this.props;
        let btn = '--', st = fxh.data.borrowBtnStatus;
        let user = Storage.getUserDict();
        let ua = window.navigator.userAgent,
            inWX = ua.indexOf('MicroMessenger') > -1,
            inApp = ua.indexOf('FinancialWorkshop') > -1,
            SOURCE_TYPE = inApp ? 3 : inWX ? 4 : 3;

        let link = `/api/credit/v1/creditlist.shtml?sourceType=${SOURCE_TYPE}&token=${user.token}&uid=${user.uid}`;

        let credit_btn_handler = () => {
            if (fxh.data.redirectType == 1) {
                this.setState({ improveShow: true });
            } else {
                gotoHandler(link)
            }
        }

        let unavailable_loan =
            <div styleName="unavailable-loan">
                <div styleName="max-loan-money money-empty">暂无额度</div>
                <div styleName="max-loan-title">
                    <img src={require("../images/loan-fxh-index/warn.png")} />
                    仅支持{fxh.data.lowestLoan}元以上借款，快去<a styleName="credit-improvement-tip" onClick={()=>credit_btn_handler()}>提额</a>吧！
                </div>
            </div>;

        btn = st === 2 || st === 3 ?
            unavailable_loan :
            null

        return btn
    }


    getMoneySlider = () => {
        let slider = '--', st = this.props.fxh.data.borrowBtnStatus;

        let no_slider_bar =
            <div className="no-slider-bar">
                <img src={require("../images/loan-fxh-index/no-slider-bar.jpg")} />
            </div>;

        slider = st === 2 || st === 3 ?
            no_slider_bar :
            null;

        return slider
    }

    getBtnStatus = () => {
        let { fxh } = this.props;
        let user = Storage.getUserDict();
        let btn = '--', st = fxh.data.borrowBtnStatus;
        let ua = window.navigator.userAgent;
        let inWX = ua.indexOf('MicroMessenger') > -1,
            inApp = ua.indexOf('FinancialWorkshop') > -1,
            SOURCE_TYPE = inApp ? 3 : inWX ? 4 : 3;
        let link;
        if (st == 1) link = '/static/loan/user-card-set/index.html';
        if (st == 2) link = `/api/credit/v1/creditlist.shtml?sourceType=${SOURCE_TYPE}&token=${user.token}&uid=${user.uid}`;

        let loanBtnClick = () => {
            st === 101 ?
                Components.showToast('设置提现卡申请处理中，请稍等') :
                gotoHandler(link)
        }
        let loan_btn = <div styleName="loan-btn" onClick={()=>loanBtnClick()}>申请借款</div>;

        let credit_btn_handler = () => {
            if (fxh.data.redirectType == 1) {
                this.setState({ improveShow: true });
            } else {
                gotoHandler(link)
            }
        }

        // let credit_btn =
        //     <a styleName="loan-btn" href={$FW.Browser.inJRGCApp() && st == 3 ? `/static/loan/user-weixin-new-download/index.html` : `/api/credit/v1/creditlist.shtml?sourceType=${SOURCE_TYPE}&token=${USER.token}&uid=${USER.uid}`}>
        //         我要提额
        //     </a>;

        let credit_btn =
            <a styleName="loan-btn" onClick={()=>credit_btn_handler()}>
                我要提额
            </a>;

        let btn_list =
            <div styleName="credit-btn">
                <a styleName="credit-improvement-btn" href={Browser.inJRGCApp && st == 5 ? `/static/loan/user-weixin-new-download/index.html` : `/api/credit/v1/creditlist.shtml?sourceType=${SOURCE_TYPE}&token=${user.token}&uid=${user.uid}`}>
                    我要提额
                </a>
                <a styleName="credit-apply-btn" href={`/static/loan/products/index.html#/loan-fxh-want?sliderNum=${this.props.fxh.sliderNum}`}>
                    申请借款</a>
            </div>;

        if (st === 1 || st === 101) btn = loan_btn;
        if (st === 2 || st === 3) btn = credit_btn;
        if (st === 5) btn = btn_list;

        return btn
    }

    getCreditLine = () => {
        let { fxh } = this.props;
        let line = '--', st = fxh.data.borrowBtnStatus;
        if (st === 5) line = fxh.data.creditLine;
        return line
    }

    popShowHandler = () => {
        this.setState({ loanShow: true })
    }

    callbackHandler = () => {
        this.setState({ loanShow: false, improveShow: false })
    }

    render(){
        let { fxh } = this.props;
        let goBack = () => {
            Browser.inFXHApp ? NativeBridge.close() : location.href = '/static/loan/products/index.html#/'
        }
        let user = Storage.getUserDict();
        let ua = window.navigator.userAgent,
            inWX = ua.indexOf('MicroMessenger') > -1,
            inApp = ua.indexOf('FinancialWorkshop') > -1,
            SOURCE_TYPE = inApp ? 3 : inWX ? 4 : 3;
        return (
            <div styleName="apply-loan">
                {this.state.loanShow && <ProductDisplay callbackHandler={this.callbackHandler} popTitle={"提示"} />}
                {this.state.improveShow && <ProductDisplay callbackHandler={this.callbackHandler} improve={true} popTitle={"提示"} />}
                <Header title="放心花" goBack={goBack} />
                <div styleName="loan-num-wrap">
                    {(fxh.data.borrowBtnStatus == 2 || fxh.data.borrowBtnStatus == 3) && this.getBorrowBtn()}
                </div>
                <div styleName="loan-info">
                    <div styleName="slider-wrap">
                        {fxh.data.borrowBtnStatus == 5 && <Slider canBorrowAmount={fxh.data.canBorrowAmount} lowestLoan={fxh.data.lowestLoan} start={this.state.start} end={this.state.end} defaultValue={this.state.defaultValue}/>}
                        {(fxh.data.borrowBtnStatus == 1 || fxh.data.borrowBtnStatus == 101) && <Slider canBorrowAmount={10000} lowestLoan={0} start={0} end={10000} defaultValue={10000}/>}
                        {(fxh.data.borrowBtnStatus == 2 || fxh.data.borrowBtnStatus == 3) && this.getMoneySlider()}
                    </div>
                    <div styleName="loan-info-items">
                        <div styleName="credit-lines">
                            <div styleName="credit-money">
                                <span styleName="credit-money-num">{this.getCreditLine()}</span>
                                <span styleName="credit-money-title">信用额度(元)</span>
                            </div>
                            <div styleName="loan-duration">
                                <span styleName="loan-duration-num">{fxh.data.productPeriod}</span>
                                <span styleName="loan-duration-title">借款期限(天)</span>
                            </div>
                        </div>
                        <span styleName="vertical-line"></span>
                    </div>
                </div>
                {this.getBtnStatus()}
                {fxh.data.redirectType == 1 ? <div styleName="loan-tip">额度为0别灰心，试试其他<span styleName="loan-word-tip loan-word-tip-color" onClick={this.popShowHandler}>借款</span></div> : <div styleName="loan-tip">完善授权信息可减免手续费</div>}
                {this.state.popShow && <div styleName="pop-bg">
                    <div styleName="pop-panel">
                        <div styleName="pop-title">提示</div>
                        <div styleName="pop-content">为方便您快速借到钱，推荐您尝试申请其他借款产品</div>
                        <a styleName="pop-cancel" href={`/api/credit/v1/creditlist.shtml?sourceType=${SOURCE_TYPE}&token=${user.token}&uid=${user.uid}`}>仍去提额</a>
                        <a styleName="pop-confirm" href='/static/loan/products/index.html#/'>尝试其他</a>
                    </div>
                </div>}
            </div>
        )
    }
}
