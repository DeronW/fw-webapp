import React from 'react'
import CSSModules from 'react-css-modules'

import Header from '../../lib/components/mobile-header.js'

import styles from '../css/mobile.css'


@CSSModules(styles, { allowMultiple: true, errorWhenNotFound: false })
class Mobile extends React.Component {

    state = {
        showDesc: false,
    }

    toggleShowDesc = () => this.setState({ showDesc: !this.state.showDesc })

    render() {
        const { showDesc } = this.state;

        return <div styleName="bg">
            <Header />

            <div styleName="desc-entry" onClick={this.toggleShowDesc}>活动说明</div>

            { showDesc && <div styleName="desc">
                <div styleName="desc-back" onClick={this.toggleShowDesc}>返回</div>
                <div styleName="desc-title">活动说明</div>
                1. 活动期内，投资转让项目，不能参与本次活动；<br />
                2. 本次活动累投金额包含工场微金、工场尊享和工场黄金的尊享金产品的购买金额；<br />
                3. 活动奖励将于活动结束后7个工作日内，统一发放至邀请人的工场账户；<br />
                4. 活动最终解释权归金融工场所有，活动详情致电客服热线咨询：400-0322-988。
            </div> }

            <div styleName="theme">
                这里有份万元红包<br/>让双11不再剁手
                <div styleName="time">10月18日 10:00 - 11月15日</div>
            </div>

            <img styleName="sub-title" src={require('../images/mobile/invite-title.png')} alt="邀请好友赚佣金" />
            <p>活动期内，每邀一位累投额达标用户，送邀请人相应工豆奖励，最多限10人。</p>
            <p>您活动期内已邀请<span styleName="text-red">10</span>人，暂可获奖励<span styleName="text-red">5400</span>元</p>
            <div styleName="btn-red">如何邀友</div>

            <div styleName="reward-invite-1">
                <div styleName="reward-invite-value">
                    <div styleName="reward-invite-value-lt">500</div>
                    <div styleName="reward-invite-value-r">
                        <div styleName="reward-invite-value-rt">元</div>
                        <div styleName="reward-invite-value-rb">(工豆)</div>
                    </div>
                </div>
                5万≤单个被邀请人累投额&lt;20万<br />送邀请人
            </div>
            <div styleName="reward-invite-2">
                <div styleName="reward-invite-value">
                    <div styleName="reward-invite-value-lt">2400</div>
                    <div styleName="reward-invite-value-r">
                        <div styleName="reward-invite-value-rt">元</div>
                        <div styleName="reward-invite-value-rb">(工豆)</div>
                    </div>
                </div>
                单个被邀请人累投额≥20万<br />送邀请人
            </div>
            <p>每成功邀1位好友升级达标，最高可再得350元。</p>
            <div styleName="btn-red">了解更多</div>

            <p styleName="text-darker-bg text-left">
                温馨提示：<br />
                1. 按被邀请人活动内累投前10名计算返佣，单个被邀请人仅按最高返佣计算1次。<br />
                2. 工豆有效期15天。
            </p>

            <img styleName="sub-title" src={require('../images/mobile/invest-title.png')} alt="拼累投金额，赢最高万元红包" />
            <p>活动期内，累投额达相应档位，可获该档位红包奖励，每人限1份。</p>
            <div styleName="basket-grp">
                <div styleName="basket-1">
                    50万≤累投额&lt;100万<br />
                    奖励<i>&yen;</i><b>500</b>
                </div>
                <div styleName="basket-2">
                    100万≤累投额&lt;200万<br />
                    奖励<i>&yen;</i><b>1300</b>
                </div>
                <div styleName="basket-3">
                    200万≤累投额&lt;300万<br />
                    奖励<i>&yen;</i><b>3200</b>
                </div>
                <div styleName="basket-4">
                    300万≤累投额&lt;500万<br />
                    奖励<i>&yen;</i><b>6000</b>
                </div>
                <div styleName="basket-5">
                    累投额≥500万<br />
                    奖励<i>&yen;</i><b>12500</b>
                </div>
            </div>
            <p styleName="text-left">温馨提示：红包奖励以工豆形式发放，工豆有效期15天。</p>
            <div styleName="text-darker-bg">
                <p>
                    您活动期内已累投<span styleName="text-red">600,000.00</span>元，可奖励<span styleName="text-red">500</span>元，<br />
                    再投400,000.00元就可奖励1300元哦！
                </p>
                <div styleName="btn-red">继续投资</div>

                <p styleName="tip">*以上活动由金融工场主办 与Apple Inc. 无关</p>
            </div>
        </div>
    }

}

export default Mobile
