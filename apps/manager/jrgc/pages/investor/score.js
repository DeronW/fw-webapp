import React from 'react'
import CSSModules from 'react-css-modules'
import { observer, inject } from 'mobx-react'
import { Event, Components, Utils } from 'fw-javascripts'
import { Header, BottomNavBar } from '../../components'
import styles from '../../css/investor/score.css'

@inject('investor')
@observer
@CSSModules(styles, { "allowMultiple": true, "errorWhenNotFound": false })
class Score extends React.Component {
    componentDidMount() {
        let { fetchScore, resetScorePageNo } = this.props.investor
        resetScorePageNo()
        fetchScore()
        Event.touchBottom(fetchScore)
    }
    componentWillUnmount() {
        Event.cancelTouchBottom()
    }
    render() {
        let { history } = this.props
        let { score } = this.props.investor.data
        let { info, records } = score

        let score_func = (item, index) => {
            return <div styleName="scoreItem" key={index}>
                <div styleName="itemUp">
                    <div styleName={item.cashAmount > 0 ? "upLeft leftRed" : "upLeft leftGreen"}>
                        {item.cashAmount > 0 ? `+${item.cashAmount}` : item.cashAmount}
                    </div>
                    <div styleName="upRight">{item.createtime}</div>
                </div>
                <div styleName="itemDown">{item.remark}</div>
            </div>
        }
        let empty = <div styleName="empty">
            <img src={require('../../images/investor/empty.png')} />
        </div>
        return <div>
            <Header history={history} title="他的工分" />
            <div styleName="total">
                <div styleName="title">他的工分</div>
                <div styleName="totalNumber">{info.iintegralNum}</div>
            </div>
            <div styleName="info">
                <div styleName="infoLeft">
                    <div styleName="lineUp">冻结工分数量</div>
                    <div styleName="lineDown">{info.frozenAmount}</div>
                </div>
                <div styleName="infoRight">
                    <div styleName="lineUp">即将过期工分</div>
                    <div styleName="lineDown">{info.willExpireAmount}</div>
                </div>
            </div>
            {records && records.length > 0 ? records.map(score_func) : empty}
        </div>
    }
}

export default Score