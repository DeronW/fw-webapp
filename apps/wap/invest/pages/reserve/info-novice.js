import React from 'react'
import CSSModules from 'react-css-modules'
import {observer, inject} from 'mobx-react'
import {Header} from '../../components/'
import styles from '../../css/reserve/info.css'
import {NativeBridge} from '../../helpers'

@inject('reserve')
@observer
@CSSModules(styles, {"allowMultiple": true, "errorWhenNotFound": false})
class ReserveInfoNovice extends React.Component {
    componentDidMount() {
        // NativeBridge.trigger('hide_header')
        this.props.reserve.fetchProduct()
    }

    jumpHandler = () => {
        let {history} = this.props
        history.push('/reserve/info-intro')
    }

    render() {
        let {reserve, history} = this.props
        let {context} = reserve.novice_bid_data
        let banner_section = () => {
            return <div styleName="topInfo">
                <div styleName="infoRate">
                    <div styleName="rateUp">
                        <span>{context.loadRate}</span>
                        <span styleName="percent">%</span>
                    </div>
                    <div styleName="rateDown">
                        年化借款利率
                    </div>
                </div>
                <div styleName="garyGap"></div>
                <div styleName="infoDate">
                    <div styleName="dateUp">
                        <span>{context.repayPeriod}</span>
                    </div>
                    <div styleName="rateDown">
                        理财期限(天)
                    </div>
                </div>
                <div styleName="tipsBox">
                    <span styleName="tipsItem">{context.minAmt}元起投</span>
                </div>
                <div styleName="flag"></div>
            </div>
        }
        let timeline_section = () => {
            return <div styleName="timeLine">
                <div styleName="fLine">
                    <div styleName="fLineItem fLineItem1">抢购</div>
                    <div styleName="fLineItem fLineItem2">预计起息</div>
                    <div styleName="fLineItem fLineItem3">预计到期</div>
                </div>
                <div styleName="sLine"></div>
                <div styleName="tLine">
                    <div styleName="fLineItem fLineItem1">2017-09-01</div>
                    <div styleName="fLineItem fLineItem2">2017-09-12</div>
                    <div styleName="fLineItem fLineItem3">2017-09-22</div>
                </div>
            </div>
        }
        let advanced_section = () => {
            return <div styleName="flowBox">
                <div styleName="flowHeader">预约优势</div>
                <div styleName="flowContent">
                    <div styleName="tabItem">
                        <div styleName="itemUp itemUp1"></div>
                        <div styleName="itemDown">优质资产</div>
                    </div>
                    <div styleName="tabItem">
                        <div styleName="itemUp itemUp2"></div>
                        <div styleName="itemDown">自动出借</div>
                    </div>
                    <div styleName="tabItem">
                        <div styleName="itemUp itemUp3"></div>
                        <div styleName="itemDown">快速起息</div>
                    </div>
                    <div styleName="tabItem">
                        <div styleName="itemUp itemUp4"></div>
                        <div styleName="itemDown">安全保障</div>
                    </div>
                </div>
            </div>
        }
        let intro_section = () => {
            return <div styleName="rulerBox">
                <div styleName="subTitle">
                    新手标介绍
                </div>
                <div styleName="rulerContent">
                    1、您投的新手标所匹配的资产是期限为21天消费贷，即工场微
                    金预约宝产品。
                    <br/>2、结果可在金融工场app-我的-点击预约宝(非预约按钮)预约
                    记录中查看。
                    <br/>3、2%奖励将以工豆形式在标的起息后发到您的工豆账户中。
                    <br/>4、奖励工豆可在您再次出借时抵现（100个工豆=1元）。
                    <br/>5、工豆是平台对新用户的奖励，不可提现。
                </div>
            </div>
        }
        let jumpLink_section = () => {
            return <div styleName="jumpLink" onClick={this.jumpHandler}>
                <div styleName="jumpLinkText">预约宝详情</div>
                <div styleName="jumpLinkArrow"></div>
            </div>
        }

        let bottom_section = () => {
            return <div styleName="bottomBox">
                <div styleName="reserveBtn" onClick={this.reserveHandler}>立即预约</div>
            </div>
        }
        return <div styleName="infoPanel">
            <Header noClose title="新手标详情" history={history}/>
            {banner_section()}
            {timeline_section()}
            {advanced_section()}
            {intro_section()}
            {jumpLink_section()}
            {bottom_section()}
        </div>
    }
}

export default ReserveInfoNovice