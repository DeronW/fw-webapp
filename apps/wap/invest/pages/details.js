import React from 'react'
import CSSModules from 'react-css-modules'
import {observer, inject} from 'mobx-react'
import Header from '../components/header'
import styles from '../css/details.css'

@inject('reserve')
@observer
@CSSModules(styles, {"allowMultiple": true, "errorWhenNotFound": false})
class Details extends React.Component {

    componentDidMount() {
        this.props.reserve.getDataHandler()
    }

    jumpRecordHandler = () => {
        let {history} = this.props
        history.push(`/my-reserve`)
    }

    render() {
        let {reserve, history, location} = this.props
        return <div>
            <Header title="详情" history={history} show_close={false}/>
            <div styleName="topInfo">
                <div styleName="infoRate">
                    <div styleName="rateUp">
                        <span>6</span><span styleName="percent">%</span>
                    </div>
                    <div styleName="rateDown">
                        年化借款利率
                    </div>
                </div>
                <div styleName="garyGap"></div>
                <div styleName="infoDate">
                    <div styleName="dateUp">
                        <span>21</span><span styleName="percent">天</span>
                    </div>
                    <div styleName="dateDown">
                        期限
                    </div>
                </div>
            </div>
            <div styleName="tipsBox">
                <span styleName="tipsItem">平均2小时起息</span>
                <span styleName="tipsItem">100元起预约</span>
            </div>
            <div styleName="flowBox">
                <div styleName="flowHeader">预约流程</div>
                <div styleName="flowContent">
                    <div styleName="flowItem">
                        <img src={require('../images/details/flow1.png')}/>
                        <div styleName="flowItem1">预约出借</div>
                    </div>
                    <div styleName="flowArrow">
                        <img src={require('../images/details/arrow.png')}/>
                    </div>
                    <div styleName="flowItem">
                        <img src={require('../images/details/flow2.png')}/>
                        <div styleName="flowItem2">冻结资金</div>
                    </div>
                    <div styleName="flowArrow">
                        <img src={require('../images/details/arrow.png')}/>
                    </div>
                    <div styleName="flowItem">
                        <img src={require('../images/details/flow3.png')}/>
                        <div styleName="flowItem3">投标（自动）</div>
                    </div>
                    <div styleName="flowArrow">
                        <img src={require('../images/details/arrow.png')}/>
                    </div>
                    <div styleName="flowItem">
                        <img src={require('../images/details/flow4.png')}/>
                        <div styleName="flowItem4">起息</div>
                    </div>
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
                <div styleName="recordBtn">预约记录</div>
                <div styleName="reserveBtn" onClick={() => reserve.reserveHandler(history)}>立即预约</div>
            </div>
        </div>
    }
}
export default Details
