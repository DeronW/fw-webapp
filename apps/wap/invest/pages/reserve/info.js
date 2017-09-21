import React from 'react'
import CSSModules from 'react-css-modules'
import { observer, inject } from 'mobx-react'
import { Header } from '../../components/'
import styles from '../../css/reserve/info.css'
import { NativeBridge } from '../../helpers'
import { Browser } from '../../helpers'

@inject('reserve')
@observer
@CSSModules(styles, { "allowMultiple": true, "errorWhenNotFound": false })
class ReserveInfo extends React.Component {

    componentDidMount() {
        NativeBridge.trigger('hide_header')
        this.props.reserve.fetchProduct()
    }

    reserveHandler = () => {
        let { history, reserve } = this.props
        reserve.fetchProduct().then(data => {
            if (data.isRisk == 0) {
                history.push('/user/evaluate?next_url=/reserve/info')
            } else if (data.batchMaxmum === 0) {
                //调到自动投资页面
                NativeBridge.toNative('auto_bid_auth')
            } else {
                history.push(`/reserve/apply?applyInvestClaimId=${this.props.reserve.applyInvestClaimId}`)
            }
        })

    }

    render() {
        let { reserve, history } = this.props
        let { context } = reserve
        return <div styleName='infoPanel'>
            <Header noClose title="详情" history={history} />
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
            </div>
            <div styleName="tipsBox">
                {/* <span styleName="tipsItem">预计今日起息</span> */}
                <span styleName="tipsItem">{context.minAmt}元起预约</span>
            </div>
            <div styleName="flowBox">
                <div styleName="flowHeader">预约流程</div>
                <div styleName="flowContent">
                    <div styleName="tab-item tab-book">
                        预约出借
                    </div>
                    <div styleName="tab-item tab-froze">
                        冻结资金
                    </div>
                    <div styleName="tab-item tab-bid">
                        投标(自动)
                    </div>
                    <div styleName="tab-item tab-interest">
                        起息
                    </div>
                    <div styleName="icon-arrow icon-arrow1"></div>
                    <div styleName="icon-arrow icon-arrow2"></div>
                    <div styleName="icon-arrow icon-arrow3"></div>
                </div>
            </div>
            <div styleName="introduceBox">
                <div styleName="introduceTitle">
                    产品详情
                </div>
                <div styleName="introduceText">

                    <div styleName="textTitle">预约宝规则介绍</div>
                    <div styleName="sectionOne">
                        1、预约成功后，系统将实时为您匹配掌众优质资产，项目起息时间以实际出借起息时间为准，如遇节假日或其他特殊情况会出现预约出借起息超过T+1情况，请您谅解；
                        <br />2、预约有效期为3天，3天内系统未成功为您匹配项目，预约冻结资金将实时解冻并退回至微金账户内；
                        <br />3、预约出借暂不支持使用工豆、返息券、返现券，敬请期待；
                        <br />4、具体起息情况请前往“我的出借”查看；
                        <br />5、预约成功后，2小时内不可取消预约，取消预约后，系统将不再为您匹配项目，剩余未匹配资金将实时解冻并退还至您的微金账户内；
                    </div>

                    <div styleName="textTitle">产品介绍</div>
                    <div styleName="sectionTwo">
                        您所出借的项目是掌众金服旗下闪电借款精心筛选的优质21天借款项目，借款用途为日常消费，金额在 500 元一 1 万元。
                        <br />还款保障：
                    </div>
                    <div styleName="sectionTwo">
                        一、闪电借款基于大数据风控建模体系，北京掌众金融信息服务有限公司通过自主研发出国内领先的“如来”风控引擎，已经成为国内实现纯在线自动化审核信审的平台，有效控制用户的欺诈与信用风险，保障客户的投资安全性。
                    <br />二、闪电借款主要借款客户具备良好的经济偿还能力，属于可持续发展和培育的“高成长性人群”。
                    <br />三、项目由北京掌众金融信息服务有限公司为出借人提供无限连带责任保证担保。

                    <br />
                    <br />
北京掌众金融信息服务有限公司成立于2014年3月，中国互联网金融协会理事单位；作为基于大数据风控的自动化助货平台，掌众金融为银行等传统金融机构提供大 数据风控等技术支持，专注为有小额、短期资金需求的蓝领及新白领提供满足消费需求的现金贷和消费分期服务。
掌众金融坚持“移动普惠，让生活更好”，以小额分散为基本原则，以风控机器人为技术驱动，通过互联网、大数据技术帮助“信用空白”用户建立信用档案，让信用变得更有价值！

                    </div>
                </div>
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
