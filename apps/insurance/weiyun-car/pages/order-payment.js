import React from 'react'
import CSSModules from 'react-css-modules'
import { observer, inject } from 'mobx-react'

import Header from '../components/header.js'
import styles from '../css/order-payment.css'


// @inject('') @observer @CSSModules(styles)
@inject('order_payment')
@observer
@CSSModules(styles)
class MainPanel extends React.Component {
    constructor(props) {
        super(props)
    }
    
    render() {
        let { order_payment, history } = this.props;
        let checkIcont = {
            unchecked: " url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACEAAAAhCAMAAABgOjJdAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAABI1BMVEUAAADY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2Njf39/o6Ojy8vL4+Pj8/Pzi4uLw8PD////s7Ozd3d339/fe3t76+vrx8fHg4ODp6en09PT5+fn9/f3q6urh4eHj4+Pu7u7a2tr7+/vv7+/z8/Pr6+v19fX+/v4AAAA/aJiFAAAAQXRSTlMALnSt0+vv1C8GY9JH2wWR/pQKubpKB95oadc1enu13N3x8t/gt3+AOgFwceRUoMgQwwmipVfmWQzhAkCGvvzlQRTAwUoAAAABYktHRACIBR1IAAAACXBIWXMAAAsSAAALEgHS3X78AAABX0lEQVQ4y4WU51ICQRAGR4xgBAlmAbMiiDlrAwcs6AEqUYH3fwtRCw/x7uifO11TM1XzrYjBkGN4ZHRsdHzYMSEmOF2TGEy6nP3C1DQkkiktnU5rqWQCpqf+1Gdm58hklUE2A+6eNp55SKq/5GDe8zuCl/yT6kfL4+12cfOsq//oz7h/BB9oygwNfF+CP0BOmZMj4O8YC2SUFRkWO8YSBUujwJLIMkVlTZFlWaFkY5RYlTVebIwX1mSdVxtDJygh3myMN0ICyg6Q8IAeYdlAtzF0NmVrwC5bsk3ZxiizI7tUbIwKu7IXJGUppAjuiexTtTSqHHwdaYSahVAj8n2qh9TNF9brHP6cYZRiw0RoFIl2wxAj8b+LniD2G4ejOPX+Wd7rxI+MSB2fQPWjp/5RhVNPbyzl7BwqzVajrdqNVrMC5xf90b50XPVk/8pxafI/XN/c3kXuuX+4u328Np4/Ae7a77Vd7S9GAAAAAElFTkSuQmCC')",
            checked: " url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACEAAAAiCAMAAADmrkDzAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAABblBMVEUAAABKoflKoflKoflKoflKoflKoflKoflKoflKoflKoflKoflKoflKoflKoflKoflKoflKoflKoflKoflKoflKoflKoflKoflKoflKoflKoflKoflKoflKoflKoflKoflKoflKoflKoflKoflKoflKoflKoflKoflKoflKoflKoflKoflKoflKoflKoflKoflKoflKoflKoflKoflKoflKoflKoflKoflKoflKoflKoflKoflKoflKoflKoflKoflKoflKoflKofmUx/vj8P7S6P5rsvqn0fz////f7v6q0/zx+P+t1fyiz/xcqvq32v3G4f13uPpLofmx1vyp0vzQ5/37/f+Dv/u02P2m0fz2+/+GwPuhzvy62/39/v+JwvtMovmezfxPpPnK5P2NxPu+3f3+//+by/xOo/nH4v2SxvvB3/2XyfzE4P1Novn+/v+Rxvu73P2Lw/tLovmv1fz8/v/y+P+FwPtQpPkAAABsq3wqAAAAQnRSTlMAH2Sdw9viZSACU8H+Oc4Dgv0Gq7Cvh0JBBNcFYdEvd7LZ2vDz4bqEPj94DupfrA/SFs+xAWjvFO3uhQlRlfRSDBGtT3+6AAAAAWJLR0QAiAUdSAAAAAlwSFlzAAALEgAACxIB0t1+/AAAAYxJREFUOMt9lFdXAjEQhUcRFKUpVqRYQJSiYAEVQQ2WWLFiV+wFe//5Jlmy7WS9L3Mz852cJDuzAIqqqk01Zou5xlRbBwJZ6xtsiMvWUG/VA3YH0sph19SdrkakV6PLqQBNbiSSu0neoRmJ1cJ3aUVGapWANpshYWunQIcHGcvTSQgv+k9eQvjEpfzc/AIJPgC/GFjEGC9R44eAEFgmAF6hLgBdImCVAniN2i7oZqn1wsamXN/aZsAOW/RAL4u7GBf3OLDPgANp1QtSPCSp4pEEFBhwzHeEIAsnNHl6RlyJWXzOgSCEWLy4ZMgVKl1Tc3MrHyoEfZK5u2fIQ5kBj8q1+iBccXdPmOsmr7p4GPq5fS5XgJdX9dMMgDXEvXQEehiVLKSjI/Kq9EaBd83rRsi3jcbk5cfn1/ePBohFaQvFVZnfkvYDxaU2FHc61WClk4cSBkBiiI9DclgIDCeVkYqKJmYkqh7L0bGUrp4aG9WNdjo8rqpPTKYF/4fMVNaRI9WcIzudAUPNzM7oMn9NEuT0NSkwNAAAAABJRU5ErkJggg==')"
        };

        return <div styleName="order-Payment">
            <Header title="结算" history={history} />
            <div styleName="payment-panel">
                <div styleName="payment-panel-text">支付金额(元)</div>
                <div styleName="payment-panel-money">{(order_payment.money).toFixed(2)}</div>
            </div>
            <div styleName="payment-way-choose">选择支付方式</div>
            <div styleName="payment-wap-alipay">
                <img styleName="alipay-img" src={require('../images/order-payment/alipay.jpg')} alt="" />
                <div styleName="alipay">
                    <div styleName="alipay-title">支付宝</div>
                    <div styleName="alipay-explain">推荐安装支付宝5.0及以上版本的用户使用</div>
                </div>
                <div styleName="checked-btn" onClick={() => order_payment.setFormData("checked", !order_payment.checked)} style={{ background: `${order_payment.checked ? checkIcont.checked : checkIcont.unchecked} #fff no-repeat center` }}></div>
            </div>
            <div styleName="payment-btn" onClick={() => order_payment.submit()}>支付</div>
        </div>
    }
}

export default MainPanel
