import React from 'react'
import CSSModules from 'react-css-modules'
import {observer, inject} from 'mobx-react'
import {Header} from '../../components/'
import styles from '../../css/reserve/info.css'
import {NativeBridge} from '../../helpers'
import {Browser} from '../../helpers'

@inject('reserve')
@observer
@CSSModules(styles, {"allowMultiple": true, "errorWhenNotFound": false})
class ReserveInfo extends React.Component {

    componentDidMount() {
        NativeBridge.trigger('hide_header')
        this.props.reserve.fetchProduct()
    }

    reserveHandler = () => {
        let {history, reserve} = this.props
        reserve.fetchProduct().then(data => {
            if (data.isRisk == 0) {
                location.href = `/static/wap/p2p/index.html#/evaluate?from_reserve&applyInvestClaimId=${reserve.applyInvestClaimId}`
            } else if (data.batchMaxmum === 0) {
                //调到自动投资页面
                NativeBridge.toNative('auto_bid_auth')
            } else {
                history.push(`/reserve/apply?applyInvestClaimId=${reserve.applyInvestClaimId}`)
            }
        })
    }

    render() {
        let {reserve, history} = this.props
        let {context} = reserve

        let tabItem = (tab) => {
            return <div styleName="tab-item">{tab}</div>
        }
        return <div styleName='infoPanel'>
            <Header noClose title="详情" history={history}/>
            <div styleName="topInfo">
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
                        <span styleName="percent">天</span>
                    </div>
                    <div styleName="dateDown">
                        期限
                    </div>
                </div>
                <div styleName="tipsBox">
                    <span styleName="tipsItem">{context.minAmt}元起投</span>
                </div>
                <div styleName="flag"></div>
            </div>
            <div styleName="timeLine">
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
            <div styleName="flowBox">
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
            <div styleName="rulerBox">
                <div styleName="subTitle">
                    预约规则
                </div>
                <div styleName="rulerContent">
                    1.预约成功后，系统将冻结预约金额，将实时为您匹配掌众优
                    质资产；
                    <br/>2.预约有效期为3天，3天内系统未成功为您匹配项目，预约冻
                    结资金将实时解冻并退回至您的微金账户内；
                    <br/>3.预约出借暂不支持使用工豆、返息券、返现券，敬请期待；
                    <br/>4.具体起息情况请前往“我的出借”查看；
                    <br/>5.预约成功后，2小时内不可取消预约；
                    <br/>6.取消预约后，系统将不再为您匹配项目，剩余未匹配资金将实时解冻并退还至您的微金账户内。
                </div>
            </div>
            <div styleName="introduceBox">
                <div styleName="introduceTitle">
                    产品详情
                </div>
                <div styleName="introduceText">

                    <div styleName="textTitle">
                        您所出借的项目是掌众金服旗下闪电借款精心筛选的优质21天借款项目，借款用途为日常消费，金额在 500元一1万元。
                    </div>
                    <div styleName="textTitle">还款保障：</div>
                    <div styleName="sectionOne">
                        一、闪电借款基于大数据风控建模体系，北京掌众金融信息服务有限公司通过自主研发出国内领先的“如来”风控引擎，已经成为国内实现纯在线自动化审核信审的平台，有效控制用户的欺诈与信用风险，保障客户的投资安全性。
                    </div>
                    <div styleName="sectionTwo">
                        二、闪电借款主要借款客户具备良好的经济偿还能力，属于可持续发展和培育的“高成长性人群”。
                    </div>
                    <br/>
                    <div styleName="sectionTwo">
                        三、预约项目由北京掌众金融信息服务有限公司为出借人提供无限连带责任保证担保。
                        <br/>
                        <br/>
                        北京掌众金融信息服务有限公司成立于2014年3月，中国互联网金融协会理事单位；作为基于大数据风控的自动化助货平台，掌众金融为银行等传统金融机构提供大
                        数据风控等技术支持，专注为有小额、短期资金需求的蓝领及新白领提供满足消费需求的现金贷和消费分期服务。
                        <br/>
                        掌众金融坚持“移动普惠，让生活更好”，以小额分散为基本原则，以风控机器人为技术驱动，通过互联网、大数据技术帮助“信用空白”用户建立信用档案，让信用变得更有价值！
                    </div>
                </div>
            </div>
            <div styleName="question">
                <div styleName="questionText">常见问题</div>
                <div styleName="quesionArrow"></div>
            </div>
            <div styleName="bottomBox">
                <div styleName="recordBtn" onClick={
                    () => this.props.history.push(`/reserve/records`)
                }>预约记录
                </div>
                <div styleName="reserveBtn" onClick={this.reserveHandler}>立即预约</div>
            </div>
        </div>
    }
}

export default ReserveInfo
