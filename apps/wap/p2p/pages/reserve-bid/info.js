import React from 'react'
import CSSModules from 'react-css-modules'
import {observer, inject} from 'mobx-react'
import {Header} from '../../components/'
import styles from '../../css/reserve-bid/info.css'
import {NativeBridge} from '../../helpers'
import {Browser} from '../../helpers'

@inject('reserve_bid')
@observer
@CSSModules(styles, {"allowMultiple": true, "errorWhenNotFound": false})
class ReserveInfo extends React.Component {

    componentDidMount() {
        window.scrollTo(0, 0)
        NativeBridge.trigger('hide_header')
        this.props.reserve_bid.fetchProduct()
    }

    reserveHandler = () => {
        let {history, reserve_bid} = this.props
        reserve_bid.fetchProduct().then(data => {
            if (data.isRisk == 0) {
                location.href = `/static/wap/p2p/index.html#/evaluate?from_reserve&applyInvestClaimId=${reserve_bid.applyInvestClaimId}`
            } else if (data.batchMaxmum === 0) {
                //调到自动投资页面
                NativeBridge.toNative('auto_bid_auth')
            } else {
                history.push(`/reserve-bid/apply?applyInvestClaimId=${reserve_bid.applyInvestClaimId}`)
            }
        })
    }

    jumpHandler = () => {
        let {history} = this.props
        history.push('/reserve-bid/faq')
    }

    render() {
        let {reserve_bid, history} = this.props
        let {context} = reserve_bid.bid_data
        let banner_section = () => {
            return <div styleName="topInfo">
                <div styleName="infoRate">
                    <div styleName="rateUp">
                        <span>{context.loadRate}</span>
                        <span styleName="percent">%</span>
                        <span styleName="addRate">{context.addRate == 0 ? '' : `+${context.addRate}%`}</span>
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
                    <div styleName="fLineItem fLineItem1">{context.startTime}</div>
                    <div styleName="fLineItem fLineItem2">{context.valueTime}</div>
                    <div styleName="fLineItem fLineItem3">{context.paymentTime}</div>
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

        let ruler_section = () => {
            return <div styleName="rulerBox">
                <div styleName="subTitle">
                    预约规则
                </div>
                <div styleName="rulerContent">
                    1. 预约成功后，系统将冻结预约金额，将按照系统匹配规则为出借人匹配掌众优质资产；
                    <br/>2. 出借人预约出借的期限为预计42天时，即第一期21天产品到期后本息复投一次，到期后的本息和会自动复投到下一期21天产品；63天同理。
                    <br/>3. 加息部分收益在预约项目到期后以工豆形式发放到出借人账户中，如果因出借人将部分/全部回款资金中途退出或者提现，导致部分/全部回款资金复投失败的，复投失败的资金不享受加息部分收益，剩余复投成功的资金按照期限享受加息收益。加息收益=最后一期的实际出借金额*出借期限/360*计息比例。如果是非因出借人原因导致复投失败的，则平台会按照出借人实际出借期限享受加息收益；
                    <br/>4. 在每期回款到期后系统会自动将本息复投至下一期产品，一般情况下回款当日起息，如因特殊情况导致的回款当日无法起息，则匹配时间不计息（最长不超3个工作日）。
                    <br/>5. 预约有效期为3天，2小时内不可取消预约，3天内系统未成功为出借人匹配项目，预约冻结资金将实时解冻并退回至出借人的存管银行电子账户内；
                    <br/>6. 预约出借暂不支持使用工豆、返息券、返现券，敬请期待；
                    <br/>7. 取消预约后，系统将不再为出借人匹配项目，剩余未匹配资金将实时解冻并退还至出借人的存管银行电子账户内。
                    <br/>8. 如要查看产品预计到期日，请参见预约记录。
                    <br/>9. 本产品暂不支持债权转让功能。
                </div>
            </div>
        }

        let intro_section = () => {
            return <div styleName="introduceBox">
                <div styleName="introduceTitle">
                    产品详情
                </div>
                <div styleName="introduceText">
                    <div styleName="textTitle">
                        本产品为基于到期本息自动复投功能开发的产品，您所出借的项目是掌众金服旗下闪电借款精心筛选的优质21天借款项目，借款用途为日常消费，金额在 500 元一 1 万元。所有投资等级加息、返利、活动等奖励均按照所投当期21天产品为计算依据。
                    </div>
                    <div>借款用途：日常消费（借款人保证按照借款用途使用资金）</div>
                    <div>还款来源：个人收入</div>
                    <div>预计起息日：出借资金划转至借款人存管银行电子账户之日</div>
                    <div>限额管理：单个借款人单笔借款没有超过监管要求的借款余额上限</div>
                    <div styleName="textTitle">还款保障：</div>
                    <div styleName="sectionText">
                        一、闪电借款基于大数据风控建模体系，北京掌众金融信息服务有限公司通过自主研发出国内领先的“如来”风控引擎，已经成为国内实现纯在线自动化审核信审的平台，有效控制用户的欺诈与信用风险，保障客户的投资安全性。
                    </div>
                    <div styleName="sectionText">
                        二、闪电借款主要借款客户具备良好的经济偿还能力，属于可持续发展和培育的“高成长性人群”。
                    </div>
                    <div styleName="sectionText">
                        三、预约项目由北京掌众金融信息服务有限公司为出借人提供无限连带责任保证担保。
                        <br/>
                        <br/>
                        北京掌众金融信息服务有限公司成立于2014年3月，中国互联网金融协会理事单位；作为基于大数据风控的自动化助货平台，掌众金融为银行等传统金融机构提供大数据风控等技术支持，专注为有小额、短期资金需求的蓝领及新白领提供满足消费需求的现金贷和消费分期服务。
                        <br/>
                        掌众金融坚持“移动普惠，让生活更好”，以小额分散为基本原则，以风控机器人为技术驱动，通过互联网、大数据技术帮助“信用空白”用户建立信用档案，让信用变得更有价值！
                    </div>
                </div>
            </div>
        }
        let records_section = () => {
            let record_btn_style = Browser.inIOSApp ? "recordBtnIos" : "recordBtn"
            return <div styleName={record_btn_style} onClick={() => history.push('/reserve-bid/records')}>
                预约记录
            </div>
        }
        return <div styleName='infoPanel'>
            <Header noClose title="详情" history={history}/>
            {banner_section()}
            {timeline_section()}
            {advanced_section()}
            {ruler_section()}
            {intro_section()}
            <div styleName="jumpLink" onClick={this.jumpHandler}>
                <div styleName="jumpLinkText">常见问题</div>
                <div styleName="jumpLinkArrow"></div>
            </div>
            <div styleName="bottomBox">
                <div styleName="reserveBtn" onClick={this.reserveHandler}>立即预约</div>
            </div>
            {records_section()}
        </div>
    }
}

export default ReserveInfo
