import React from 'react'
import CSSModules from 'react-css-modules'

import Header from '../../lib/components/pc-header.js'

import styles from '../css/pc.css'


@CSSModules(styles, { allowMultiple: true, errorWhenNotFound: false })
class PC extends React.Component {

    state = {

    }

    render() {
        return <div styleName="bg">
            <Header bgColor="#725749" />

            <div styleName="theme">
                <div styleName="theme-text-container">
                    <div styleName="theme-text-lt">这里有份万元红包</div>
                    <div styleName="theme-text-lb">10月18日 10:00 - 11月15日</div>
                    <div styleName="theme-text-rb">让双11不再剁手</div>
                </div>
            </div>

            <div styleName="content">
                <div styleName="title-text">
                    <img src={require('../images/pc/invite-title.png')} alt="邀请好友赚佣金" height="71px"/>
                </div>
                <div styleName="sub-title">
                    活动期内，每邀一位累投额达标用户，送邀请人相应工豆奖励，最多限10人。
                </div>
                <div styleName="reward-state">
                    <span styleName="blue-anchor">如何邀请</span>
                </div>
                <div styleName="reward-invite-grp">
                    <div styleName="reward-invite-1">
                        <div styleName="reward-invite-value">
                            <div styleName="reward-invite-value-lt">500</div>
                            <div styleName="reward-invite-value-r">
                                <div styleName="reward-invite-value-rt">元</div>
                                <div styleName="reward-invite-value-rb">(工豆)</div>
                            </div>
                        </div>
                        <div styleName="reward-invite-condition">5万≤单个被邀请人累投额&lt;20万送邀请人</div>
                    </div>
                    <div styleName="reward-invite-2">
                        <div styleName="reward-invite-value">
                            <div styleName="reward-invite-value-lt">2400</div>
                            <div styleName="reward-invite-value-r">
                                <div styleName="reward-invite-value-rt">元</div>
                                <div styleName="reward-invite-value-rb">(工豆)</div>
                            </div>
                        </div>
                        <div styleName="reward-invite-condition">单个被邀请人累投额≥20万送邀请人</div>
                    </div>
                </div>
                <div styleName="reward-invite-more">
                    每成功邀1位好友升级达标，最高可再得350元
                    <span styleName="blue-anchor">了解更多</span>
                </div>
                <div styleName="invite-tip">温馨提示：按被邀请人活动内累投前10名计算返佣，单个被邀请人仅按最高返佣计算1次。工豆有效期15天。</div>

                <div styleName="title-text">
                    <img src={require('../images/pc/invest-title.png')} alt="拼累投金额,赢最高万元红包" height="77px"/>
                </div>
                <div styleName="sub-title">
                    活动期内，每邀一位累投额达标用户，送邀请人相应工豆奖励，最多限10人。
                </div>
                <div styleName="reward-state">
                    <span styleName="blue-anchor">继续投资</span>
                </div>
                <div styleName="reward-invest-grp">
                    <div styleName="reward-invest-1">
                        <div styleName="reward-invest-condition">50万≤累投额&lt;100万，奖励</div>
                        <div styleName="reward-invest-value"><span>￥</span>500</div>
                    </div>
                    <div styleName="reward-invest-2">
                        <div styleName="reward-invest-condition">100万≤累投额&lt;200万，奖励</div>
                        <div styleName="reward-invest-value"><span>￥</span>1300</div>
                    </div>
                    <div styleName="reward-invest-3">
                        <div styleName="reward-invest-condition">200万≤累投额&lt;300万，奖励</div>
                        <div styleName="reward-invest-value"><span>￥</span>3200</div>
                    </div>
                    <div styleName="reward-invest-4">
                        <div styleName="reward-invest-condition">300万≤累投额&lt;500万，奖励</div>
                        <div styleName="reward-invest-value"><span>￥</span>6000</div>
                    </div>
                    <div styleName="reward-invest-5">
                        <div styleName="reward-invest-condition">累投额≥500万，奖励</div>
                        <div styleName="reward-invest-value"><span>￥</span>12500</div>
                    </div>
                </div>
                <div styleName="invest-tip">温馨提示：红包奖励以工豆形式发放，工豆有效期15天。</div>

                <div styleName="tip-title">活动说明</div>
                <div styleName="tip">
                    1. 活动期内，投资转让项目，不能参与本次活动；<br />
                    2. 本次活动累投金额包含工场微金、工场尊享和工场黄金的尊享金产品的购买金额；<br />
                    3. 活动奖励将于活动结束后7个工作日内，统一发放至邀请人的工场账户；<br />
                    4. 活动最终解释权归金融工场所有，活动详情致电客服热线咨询：400-0322-988。
                </div>
            </div>
        </div>
    }
}

export default PC