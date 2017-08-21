import React from 'react'
import CSSModules from 'react-css-modules'
import { observer, inject } from 'mobx-react'
import { Header } from '../../lib/components'
import { Components } from 'fw-javascripts'
import { Post, Browser, NativeBridge } from '../../lib/helpers'

import styles from '../css/bank-card-verify.css'

@inject('bank_card')
@observer
@CSSModules(styles, { "allowMultiple": true, "errorWhenNotFound": false })
class BankCardVerify extends React.Component {

    state = {
        code: '',
        count: 0,
        result: null,
        result_reason: '',
        show_result: false
    }

    componentDidMount() {
        this.getSMSCode()
    }

    componentWillUnmount() {
        clearInterval(this._timer)
    }

    startCounting = () => {
        this.setState({ count: 60 })
        this._timer = setInterval(() => {
            if (this.state.count <= 1) clearInterval(this._timer)
            this.setState({ count: this.state.count - 1 })
        }, 1000)
    }

    getSMSCode = () => {
        if (this.state.count > 0) return;

        Post('/api/bankcard/v1/resendverifycode.json', {
            operatorBankcardGid: this.props.bank_card.new_card.operatorBankcardGid
        }).then(() => {
            this.startCounting()
        }, e => {
            Components.showToast(e.message);
        });
    }

    changeHandler = e => {
        if(e.target.value.length <=4){
            this.setState({ code:e.target.value })
        }
    }

    submitHandler = () => {
        let { code } = this.state;
        let {history} = this.props;

        if (code.length < 4)
            return Components.showToast('验证码不能小于4位')

        // 开始转圈, 转到有最终结果位置
        Components.showLoading(null, false)

        Post('/api/bankcard/v1/commitverifycode.json', {
            operatorBankcardGid: this.props.bank_card.new_card.operatorBankcardGid,
            verifyCode: code
        }, true, false).then(this.fetchResult);
    }

    fetchResult = () => {
        Post('/api/bankcard/v1/status.json', {
            operatorBankcardGid: this.props.bank_card.new_card.operatorBankcardGid
        }, true, false).then(data => {
            let d = data.bindStatus;
            this.checkResult(d.status, d.transCode);
        });
    }

    checkResult(result, transCode) {
        let {history} = this.props;
        let should_hide_loading = true;

        if (result == 0) {
            console.log(111);
            if (transCode == 1001) {
                Components.showToast("验证码不正确");
            } else {
                // this.setState({ result: 0 })
                console.log(222);
                history.push('/bank-card');
                console.log(333);
            }
        } else if (result == 1) {
            Browser.inJRGCApp() ?
                NativeBridge.close() :
                // window.location.href = '/static/loan/products/index.html#/';
                window.location.href = '/static/loan/account/index.html#/repayment-records';
        } else if (result == 2) {
            this.setState({ result: 2, result_reason: '' })
        } else {
            // 又开始转圈
            // Components.showLoading(null, false)
            setTimeout(this.fetchResult, 2000)
            should_hide_loading = false
        }

        if (should_hide_loading) Components.hideLoading()
    }

    render() {
        let { history, bank_card } = this.props
        let { code, count, result, result_reason, show_result } = this.state

        let pop_result = () => {
            if (result === null || !show_result) return;

            return <div styleName="result">
                <div styleName="result-panel">
                    <div styleName="result-title">
                        {result === 0 && '请求正在处理中，请稍等'}
                        {result === 2 && '设置提现卡失败'}
                    </div>
                    <div styleName="result-reason">{result === 2 && result_reason}
                    </div>
                    <div styleName="result-btn" onClick={
                        () => this.setState({ show_result: false })}>确定</div>
                </div>
            </div>
        }

        return <div>
            <Header title="验证手机号" history={history} />

            <div styleName="tips">验证码已发送到尾号
                <span>{bank_card.new_card.phone.substr(-4)}</span>
                的手机上</div>

            <div styleName="field">
                验证码 <input placeholder="请输入验证码" value={code} onChange={this.changeHandler} />
                <a styleName="btn-sms-code" onClick={this.getSMSCode}>{count ? `${count}s` : '重新获取'}</a>
            </div>

            {pop_result()}

            <a styleName="btn-submit" onClick={this.submitHandler}>确定</a>
        </div>
    }
}

export default BankCardVerify