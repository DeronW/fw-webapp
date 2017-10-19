import React from 'react'
import CSSModules from 'react-css-modules'
import { observer, inject } from 'mobx-react'
import { Event, Components, Utils } from 'fw-javascripts'
import { Header, BottomNavBar } from '../../components'
import styles from '../../css/investor/bean.css'

@inject('investor')
@observer
@CSSModules(styles, { "allowMultiple": true, "errorWhenNotFound": false })
class Bean extends React.Component {
    componentDidMount() {
        let { fetchBean, resetBeanPageNo, setBeanId } = this.props.investor
        resetBeanPageNo()
        setBeanId(Utils.hashQuery.custId)
        fetchBean()
        Event.touchBottom(fetchBean)
    }
    componentWillUnmount() {
        Event.cancelTouchBottom()
    }
    render() {
        let { history } = this.props
        let { bean } = this.props.investor.data
        let { info,records } = bean
        console.log(info)
        let bean_func = (item, index) => {
            return <div styleName="beanItem" key={index}>
                <div styleName="beanItemUp">
                    <div styleName="beanUpLeft">工豆个数</div>
                    <div styleName={item.beanCount > 0 ? "beanUpRight colorRed" : "beanUpRight colorGreen"}>
                        {item.beanCount > 0 ? `+${item.beanCount}` : item.beanCount}
                    </div>
                </div>
                <div styleName="beanItemDown">
                    <div styleName="beanDownLeft">{item.remark}</div>
                    <div styleName="beanDownRight">有效期 {item.overdueTime}</div>
                </div>
            </div>
        }
        let empty = <div styleName="empty">
            <img src={require('../../images/investor/empty.png')} />
        </div>
        return <div>
            <Header title="他的工豆" history={history} />
            <div styleName="beanInfo">
                <div styleName="line1">他的工豆</div>
                <div styleName="line2">¥{info.cashBalance}<span styleName="lineCal">（总共{(info.cashBalance)*100}工豆，100工豆=0.01元）</span></div>
                <div styleName="line3">即将过期：¥{info.overbeancount}</div>
            </div>
            {records && records.length > 0 ? records.map(score_func) : empty}
        </div>
    }
}


export default Bean