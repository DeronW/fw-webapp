import React from 'react'
import CSSModules from 'react-css-modules'
import { observer, inject } from 'mobx-react'
import { Header } from '../../lib/components'
import styles from '../css/loop-loan.css'
import {NativeBridge, Browser} from '../../lib/helpers'

function gotoHandler(link, need_login, next_title) {
    if (Browser.inFXHApp) return NativeBridge.goto(link, need_login, next_title);
    if (link.indexOf('://') < 0)
        link = location.protocol + '//' + location.hostname + link;
        location.href = link;
}

@inject('loopLoan')
@observer
@CSSModules(styles,{ "allowMultiple": true, "errorWhenNotFound": false })
export default class LoopLoan extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            show:false
        }
    }

    componentDidMount(){
        document.title = '优易借';
        this.props.loopLoan.get_baseinfo();
    }

    clickHandler = () => {
        let { loopLoan, history } = this.props;
        if(loopLoan.userStatus == 0){
            history.push('/loop-loan-card')
        }else if(loopLoan.userStatus == 1){
            gotoHandler(loopLoan.url,false,"芝麻信用授权")
        }else if(loopLoan.userStatus == 2 && loopLoan.canBorrowAmt >= 500 ){
            history.push('/loop-loan-loan')
        }else if(loopLoan.userStatus == 2 && loopLoan.canBorrowAmt < 500){
            history.push('/home')
        }
    }

    showHandler = () => {
        this.setState({show:true});
    }

    closeHandler = () => {
        this.setState({show:false});
    }

    render(){
        let { history, loopLoan } = this.props;
        let btn_title;
        if(loopLoan.userStatus == 0){
            btn_title = '去借款'
        }else if(loopLoan.userStatus == 1){
            btn_title = '去认证'
        }else if(loopLoan.userStatus == 2 && loopLoan.canBorrowAmt >= 500){
            btn_title = '去借款'
        }else if(loopLoan.userStatus == 2 && loopLoan.canBorrowAmt < 500){
            btn_title = '尝试其他借款'
        }else{
            btn_title = '尝试其他借款'
        }

        return (
            <div styleName="cnt-container">
                <Header title="优易借" history={history} />
                <div styleName="loan-box">
                    <div styleName="available-loan-num">{loopLoan.canBorrowAmt}</div>
                    <div styleName="loan-title">可借额度(元)</div>
                    <div styleName="loan-tip"><span styleName="icon"></span>{loopLoan.productDesc}</div>
                </div>
                <div styleName="loan-info-container">
                    <div styleName="loan-info">
                        <div styleName="loan-info-left">
                            <div styleName="loan-info-num">{loopLoan.creditLine}</div>
                            <div styleName="loan-info-title">总额度(元){loopLoan.userStatus == 2 && loopLoan.creditLine == 0 && <span styleName="tip" onClick={this.showHandler}></span>}</div>
                        </div>
                        <div styleName="loan-info-right">
                            <div styleName="loan-info-num">{loopLoan.period}天</div>
                            <div styleName="loan-info-title">借款期限</div>
                        </div>
                    </div>
                    <div styleName="vertical-line"></div>
                </div>
                <div styleName="btn-container">
                    {LoopLoan.userStatus == 2 && loopLoan.canBorrowAmt < 500 && <div styleName="btn-tip">最低500元起借</div>}
                    <div styleName="btn" onClick={this.clickHandler}>{btn_title}</div>
                </div>
                {this.state.show && <div styleName="mask">
                    <div styleName="popup">
                        <div styleName="popup-tip">您离成功借钱只差一步请先完成必填认证！</div>
                        <div styleName="popup-btn" onClick={this.closeHandler}>知道了</div>
                    </div>
                </div>}
            </div>
       )

    }
}
