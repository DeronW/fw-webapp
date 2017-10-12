import React from 'react'
import CSSModules from 'react-css-modules'
import { observer, inject } from 'mobx-react'
import { Utils } from 'fw-javascripts'
import { Header } from '../../lib/components'
import { NativeBridge, Browser } from '../../lib/helpers'
import styles from '../css/loan-youyi-authlist.css'

@inject('loopLoan')
@observer
@CSSModules(styles, { "allowMultiple": true, "errorWhenNotFound": false })
export default class LoopLoanAuthlist extends React.Component {

    constructor(props) {
        super(props)
        
    }
    componentDidMount() {
        document.title = '必填信息';
      
    }

    render() {
        let { history, loopLoan } = this.props;

        let success =  <div styleName="auth-status"><img styleName="icon-img" src={require("../images/loan-youyi-authlist/auth-success.png")}/>已认证</div>;

        let ing = <div styleName="auth-status"><img styleName="icon-img" src={require("../images/loan-youyi-authlist/auth-ing.png")}/>认证中</div>;

        let fail = <div styleName="auth-status"><img styleName="icon-img" src={require("../images/loan-youyi-authlist/auth-fail.png")}/><span styleName="fail-color">未认证</span></div>;

        return (
            <div styleName="cnt-container">
                {!Browser.inFXHApp && <Header title="必填信息" history={history} />}
                <div styleName="auth-title">完成全部必填信息即可借款。</div>
                <div styleName="auth-list">
                    <div styleName="auth-box">
                        <div styleName="auth-item"><img styleName="icon-img" src={require("../images/loan-youyi-authlist/icon1.png")}/>身份认证</div>
                        {success}
                    </div>
                    <div styleName="auth-box">
                      <div styleName="auth-item"><img styleName="icon-img" src={require("../images/loan-youyi-authlist/icon2.png")}/>手机运营商认证</div>
                      {ing}
                    </div>
                    <div styleName="auth-box">
                      <div styleName="auth-item"><img styleName="icon-img" src={require("../images/loan-youyi-authlist/icon3.png")}/>芝麻信用分认证</div>
                      {fail}
                    </div>
                </div>
            </div>
        )
    }
}

