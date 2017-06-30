import React from 'react'
import CSSModules from 'react-css-modules'
import { Link } from 'react-router-dom'
import { observer, inject } from 'mobx-react'
import { Header } from '../../lib/components'
import { Storage } from '../../lib/helpers'
import styles from '../css/red-bag.css'
import { Components } from 'fw-javascripts'

@inject('redbag')
@observer
@CSSModules(styles, { "allowMultiple": true, "errorWhenNotFound": false })
class RedBag extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            maskShow: false,
            sms_code: '',
            count: 0,
        }
    }

    componentDidMount() {
        // document.title = '红包账户'
        this.props.redbag.fetch_user_redbag()
    }

    withdrawHandler = () => {
        let ableToClick = this.props.redbag.borrowBtnStatus >= 2 && this.props.redbag.hasWithdrawAmt >= 50;
        if (ableToClick) {
            this.setState({ maskShow: true });
            this.props.redbag.getSMSCode();
            this.startCounting();
        }
    }

    startCounting = () => {
        this.setState({ count: 60 })
        this._timer = setInterval(() => {
            if (this.state.count <= 1) clearInterval(this._timer)
            this.setState({ count: this.state.count - 1 })
        }, 1000)
    }

    componentWillUnmount() {
        clearInterval(this._timer)
    }

    closePopHandler = () => {
        this.setState({ maskShow: false })
        clearInterval(this._timer)
    }

    changeValueHandler = e => {
        let v = String(parseInt(e.target.value) || '').substr(0, 6)
        this.setState({ sms_code: v })
    }

    getSMSCode = () => {
        this.startCounting()
        this.props.redbag.getSMSCode();
    }

    confirmBtnHandler = () => {
        let { redbag, history } = this.props
        let uuid = redbag.default_card.uuid;
        let value = this.state.sms_code;
        let err
        if (!value) err = '请输入验证码'
        if (err) return Components.showToast(err)
        redbag.withdrawConfirm(value, uuid, history);
    }

    render() {
        let { redbag } = this.props
        let ableToClick = redbag.borrowBtnStatus >= 2 && redbag.hasWithdrawAmt >= 50;

        let cardNoInfo = redbag.borrowBtnStatus >= 2 && redbag.default_card ?
            redbag.default_card.text : '暂未设置';

        return <div>
            <Header title="红包账户" />
            <div styleName="details-entry">
                <Link to="/red-packet-detail">
                    <span>红包明细</span>
                </Link>
            </div>
            <div styleName="red-packet-wrapper">
                <div styleName="red-packet-area">
                    <div styleName="packet-title">可提现(元)</div>
                    <div styleName="packet-num">{this.props.redbag.hasWithdrawAmt}</div>
                    <div styleName="packet-frozen">冻结(元)：{this.props.redbag.freezeAmt}</div>
                </div>
                <div styleName="withdraw-card">
                    <div styleName="card-title">银行卡</div>
                    <div styleName="card-branch">{cardNoInfo}</div>
                </div>
                <div styleName={ableToClick ? "withdraw-btn" : "withdraw-gray-btn"} onClick={this.withdrawHandler}>提现</div>
                <div styleName="packet-tips">
                    <div styleName="packet-tips-title">温馨提示</div>
                    <div styleName="packet-rule"><span styleName="dot"></span>单笔提现金额不低于50元，单日提现次数不超过3次；</div>
                    <div styleName="packet-rule"><span styleName="dot"></span>7*24小时可以提现；</div>
                    <div styleName="packet-rule"><span styleName="dot"></span>提现后1-3个工作日到账；</div>
                    <div styleName="packet-rule"><span styleName="dot"></span>若有问题，请咨询<span>400-102-0066</span>。</div>
                </div>
            </div>
            {this.state.maskShow && <div styleName="mask">
                <div styleName="verify-popup">
                    <div styleName="verify-popup-wrap">
                        <div styleName="verify-popup-close" onClick={this.closePopHandler}></div>
                        <div styleName="verify-popup-title">短信验证</div>
                        <div styleName="verify-popup-tip">
                            已向手机号(尾号{Storage.get('phone').slice(-4)})发送短信验证码
                        </div>
                        <div styleName="verify-input">
                            <input styleName="sms-input" type="number" name="number" value={this.state.sms_code}
                                placeholder="输入验证码" onChange={this.changeValueHandler} />
                            <span styleName="btn-countdown" onClick={this.getSMSCode}>
                                {this.state.count > 0 ? this.state.count + 's' : '获取验证码'}</span>
                        </div>
                        <div styleName="btn-list">
                            <div styleName="cancel-btn" onClick={this.closePopHandler}>取消</div>
                            <div styleName="confirm-btn" onClick={this.confirmBtnHandler}>确定</div>
                        </div>
                    </div>
                </div>
            </div>}
        </div>
    }
}

export default RedBag