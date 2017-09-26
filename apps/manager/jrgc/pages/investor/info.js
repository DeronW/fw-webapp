import React from 'react'
import CSSModules from 'react-css-modules'
import {observer, inject} from 'mobx-react'
import {Header} from '../../components'
import styles from '../../css/investor/info.css'

@CSSModules(styles, {"allowMultiple": true, "errorWhenNotFound": false})
class Info extends React.Component {
    render() {
        let {history} = this.props
        return <div styleName="bg">
            <Header title="客户详情" history={history}/>
            <div styleName="bar">
                <div styleName="leftBar">
                    <img src={require('../../images/investor/info/man.png')}/>
                    <div styleName="level">VIP1</div>
                </div>
                <div styleName="rightBar">
                    <div styleName="name">张三<span>(1982.10.5)</span></div>
                    <div styleName="amount">差<span>789元</span>年化投资额升级VIP2</div>
                    <div styleName="time">注册时间  2014.01.21 16:56:35</div>
                </div>
                <div styleName="bottomBar">
                    <div styleName="itemBar">
                        <div styleName="itemBarNum">450.00</div>
                        <div styleName="itemBarText">工豆(元)</div>
                    </div>
                    <div styleName="itemBar">
                        <div styleName="itemBarNum">5</div>
                        <div styleName="itemBarText">优惠券(张)</div>
                    </div>
                    <div styleName="itemBar">
                        <div styleName="itemBarNum">0.5万</div>
                        <div styleName="itemBarText">工分</div>
                    </div>
                </div>
            </div>
        </div>
    }
}

export default Info