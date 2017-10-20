import React from 'react'
import CSSModules from 'react-css-modules'
import {observer, inject} from 'mobx-react'
import {BannerGroup} from 'fw-components'

import {Header, BottomNavBar} from '../../components';
import styles from '../../css/user/user.css'

@inject("user")
@observer
@CSSModules(styles, {"allowMultiple": true, "errorWhenNotFound": false})
class User extends React.Component {
    constructor() {
        super()
        this.t = null
    }

    state = {
        position_index: 0,
        position: 0
    }

    componentDidMount() {
        let {user} = this.props
        user.fetchInfo()
        user.fetchNotice()
        this.startMoveNotice()
    }

    gotoHandler = (link) => {
        if (link.indexOf('://') < 0) {
            link = location.protocol + '//' + location.hostname + link;
        }
        location.href = encodeURI(link);
    }
    startMoveNotice = () => {
        let delay = 30, duration = 3000, step = 2, singleH = 40, p, position_index;
        let {notice} = this.props.user.data.user;
        this._time_gap = 0;

        User.t = setInterval(() => {
            this._time_gap += delay;
            if (this._time_gap >= duration) {
                p = this.state.position - step, position_index = this.state.position_index;

                if (p <= -singleH * (this.state.position_index + 1)) {
                    this._time_gap = 0
                    p = Math.round(p / singleH) * singleH
                    position_index += 1
                }

                if (p <= -singleH * notice.length) {
                    this._time_gap = 0
                    p = 0
                    position_index = 0
                }
                this.setState({
                    position: p,
                    position_index: position_index
                })
            }
        }, delay)
    }

    componentWillUnmount() {
        clearInterval(User.t)
    }

    onImageClickHandler = (index) => {
        let {user} = this.props.user.data;
        let link = null;
        let bs = user.banners;
        for (let i = 0; i < bs.length; i++) {
            if (i == index) link = bs[i].url;
        }
        if (link) this.gotoHandler(link);
    }
    goPageHandler(link){
        let {history} = this.props
        history.push(link)
    }
    render() {
        let {history} = this.props
        let {user} = this.props.user.data, {banners} = user
        let {position} = this.state
        let bannerGroup;
        let {info} = this.props.user.data.user
        let noticeFn = (item, index) => {
            return <div styleName="noticeItem" key={index} onClick={() => this.gotoHandler(item.url)}>{item.des}</div>
        }

        if (banners && banners.length > 0) {
            bannerGroup = <BannerGroup styleName="bannerItem"
                                       onImageClick={this.onImageClickHandler}
                                       images={banners.map(i => i.img)}/>
        }


        return <div styleName="bg">
            <div styleName="bar">
                <img styleName="portrait" src={info.headUrl} onClick={()=>this.goPageHandler('/user-setting')}/>
                <div styleName="barItem info">
                    <div styleName="name">{info.loginName}</div>
                    <div styleName="des">{info.promotionCode}</div>
                </div>
                <div styleName="barItem" onClick={()=>this.goPageHandler('/investor')}>
                    <div styleName="des">全部客户(人)</div>
                    <div styleName="num">{info.totleCustCount}</div>
                </div>
                <div styleName="line"></div>
                <div styleName="barItem" onClick={()=>this.goPageHandler('/investor')}>
                    <div styleName="des">在投客户(人)</div>
                    <div styleName="num">{info.investingCustCount}</div>
                </div>
            </div>
            <div styleName="notice">
                <img styleName="noticeIcon" src={require('../../images/user/user/notice.png')}/>
                <div styleName="noticeDes">
                    <div styleName="noticeDesPanel" style={{top: `${position}px`}}>
                        {user.notice.map(noticeFn)}
                        {user.notice[0] && noticeFn(user.notice[0])}
                    </div>
                </div>
                <img styleName="noticeArrow" src={require('../../images/user/user/arrow.png')}/>
            </div>
            <div styleName="bean">
                <div styleName="beanNum"><span>¥{info.beanAmount}</span>可用返利（工豆）</div>
                <div styleName="beanText">工豆投金融工场标可抵现金，请尽快使用。</div>
                <div styleName="rebate">
                    <div styleName="rebateNum">
                        <div styleName="rebateText">今日返利</div>
                        <div styleName="rebateMoney">¥{info.todayRebate}</div>
                    </div>
                    <div styleName="rebateNum rebateBorder" onClick={() => this.goPageHandler('/user-rebate')}>
                        <div styleName="rebateText">待发返利</div>
                        <div styleName="rebateMoney">¥{info.pendingRebate}</div>
                    </div>
                    <img styleName="rebateArrow" src={require('../../images/user/user/arrow.png')}
                         onClick={() => this.goPageHandler('/user-rebate')}/>
                </div>
            </div>
            <div styleName="banner">{bannerGroup}</div>
            <div styleName="rate">年化佣金 <span>{info.commission}%</span></div>
            <div styleName="rule">
                <div styleName="ruleText">
                    非等额标包括还款方式为一次性还本付息、按月付息到期还本、按天一次性还本付息的一次性还本标；<br/><br/>
                    等额标包括还款方式为按月还款和按季等额还款的标。该类标最终年化佣金乘以0.56且超过18个月标按18个月计算佣金。0.56为借款方占用投资方的资金使用率。
                </div>
                <div styleName="invest">邀请好友</div>
                <div styleName="couponBtn" onClick={()=>this.goPageHandler('/user-transfer-coupon')}><span>{info.couponCount}</span></div>
            </div>
            <BottomNavBar history={history}/>
        </div>
    }
}

export default User