import React from 'react'
import CSSModules from 'react-css-modules'

import { NativeBridge, gotoPage, Post, Browser, UserReady } from '../../lib/helpers'
import HowToInvitePop from '../../lib/components/mobile-pop-how-to-invite.js'
import CompanyUserPop from '../../lib/components/mobile-pop-company-user.js'

import styles from '../css/mobile.css'


const INVEST_REWARD_DIST = [
    { value: 0, reward: 0 },
    { value: 500000, reward: 500 },
    { value: 1000000, reward: 1300 },
    { value: 2000000, reward: 3200 },
    { value: 3000000, reward: 6000 },
    { value: 5000000, reward: 12500 }
]


@CSSModules(styles, { allowMultiple: true, errorWhenNotFound: false })
class Mobile extends React.Component {

    state = {
        investedRewardLevel: 0,
        investMore: '',
        showInviteRewardPop: false,
        showHowToInvitePop: false,
        showDesc: false,
    }

    componentWillReceiveProps(nextProps) {
        nextProps.invested !== this.props.invested && this.calInvestLevel(nextProps)
    }

    calInvestLevel = props => {
        const invested = Number(props.invested);
        let investedRewardLevel = 0,
            investMore = 0;
        for (let i = 0; i < INVEST_REWARD_DIST.length; i++) {
            if (i === INVEST_REWARD_DIST.length - 1) investedRewardLevel = i;
            if (invested < INVEST_REWARD_DIST[i].value) {
                investedRewardLevel = i-1;
                investMore = (INVEST_REWARD_DIST[i].value*100 - invested*100)/100;
                break
            }
        }
        this.setState({
            investedRewardLevel: investedRewardLevel,
            investMore: investMore,
        })
    }

    toggleShowDesc = () => this.setState({ showDesc: !this.state.showDesc })

    loginHandler = () => this.props.gotoHandler('登录', 'https://www.gongchangp2p.com/api/activityPullNew/ActivityControl.shtml?code=ONLTHD')

    gotoMoreAboutInvite = () => {
        const link = 'https://m.9888.cn/static/wap/topic-invite/index.html';
        if (Browser.inApp) NativeBridge.goto(link)
        location.href = link;
    }

    gotoInvest = () => gotoPage('投资')

    toggleHowToInvitePop = () => this.setState({ showHowToInvitePop: !this.state.showHowToInvitePop})

    render() {
        const { isLoggedIn, gcm, isCompany, inviteCnt, inviteReward, invested } = this.props;
        const { investedRewardLevel, investMore, showInviteRewardPop, showHowToInvitePop, showDesc } = this.state;

        return <div styleName="bg">
            <div styleName="desc-entry" onClick={this.toggleShowDesc}>活动说明</div>

            { showDesc && <div styleName="desc">
                <div styleName="desc-back" onClick={this.toggleShowDesc}>返回</div>
                <div styleName="desc-title">活动说明</div>
                    1. 活动期内，投资预约宝和转让项目，不能参与本次活动；<br />
                    2. 企业用户不参与本次活动；<br />
                    3. 本次活动累投金额包含工场微金、工场尊享和工场黄金的尊享金产品的购买金额；<br />
                    4. 活动奖励将于活动结束后7个工作日内，统一发放至邀请人的工场账户；<br />
                    5. 活动最终解释权归金融工场所有，活动详情致电客服热线咨询：400-0322-988。
            </div> }

            <img styleName="banner" src={require('../images/mobile/banner.jpg')} />

            <img styleName="sub-title" src={require('../images/mobile/invite-title.png')} alt="邀请好友赚佣金" />
            <div styleName="text-normal">活动期内，每邀一位累投额达标用户，送邀请人相应工豆奖励，最多限10人。</div>

            { isLoggedIn ? (
                <div>
                    <div styleName="text-normal">
                        您活动期内已邀请<span styleName="text-red">{inviteCnt}</span>人，
                        暂可获奖励<span styleName="text-red">{inviteReward}</span>元
                    </div>
                    <div styleName="btn-red" onClick={this.toggleHowToInvitePop}>如何邀友</div>
                </div>
            ) : (
                <div>
                    <div styleName="text-normal">请登录后查看邀友及奖励情况</div>
                    <div styleName="btn-red" onClick={this.loginHandler}>立即登录</div>
                </div>
            )}

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
            <div styleName="text-normal">每成功邀1位好友升级达标，最高可再得350元。</div>
            <div styleName="btn-red" onClick={this.gotoMoreAboutInvite}>了解更多</div>

            <div styleName="text-darker-bg text-left">
                <div styleName="text-normal">温馨提示：</div>
                <ol>
                    <li>按被邀请人活动内累投前10名计算返佣，单个被邀请人仅按最高返佣计算1次。</li>
                    <li>工豆有效期15天</li>
                </ol>
            </div>

            <img styleName="sub-title" src={require('../images/mobile/invest-title.png')} alt="拼累投金额，赢最高万元红包" />
            <div styleName="text-normal">活动期间，累投额达相应档位，可获该档位红包奖励，每人限1份。</div>
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

            <div styleName="text-normal text-left">温馨提示：红包奖励以工豆形式发放，工豆有效期15天。</div>
            <div styleName="text-darker-bg">
                { isLoggedIn ? (
                    <div>
                        <div styleName="text-normal">
                            您活动期内已累投<span styleName="text-red"> {invested} </span>元，
                            可奖励<span styleName="text-red"> {INVEST_REWARD_DIST[investedRewardLevel].reward} </span>元，<br />
                            { investedRewardLevel !== INVEST_REWARD_DIST.length - 1 &&
                                `再投 ${investMore} 元就可奖励 ${INVEST_REWARD_DIST[investedRewardLevel + 1].reward} 元哦！`}
                        </div>
                        <div styleName="btn-red" onClick={this.gotoInvest}>继续投资</div>
                    </div>
                ) : (
                    <div>
                        <div styleName="text-normal">请登录后查看累投及奖励情况</div>
                        <div styleName="btn-red" onClick={this.loginHandler}>立即登录</div>
                    </div>
                )}

                <div styleName="text-normal tip">*以上活动由金融工场主办 与Apple Inc. 无关</div>
            </div>

            { showHowToInvitePop &&
                <HowToInvitePop isLoggedIn={isLoggedIn} gcm={gcm} loginHandler={this.loginHandler} closeHandler={this.toggleHowToInvitePop} /> }

            { isCompany && <CompanyUserPop /> }
        </div>
    }

}

export default Mobile