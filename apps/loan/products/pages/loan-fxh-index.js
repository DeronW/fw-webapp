import React from 'react'
import {render} from 'react-dom'
import { Redirect, Link } from 'react-router-dom'
import CSSModules from 'react-css-modules'
import styles from '../css/loan-fxh-index.css'
import { observer, inject } from 'mobx-react'
import Slider from '../components/slider'
import { Header } from '../../lib/components'

@inject('fxh') @observer @CSSModules(styles, { "allowMultiple": true, "errorWhenNotFound": false })
export default class FxhIndex extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            popShow:false,
            start:0,
            end:580,
            defaultValue:580,
            loanNum:0
        }
    }
    componentDidMount() {
        let { fxh } = this.props;
        document.title = '放心花'
        fxh.getBaseInfo();
    }

    getBorrowBtn = () => {
        let { fxh } = this.props;
        let btn = '--', st = fxh.borrowBtnStatus;

        let unavailable_loan =
            <div styleName="unavailable-loan">
                <div styleName="max-loan-money money-empty">暂无额度</div>
                <div styleName="max-loan-title">
                    <img src={require("../images/fxh/warn.png")} />
                    仅支持{fxh.data.lowestLoan}元以上借款，快去<a styleName="credit-improvement-tip">提额</a>吧！
                </div>
            </div>;

        btn = st === 2 || st === 3 ?
            unavailable_loan :
            available_loan;

        return btn
    }

    getBtnStatus = () => {
        let { fxh } = this.props;
        let btn = '--', st = fxh.data.borrowBtnStatus;

        let link;
        if (st == 1) link = '/static/loan/user-card-set/index.html';
        if (st == 2) link = `/api/credit/v1/creditlist.shtml?sourceType=${SOURCE_TYPE}&token=${USER.token}&uid=${USER.uid}`;

        let loanBtnClick = () => {
            st === 101 ?
                $FW.Component.Toast('设置提现卡申请处理中，请稍等') :
                gotoHandler(link)
        }
        let loan_btn = <div styleName="loan-btn" onClick={loanBtnClick}>申请借款</div>;

        let credit_btn_handler = () => {
            if(st == 1){
                this.setState({popShow:true});
            }
        }

        // let credit_btn =
        //     <a styleName="loan-btn" href={$FW.Browser.inJRGCApp() && st == 3 ? `/static/loan/user-weixin-new-download/index.html` : `/api/credit/v1/creditlist.shtml?sourceType=${SOURCE_TYPE}&token=${USER.token}&uid=${USER.uid}`}>
        //         我要提额
        //     </a>;


        let credit_btn =
            <a styleName="loan-btn" onClick={credit_btn_handler()}>
                我要提额
            </a>;

        let btn_list =
            <div styleName="credit-btn">
                <a styleName="credit-improvement-btn">
                    我要提额
                </a>
                <a styleName="credit-apply-btn">
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
    render(){
        let { fxh } = this.props;
        return (
            <div styleName="apply-loan">
                <Header title="放心花" history={history}/>
                <div styleName="loan-num-wrap">

                </div>
                <div styleName="loan-info">
                    <div styleName="slider-wrap">
                        <Slider canBorrowAmount={fxh.data.canBorrowAmount} lowestLoan={fxh.data.lowestLoan} start={this.state.start} end={this.state.end} defaultValue={this.state.defaultValue}/>
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
                {fxh.data.redirectType == 1 ? <div styleName="loan-tip">额度为0别灰心，试试其他<span>借款</span></div> : <div styleName="loan-tip">完善授权信息可减免手续费</div>}
                {this.state.popShow && <div styleName="pop-bg">
                    <div styleName="pop-panel">
                        <div styleName="pop-title">提示</div>
                        <div styleName="pop-content">为方便您快速借到钱，推荐您尝试申请其他借款产品</div>
                        <a styleName="pop-cancel" href={`/api/credit/v1/creditlist.shtml?sourceType=${SOURCE_TYPE}&token=${USER.token}&uid=${USER.uid}`}>仍去提额</a>
                        <a styleName="pop-confirm" href='/static/loan/dumiao/index.html'>尝试其他</a>
                    </div>
                </div>}
            </div>
        )
    }
}




