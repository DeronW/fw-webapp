import React from 'react'
import CSSModules from 'react-css-modules'

import { Post, UserReady } from '../../lib/helpers'
import Header from '../../lib/components/pc-header.js'
import InviteRewardPop from '../../lib/components/pop-panel.js'
import HowToInvitePop from '../../lib/components/pc-pop-how-to-invite.js'
import CompanyUserPop from '../../lib/components/pc-pop-company-user.js'

import styles from '../css/pc.css'


const INVEST_REWARD_DIST = [
    { value: 0, reward: 0 },
    { value: 500000, reward: 500 },
    { value: 1000000, reward: 1300 },
    { value: 2000000, reward: 3200 },
    { value: 3000000, reward: 6000 },
    { value: 5000000, reward: 12500 }
]


@CSSModules(styles, { allowMultiple: true, errorWhenNotFound: false })
class PC extends React.Component {

    state = {
        investedRewardLevel: 0,
        investMore: '',
        showInviteRewardPop: false,
        showHowToInvitePop: false,
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

    loginHandler = () => this.props.gotoHandler('登录', 'https://www.gongchangp2p.com/api/activityPullNew/ActivityControl.shtml?code=ONLTHD')

    toggleInviteRewardPop = () => this.setState({ showInviteRewardPop: !this.state.showInviteRewardPop})

    toggleHowToInvitePop = () => this.setState({ showHowToInvitePop: !this.state.showHowToInvitePop})

    render() {
        const { isLoggedIn, gcm, isCompany, inviteCnt, inviteReward, invested } = this.props;
        const { investedRewardLevel, investMore, showInviteRewardPop, showHowToInvitePop } = this.state;

        return <div styleName="bg">
            <Header bgColor="#725749" />

            <div styleName="banner">
                <img src={require('../images/pc/banner.jpg')} />
            </div>

            <div styleName="content">
                <div styleName="title-text">
                    <img src={require('../images/pc/invite-title.png')} alt="邀请好友赚佣金" height="71px"/>
                </div>
                <div styleName="sub-title">
                    活动期内，每邀一位累投额达标用户，送邀请人相应工豆奖励，最多限10人。
                </div>
                { isLoggedIn ? (
                    <div styleName="reward-state">
                        您活动期内已邀请<span>{inviteCnt}</span>人，暂可获奖励<span>{inviteReward}</span>元
                        <div styleName="blue-anchor" onClick={this.toggleHowToInvitePop}>如何邀请</div>
                    </div>
                ) : (
                    <div styleName="reward-state">
                        请登录后查看邀友及奖励情况，
                        <div styleName="blue-anchor" onClick={this.loginHandler}>立即登录</div>
                    </div>
                )}
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
                    <div styleName="blue-anchor" onClick={this.toggleInviteRewardPop}>了解更多</div>
                </div>
                <div styleName="invite-tip">温馨提示：按被邀请人活动内累投前10名计算返佣，单个被邀请人仅按最高返佣计算1次。工豆有效期15天。</div>

                <div styleName="title-text">
                    <img src={require('../images/pc/invest-title.png')} alt="拼累投金额,赢最高万元红包" height="77px"/>
                </div>
                <div styleName="sub-title">
                    活动期间，累投额达相应档位，可获该档位红包奖励，每人限1份。
                </div>
                { isLoggedIn ? (
                    <div styleName="reward-state">
                        您活动期内已累投<span> {invested} </span>元，
                        可奖励<span> {INVEST_REWARD_DIST[investedRewardLevel].reward} </span>元
                        { investedRewardLevel !== INVEST_REWARD_DIST.length - 1 &&
                            `，再投 ${investMore} 元就可奖励 ${INVEST_REWARD_DIST[investedRewardLevel + 1].reward} 元哦！`}
                        <a styleName="blue-anchor invest-link" href="https://www.9888keji.com">继续投资</a>
                    </div>
                ) : (
                    <div styleName="reward-state">
                        请登录后查看累投及奖励情况，
                        <div styleName="blue-anchor" onClick={this.loginHandler}>立即登录</div>
                    </div>
                )}
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
                    1. 活动期内，投资转让项目和预约类项目，不能参与本次活动；<br />
                    2. 企业用户不参与本次活动；<br />
                    3. 本次活动累投金额包含工场微金、工场尊享和工场黄金的尊享金产品的购买金额；<br />
                    4. 活动奖励将于活动结束后7个工作日内，统一发放至邀请人的工场账户；<br />
                    5. 活动最终解释权归金融工场所有，活动详情致电客服热线咨询：400-0322-988。
                </div>
            </div>

            { showInviteRewardPop &&
                <InviteRewardPop isLogin={isLoggedIn} gotoLogin={this.loginHandler} closeHandler={this.toggleInviteRewardPop} /> }

            { showHowToInvitePop &&
                <HowToInvitePop isLoggedIn={isLoggedIn} gcm={gcm} loginHandler={this.loginHandler} closeHandler={this.toggleHowToInvitePop} /> }

            { isCompany && <CompanyUserPop /> }
        </div>
    }
}

export default PC