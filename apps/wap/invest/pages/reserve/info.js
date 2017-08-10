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
                history.push('/user/evaluate')
            } else if (data.batchMaxmum === 0) {
                //调到自动投资页面
                NativeBridge.toNative('auto_bid_auth')
            } else {
                history.push('/reserve/apply')
            }
        })

    }

    render() {
        let { reserve, history } = this.props
        let { context } = reserve
        return <div styleName='infoPanel'>
            <Header title="详情" history={history} show_close={false} />
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
                <span styleName="tipsItem">预计今日起息</span>
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
                        投标（自动）
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
                    <div styleName="textTitle">产品介绍</div>
                    <div styleName="sectionOne">
                        您所投资的项目是掌众金服旗下闪电借款精心筛选的优质借款项目，借款用途为日常消费，金额在500元 - 1万元，请放心投资。
                    </div>
                    <div styleName="sectionTwo">
                        闪电借款是掌众金服在2014年3月基于移动互联网针对个人用户推出的小额资金借贷周转平台，为借款人提供短期21天、额度在1万元以下的小额急借撮合。自业务开展以来，闪电借款以通过寻找最优质的借款人，分散出借的方式，并基于大数据风控建模体系，自主研发出国内领先的“如来”风控引擎，成为国内首家实现纯在线自动化信审的平台，有效控制用户的欺诈与信用风险，保障您的投资安全。
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
