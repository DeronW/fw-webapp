import React from 'react'
import CSSModules from 'react-css-modules'
import {observer, inject} from 'mobx-react'
import {Header, BottomNavBar} from '../../components'
import styles from '../../css/vistor/score.css'

const score_data = [{money: 1000}, {money: 200}]

@CSSModules(styles, {"allowMultiple": true, "errorWhenNotFound": false})
class Score extends React.Component {
    render() {
        let {history} = this.props
        let score_func = (item, index) => {
            return <div styleName="scoreItem" key={index}>
                <div styleName="itemUp">
                    <div styleName={item.money > 200 ? "upLeft leftRed" : "upLeft leftGreen"}>
                        {item.money > 200 ? `+${item.money}` : `-${item.money}`}
                    </div>
                    <div styleName="upRight">2016-03-24</div>
                </div>
                <div styleName="itemDown">投资奖励；买入利随享6761赠送</div>
            </div>
        }
        return <div>
            <Header history={history} title="他的工分"/>
            <div styleName="total">
                <div styleName="title">他的工分</div>
                <div styleName="totalNumber">2000</div>
            </div>
            <div styleName="info">
                <div styleName="infoLeft">
                    <div styleName="lineUp">冻结工分数量</div>
                    <div styleName="lineDown">20000</div>
                </div>
                <div styleName="infoRight">
                    <div styleName="lineUp">即将过期工分</div>
                    <div styleName="lineDown">10000</div>
                </div>
            </div>
            {score_data.map(score_func)}
        </div>
    }
}

export default Score