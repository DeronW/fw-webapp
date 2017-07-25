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
        this.props.reserve.reserveHandler()
    }

    render() {
        let {reserve} = this.props
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
                        <div>预约出借</div>
                    </div>
                    <div styleName="flowArrow">
                        <img src={require('../images/details/arrow.png')}/>
                    </div>
                    <div styleName="flowItem">
                        <img src={require('../images/details/flow2.png')}/>
                        <div>冻结资金</div>
                    </div>
                    <div styleName="flowArrow">
                        <img src={require('../images/details/arrow.png')}/>
                    </div>
                    <div styleName="flowItem">
                        <img src={require('../images/details/flow3.png')}/>
                        <div>投标（自动）</div>
                    </div>
                    <div styleName="flowArrow">
                        <img src={require('../images/details/arrow.png')}/>
                    </div>
                    <div styleName="flowItem">
                        <img src={require('../images/details/flow4.png')}/>
                        <div>起息</div>
                    </div>
                </div>
            </div>
        </div>
    }
}
export default Details
