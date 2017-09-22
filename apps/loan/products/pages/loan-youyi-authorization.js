import React from 'react'
import CSSModules from 'react-css-modules'
import { observer, inject } from 'mobx-react'
import { Utils } from 'fw-javascripts'
import { Header } from '../../lib/components'
import { NativeBridge, Browser } from '../../lib/helpers'
import styles from '../css/loan-youyi-authorization.css'

@inject('loopLoan')
@observer
@CSSModules(styles, { "allowMultiple": true, "errorWhenNotFound": false })
export default class LoopLoanAuthorization extends React.Component {

    constructor(props) {
        super(props)
        let q = Utils.hashQuery;
        this.state = {
            params: encodeURIComponent(q.params),
            sign: encodeURIComponent(q.sign),
            authFail:false
        }
    }
    componentDidMount() {
        document.title = '芝麻信用授权';
        this.props.loopLoan.zima_callback(this.state.params, this.state.sign).catch((e) => {
            this.setState({authFail:true})
            return new Promise((resolve,reject) => setTimeout(resolve,2000))
        }).then(()=>{
            Browser.inFXHApp ? NativeBridge.close() : location.href = '/static/loan/products/index.html#/loan-youyi-index'
        });
    }

    confirmHandler = () => {
        Browser.inFXHApp ? NativeBridge.close() : location.href = '/static/loan/products/index.html#/loan-youyi-index'
    }

    render() {
        let { history, loopLoan } = this.props;
        return (
            <div styleName="cnt-container">
                {!Browser.inFXHApp && <Header title="芝麻信用授权" history={history} />}
                <div styleName="result">
                    {loopLoan.zmScore && <div><div styleName="success">
                        <div styleName="title">授权成功</div>
                        <div styleName="img"><img styleName="auth-img" src={require("../images/loan-youyi-authorization/success.png")} /></div>
                    </div>
                        <div styleName="btn" onClick={this.confirmHandler}>确定</div>
                    </div>}
                    {this.state.authFail && <div styleName="fail">
                        <div styleName="transition-title">页面正在跳转，请稍等</div>
                        <div styleName="img"><img styleName="auth-img" src={require("../images/loan-youyi-authorization/transition.png")} /></div>
                    </div>}
                </div>
            </div>
        )
    }
}

