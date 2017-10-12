import React from 'react'
import CSSModules from 'react-css-modules'
import {observer, inject} from 'mobx-react'
import {Header, BottomNavBar} from '../../components'
import styles from '../../css/investor/bean.css'

const bean_data = [{money: 1000}, {money: 200}]

@inject('investor')
@observer
@CSSModules(styles, {"allowMultiple": true, "errorWhenNotFound": false})
class Bean extends React.Component {
    render() {
        let {history} = this.props
        let bean_func = (item, index) => {
            return <div styleName="beanItem" key={index}>
                <div styleName="beanItemUp">
                    <div styleName="beanUpLeft">工豆个数</div>
                    <div styleName={item.money > 200 ? "beanUpRight colorRed" : "beanUpRight colorGreen"}>
                        {item.money > 200 ? `+${item.money}` : `-${item.money}`}
                    </div>
                </div>
                <div styleName="beanItemDown">
                    <div styleName="beanDownLeft">期间返利0.25%</div>
                    <div styleName="beanDownRight">有效期 2017-09-18</div>
                </div>
            </div>
        }
        return <div>
            <Header title="他的工豆" history={history}/>
            <div styleName="beanInfo">
                <div styleName="line1">他的工豆</div>
                <div styleName="line2">¥0.17<span styleName="lineCal">（总共17工豆，100工豆=0.01元）</span></div>
                <div styleName="line3">即将过期：¥0.00</div>
            </div>
            {bean_data.map(bean_func)}
        </div>
    }
}

export default Bean