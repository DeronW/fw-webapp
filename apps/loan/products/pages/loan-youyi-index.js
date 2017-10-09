import React from 'react'
import CSSModules from 'react-css-modules'
import { observer, inject } from 'mobx-react'
import { Components } from 'fw-javascripts'
import { Header, showBlueAlert} from '../../lib/components'
import styles from '../css/loan-youyi-index.css'
import { NativeBridge, Browser } from '../../lib/helpers'

function gotoHandler(link, need_login, next_title, special_webview) {
    if (link.indexOf('://') < 0) link = location.protocol + '//' + location.hostname + link;
    if (Browser.inFXHApp) {
        NativeBridge.goto(link, need_login, next_title, special_webview);
    } else {
        location.href = link;
    }
}

@inject('loopLoan')
@observer
@CSSModules(styles, { "allowMultiple": true, "errorWhenNotFound": false })
export default class LoopLoan extends React.Component {
    state = {
        show: false,
        questionShow: false,
        message:null
    }

    componentDidMount() {
        let { loopLoan } = this.props;
        document.title = '优易借';
        NativeBridge.hide_header();
        loopLoan.get_baseinfo().catch((e) => {
            // if (loopLoan.errCode == 20005 ||
            //     loopLoan.errCode == 20009 ||
            //     loopLoan.errCode == 20013) {
            //     this.setState({ show: true })
            // } else {
            //     Components.showToast(loopLoan.errMsg)
            // }
            if ([20005, 20009, 20013].indexOf(e.code) > -1) {
                this.setState({ show: true, message:e.message })
            } else {
                Components.showToast(e.message)
            }
        });
    }

    clickHandler = () => {
        let { loopLoan, history } = this.props;
        if (loopLoan.userStatus == 0) {
            history.push('/loan-youyi-card')
        } else if (loopLoan.userStatus == 1) {
            gotoHandler(loopLoan.url, false, "芝麻信用授权", false)
        } else if (loopLoan.userStatus == 2 && loopLoan.canBorrowAmt >= loopLoan.minLoanAmt) {
            history.push('/loan-youyi-form')
        } else if (loopLoan.userStatus == 2 && loopLoan.canBorrowAmt < loopLoan.minLoanAmt) {
            Browser.inFXHApp ? NativeBridge.close() : history.push('/')
        }
        if (loopLoan.errMsg) {
            Browser.inFXHApp ? NativeBridge.close() : history.push('/')
        }
    }

    questionShowHandler = () => {
        this.setState({ questionShow: true });
    }

    questionCloseHandler = () => {
        this.setState({ questionShow: false });
    }

    closeHandler = () => {
        let { history } = this.props;
        Browser.inFXHApp ? NativeBridge.close() : history.push('/')
    }

    render() {
        let { loopLoan } = this.props;
        let btn_title;
        if (loopLoan.userStatus == 0) {
            btn_title = '去借款'
        } else if (loopLoan.userStatus == 1) {
            btn_title = '去认证'
        } else if (loopLoan.userStatus == 2 && loopLoan.canBorrowAmt >= loopLoan.minLoanAmt) {
            btn_title = '去借款'
        } else if (loopLoan.userStatus == 2 && loopLoan.canBorrowAmt < loopLoan.minLoanAmt) {
            btn_title = '尝试其他借款'
        } else {
            btn_title = '尝试其他借款'
        }

        if (loopLoan.errMsg) btn_title = '尝试其他借款'

        let goBack = () => {
            Browser.inFXHApp ? NativeBridge.close() : location.href = '/static/loan/products/index.html#/'
        }

        return (
            <div styleName="cnt-container">
                <Header title="优易借" goBack={goBack} />
                <div styleName="loan-box">
                    <div styleName="available-loan-num">{loopLoan.canBorrowAmt}</div>
                    <div styleName="loan-title">{loopLoan.userStatus < 2 ? "最高" : ""}可借额度(元)</div>
                    <div styleName="loan-tip"><span styleName="icon"></span>{loopLoan.productDesc}</div>
                </div>
                <div styleName="loan-info-container">
                    <div styleName="loan-info">
                        <div styleName="loan-info-left">
                            <div styleName="loan-info-num">{loopLoan.userStatus < 2 ? "---" : loopLoan.creditLine}</div>
                            <div styleName="loan-info-title">总额度(元){loopLoan.userStatus == 2 && loopLoan.creditLine == 0 && <span styleName="tip" onClick={this.questionShowHandler}></span>}</div>
                        </div>
                        <div styleName="loan-info-right">
                            <div styleName="loan-info-num">{loopLoan.period}<span>天</span></div>
                            <div styleName="loan-info-title">借款期限</div>
                        </div>
                    </div>
                    <div styleName="vertical-line"></div>
                </div>
                <div styleName="btn-container">
                    {loopLoan.userStatus == 2 && loopLoan.canBorrowAmt < loopLoan.minLoanAmt && <div styleName="btn-tip">最低{loopLoan.minLoanAmt}元起借</div>}
                    {loopLoan.userStatus == 1 && <div styleName="btn-tip">借款前请先完成芝麻信用分认证</div>}
                    <div styleName="btn" onClick={this.clickHandler}>{btn_title}</div>
                </div>
                {this.state.show && <div styleName="mask">
                    <div styleName="popup">
                        <div styleName="popup-tip">{this.state.message}</div>
                        <div styleName="popup-btn" onClick={this.closeHandler}>知道了</div>
                    </div>
                </div>}
                {this.state.questionShow && <div styleName="mask">
                    <div styleName="popup">
                        <div styleName="popup-tip">您当前不符合借款标准，请尝试其他借款产品</div>
                        <div styleName="popup-btn" onClick={this.questionCloseHandler}>知道了</div>
                    </div>
                </div>}
            </div>
        )

    }
}
