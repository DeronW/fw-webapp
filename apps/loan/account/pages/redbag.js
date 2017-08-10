import React from 'react'
import CSSModules from 'react-css-modules'
import {Link} from 'react-router-dom'
import {observer, inject} from 'mobx-react'
import {Header} from '../../lib/components'
import {Storage, NativeBridge, Browser} from '../../lib/helpers'
import styles from '../css/redbag.css'
import {Components, Utils} from 'fw-javascripts'

@inject('redbag')
@observer
@CSSModules(styles, {"allowMultiple": true, "errorWhenNotFound": false})
class RedBag extends React.Component {
    state = {
        maskShow: false,
        sms_code: null,
        count: 0
    }

    componentDidMount() {
        document.title="红包";
        this.props.redbag.fetch_user_redbag()
    }

    withdrawHandler = () => {
        let ableToClick = this.props.redbag.hasWithdrawAmt >= this.props.redbag.minWithdrawAmt;

        if (ableToClick) {
            this.props.redbag.getSMSCode().then(()=>{
                this.setState({maskShow: true, sms_code: null});
                this.startCounting();
            },e=>{
                if(e.code == 26012 || e.code == 26011){
                    this.setState({maskShow: false});
                    Components.showToast(e.message)
                    clearInterval(this._timer)
                }else{
                    Components.showToast(e.message)
                    clearInterval(this._timer)
                }
            });
        }
    }

    startCounting = () => {
       this.setState({count: 60});
        this._timer = setInterval(() => {
            if (this.state.count <= 1) clearInterval(this._timer)
            this.setState({count: this.state.count - 1})
        }, 1000)
    }

    componentWillUnmount() {
        clearInterval(this._timer)
    }

    closePopHandler = () => {
        this.setState({maskShow: false})
        clearInterval(this._timer)
    }

    changeValueHandler = e => {
       if(e.target.value.length <= 6){
           this.setState({sms_code: e.target.value})
       }
    }

    getSMSCode = () => {
        this.props.redbag.getSMSCode().then(()=>{
            this.startCounting();
        },e=>{
            Components.showToast(e.message)
            clearInterval(this._timer)
        });
    }

    confirmBtnHandler = () => {
        let {redbag, history} = this.props
        let uuid = redbag.default_card.uuid;
        let value = this.state.sms_code;
        if (!value) return Components.showToast('请输入验证码')
            redbag.withdrawConfirm(value, uuid).then(() => {
                history.push('/redbag-result')
                redbag.setWithdrawResult({success: true})
            }, e => {
                if (e.code == 26004) {
                    redbag.setWithdrawResult({success: false, reason: e.message})
                    history.push('/redbag-result')
                } else {
                    Components.showToast(e.message)
                    clearInterval(this._timer)
                }
            });
     }

    render() {
        let {redbag, history} = this.props
        let ableToClick = redbag.hasWithdrawAmt >= this.props.redbag.minWithdrawAmt;

        let cardNoInfo = redbag.default_card ?
            redbag.default_card.text : '';
        let USER = Storage.getUserDict();
        let pop = () => {
            if (!this.state.maskShow) return;

            return <div styleName="mask">
                <div styleName="verify-popup">
                    <div styleName="verify-popup-wrap">
                        <div styleName="verify-popup-close" onClick={this.closePopHandler}></div>
                        <div styleName="verify-popup-title">短信验证</div>
                        <div styleName="verify-popup-tip">
                            已向手机号(尾号{USER.phone.slice(-4)})发送短信验证码
                        </div>
                        <div styleName="verify-input">
                            <input styleName="sms-input" type="number" name="number" value={this.state.sms_code}
                                   placeholder="输入验证码" onChange={this.changeValueHandler}/>
                            <span styleName="btn-countdown" onClick={this.getSMSCode}>
                                {this.state.count > 0 ? this.state.count + 's' : '获取验证码'}</span>
                        </div>
                        <div styleName="btn-list">
                            <div styleName="cancel-btn" onClick={this.closePopHandler}>取消</div>
                            <div styleName="confirm-btn" onClick={this.confirmBtnHandler}>确定</div>
                        </div>
                    </div>
                </div>
            </div>
        }

        let goBack = () => {
            Browser.inApp ? NativeBridge.close() : history.goBack()
        }

        return <div>
            <Header title="红包账户" goBack={goBack} enable={'force'}/>

            <div styleName={Browser.inFXHApp ? "details-entry-inIOS" : "details-entry"}>
                <Link to="/redbag-records"><span>红包明细</span></Link>
            </div>
            <div styleName="red-packet-wrapper">
                <div styleName="red-packet-area">
                    <div styleName="packet-title">可提现(元)</div>
                    <div styleName="packet-num">{this.props.redbag.hasWithdrawAmt}</div>
                    <div styleName="packet-frozen">冻结(元)：<span>{this.props.redbag.freezeAmt}</span></div>
                </div>
                <div styleName="withdraw-card">
                    <div styleName="card-title">银行卡</div>
                    <div styleName="card-branch">{cardNoInfo}</div>
                </div>
                <div styleName={ableToClick ? "withdraw-btn" : "withdraw-gray-btn"} onClick={this.withdrawHandler}>提现
                </div>
                <div styleName="packet-tips">
                    <div styleName="packet-tips-title">说明</div>
                    <div styleName="packet-rule-item" dangerouslySetInnerHTML={{__html: this.props.redbag.instruction}}>
                    </div>
                    {/*<div styleName="packet-rule"><span styleName="dot"></span>7*24小时可以提现；</div>*/}
                    {/*<div styleName="packet-rule"><span styleName="dot"></span>提现后1-3个工作日到账；</div>*/}
                    {/*<div styleName="packet-rule"><span styleName="dot"></span>若有问题，请咨询<span>400-102-0066</span>。</div>*/}
                </div>
            </div>

            {pop()}
        </div>
    }
}

export default RedBag