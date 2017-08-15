import React from 'react'
import { inject, observer } from 'mobx-react'
import CSSModules from 'react-css-modules'
import {  Utils } from 'fw-javascripts'

import { Header } from '../../lib/components'
import {Storage, Browser} from '../../lib/helpers'
import styles from '../css/repayment-fangxin-result.css'


@inject('repayment_fangxin')
@observer
@CSSModules(styles, { allowMultiple: true })
class RepaymentFangXinResult extends React.Component {

    componentDidMount() {
        let { history, repayment_fangxin } = this.props,
        { repaymentAmountNow, leftAmount, repaymentResult ,activityRecomUrl } = repayment_fangxin;
        document.title = '还款结果';
        this.props.repayment_fangxin.fetchRepaymentResult(Utils.hashQuery.id).then(() => {
            if(repayment_fangxin.status == 1){
                setTimeout(() => {
                    Browser.inApp ? NativeBridge.goto(`${activityRecomUrl}`,false,"放心花"):
                    // location.href  = `/static/loan/features/index.html#/invite-activity`;
                    location.href  = this.getRelativeUrl(`${activityRecomUrl}`);
                },2000)
            }
        });

    }
    getRelativeUrl (url){
　　　　 url = url.toString();
　　　　var arr = url.split("//");
　　　　return arr[1].substring(arr[1].indexOf("/"));
　　}
    render() {
        let { history, repayment_fangxin } = this.props,
        { repaymentAmountNow, leftAmount, repaymentResult ,activityRecomUrl } = repayment_fangxin,
        { loanGid } = repayment_fangxin.data;
        // let jump = () => {
        //     if(activityRecomUrl){
        //         setTimeout(() => {
        //             Browser.inApp ? NativeBridge.goto(`https://m.easyloan888.com/${this.state.activityRecomUrl}`,false,"放心花"):
        //             location.href  = `${this.state.activityRecomUrl}`;
        //         },2000)
        //     }
        // }
        let USER = Storage.getUserDict();

        let sourceType;
        let jrgc_ios = Browser.inIOSApp;
        let jrgc_android = Browser.inAndroidApp;
        let jrgc_weixin = Browser.inWeixin;
        let jrgc_wap = Browser.inMobile;
        let jrgc_web = !Browser.inMobile;

        if (jrgc_ios) sourceType = 1;
        if (jrgc_android) sourceType = 2;
        if (jrgc_wap) sourceType = 3;
        if (jrgc_weixin) sourceType = 4;
        if (jrgc_web) sourceType = 5;

        let fangxin_home_link = '/static/loan/fxh/index.html',
            repayment_fangxin_link = `/static/loan/account/index.html#/repayment-fangxin?id=${loanGid}`;

        let paidOff = <div>
            <div styleName="result-container success"></div>
            <div styleName="info">欢迎再次使用！
                <div styleName="infoMoney">还款金额： <span>{repaymentAmountNow}</span>元</div>
            </div>
            <a styleName="credit-btn" href={`/api/credit/v1/creditlist.shtml?sourceType=${sourceType}&token=${USER.token}&uid=${USER.uid}`}>
                    提升额度</a>
                <a styleName="apply-btn" href={fangxin_home_link}>申请用钱</a>
        </div>

        let stillLeft = <div>
            <div styleName="result-container success"></div>
            <div styleName="info">
                    还有 <span>{leftAmount}</span> 元未还，请记得准时还款！
                    <div styleName="infoMoney">还款金额： <span>{repaymentAmountNow}</span>元</div>
            </div>
            <a styleName="credit-btn" href={`/api/credit/v1/creditlist.shtml?sourceType=${sourceType}&token=${USER.token}&uid=${USER.uid}`}>
                    提升额度</a>
                <a styleName="apply-btn" href={fangxin_home_link}>申请用钱</a>
        </div>

        let fail = <div>
            <div styleName="result-container fail"> </div>
            <div styleName="info">请检查网络原因，本次还款失败</div>
            <div styleName="payback-customer-service"><img src={require("../images/repayment-fangxin-result/phone.png")} />如有问题，请致电<a href="tel:400-102-0066">400-102-0066</a></div>
            <a styleName="btn" href={repayment_fangxin_link}>查看订单</a>
        </div>

        let waiting = <div>
            <div styleName="result-container waiting"></div>
            <div styleName="info">
                <div styleName="payback-result-ing-tip">稍后可到账单页面<br />查看具体还款结果</div>
                <div styleName="payback-customer-service"><img src={require("../images/repayment-fangxin-result/phone.png")} />如有问题，请致电<a href="tel:400-102-0066">400-102-0066</a></div>
            </div>
            <a styleName="btn" href={repayment_fangxin_link}>查看订单</a>
        </div>

        return <div styleName="cnt-container">
            <Header title="还款结果" history={history} />

            { repaymentResult == 'success' && leftAmount == 0 && paidOff }
            { repaymentResult == 'success' && leftAmount != 0 && stillLeft }
            { repaymentResult == 'fail' && fail }
            { repaymentResult == 'waiting' && waiting }
        </div>
    }
}

export default RepaymentFangXinResult
