import React from 'react'
import CSSModules from 'react-css-modules'

import styles from '../css/pop-panel.css'

const InvestGiftPanel = CSSModules(styles, {
    "allowMultiple": true,
    "errorWhenNotFound": false
})(props => (
    <div styleName="bg" onClick={props.closeHandler}>
        <div styleName="gift-panel">
            <div styleName="title">邀请返利攻略</div>
            <b styleName="btn-close" onClick={props.closeHandler}>&times;</b>
            <div styleName="paragraph-title">攻略一</div>
            <div styleName="paragraph">好友注册后<span>15</span>天内（含注册当日），投资达到<span>VIP1</span>等级送50元，达到<span>VIP2</span>及以上等级，再送300元！<br />奖励以工豆形式实时发放，有效期<span>30</span>天。</div>

            <table styleName="yqyl-table">
                <tbody>
                    <tr styleName="light-color">
                        <td>好友达到VIP1级，送邀请人</td>
                        <td>好友达到VIP2级，送邀请人</td>
                    </tr>
                    <tr>
                        <td style={{ width: "35%" }}>
                            <span styleName="voucher">
                                <span styleName="voucher-title">
                                    <span styleName="voucher-title-b">50</span>
                                    <span styleName="voucher-title-c">元工豆</span>
                                </span>
                            </span>
                        </td>
                        <td>
                            <span styleName="voucher">
                                <span styleName="voucher-title">
                                    <span styleName="voucher-title-b">300</span>
                                    <span styleName="voucher-title-c">元工豆</span>
                                </span>
                            </span>
                        </td>
                    </tr>
                </tbody>
            </table>

            <div styleName="light-color">温馨提示： <em>工豆会在好友注册后15天内（含注册当日），根据好友当时达到的相应等级实时发放相应的工豆。</em></div>
            <div styleName="paragraph-title">攻略二</div>
            <div styleName="paragraph">成功邀请好友投资，C码用户均可获得年化0.25%投资返利。</div>
        </div>
    </div>
))

export default InvestGiftPanel