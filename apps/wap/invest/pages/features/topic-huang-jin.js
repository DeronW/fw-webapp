import React from 'react'
import CSSModules from 'react-css-modules'
import {Header} from '../../components'
import styles from '../../css/features/topic-huang-jin.css'

@CSSModules(styles, {allowMultiple: true, errorWhenNotFound: false})
class TopicGold extends React.Component {
    state = {
        num: 0
    }

    render() {
        return <div styleName="gold-box">
            <img src={require('../../images/features/topic-huang-jin/goldbanner.jpg')} styleName="gold-banner"/>
            <div styleName="gold-tab">
                {["项目简介", "资金安全", "投资案例", "合作机构", "常见问题"].map((item, index) => {
                    let active_style = this.state.num == index && styles['item-active']
                    return <div styleName="gold-tab-item" key={index}>
                        <div className={active_style}>{item}</div>
                    </div>
                })}
            </div>
            <div styleName="gold-intro">
                <div styleName="gold-title">
                    项目说明
                </div>
                <div styleName="intro-box">
                    <div styleName="gold-subtitle">什么是<span styleName="font-yellow">尊享金？</span></div>
                    <div styleName="intro-text">
                        尊享金是指由深圳市众瑞珠宝有限公司作为黄金项目运营方为平台用户提供的黄金销售服
                        务，同时接受用户委托，灵活运用其在黄金行业上下游资源，在用户购买黄金后自主选择的委托服务期限内，以一定方式管理用户所购黄金，协助购金用户实现实物黄金赚收益的目的，最终实现黄金保值、增值。
                    </div>
                </div>
                <div styleName="advange-box">
                    <div styleName="gold-subtitle">尊享金<span styleName="font-yellow">的优势</span></div>
                    <div styleName="advange-text">
                        <div><span styleName="icon-circle"></span>
                            期限丰富多样，目前<span styleName="font-red">以70天和100天为主</span>
                        </div>
                        <div>
                            <span styleName="icon-circle"></span>
                            到期自动转为期限灵活的黄金产品管理服务，用户可在交<span styleName="space">易时间内随时申请提金或申请回购黄金</span>
                        </div>
                        <div>
                            <span styleName="icon-circle"></span>
                            起贩克重起点低，<span styleName="font-red">1克即可</span>
                        </div>
                        <div>
                            <span styleName="icon-circle"></span>
                            利于抵抗通货膨胀，优化个人资产配置
                        </div>
                    </div>
                </div>
            </div>
        </div>
    }
}

export default TopicGold
