import React from 'react'
import CSSModules from 'react-css-modules'
import { observer, inject } from 'mobx-react'
import { Event,Components } from 'fw-javascripts'

import styles from '../../css/investor/item-collection.css'

@inject('investor_account')
@observer
@CSSModules(styles, { "allowMultiple": true, "errorWhenNotFound": false })
class itemCollection extends React.Component {
    componentDidMount(){
        let {fetchBatchInfo,fetchBatchList} = this.props.investor_account
        fetchBatchInfo()
        fetchBatchList()
        Event.touchBottom(fetchBatchList)
    }
    componentWillUnmount() {
        Event.cancelTouchBottom()
    }
    render() {
        let { history } = this.props
        let { info,totalCount,records } = this.props.investor_account.data_p2p.batch
        let SVGCircleProgress = Components.SVGCircleProgress

        let recordFn = (item,index) => {
            return  <div styleName="record">
                <div styleName="title">
                    <span>{item.prdName}</span>
                    <div styleName="end">{item.status}</div>
                </div>
                <div styleName="item">
                    <span>预期年化收益率</span>
                    <span styleName="bold">{item.loanAnnualRate}</span>
                </div>
                <div styleName="item">
                    <span>起息日</span>
                    <span>{item.loadDate}天</span>
                </div>
                <div>
                    <span>计划回款日</span>
                    <span>{item.repayTime }天</span>
                </div>
                <div styleName="item">
                    <span>出借金额</span>
                    <span styleName="red">¥{item.investAmt}</span>
                </div>
                <div styleName="item">
                    <span>交易时间</span>
                    <span>{item.createDate}</span>
                </div>
            </div>
        }
        let empty = <div styleName="empty">
            <img src={require('../../images/investor/empty.png')}/>
        </div>
        return <div styleName="bg">
            <div styleName="bar">
                <div styleName="header">
                    <a styleName="btn" onClick={history.goBack}> </a>
                    {info.colName}
                </div>
                <div styleName="earnings">年化收益 <span>{item.colRate}</span></div>
                <div styleName="time">投资期限 <span>{item.colPeriod}天</span></div>
                <div styleName="info">
                    <div styleName="start">100元起</div>
                    <div styleName="start">一次结清</div>
                    <div styleName="amount">可投金额 ¥{info.canBuyAmt}</div>
                    <div styleName="number">可投项目 {info.canBuyCount}个</div>
                </div>
                <div styleName="circle">
                    <SVGCircleProgress percent={info.percentage} weight={12}
                        radius={120} bgColor={'#64353f'} progressColor={'#fde143'} />
                    <div styleName="percent">{info.percentage}</div>
                </div>
            </div>
            <div styleName="invest">投资详情（{totalCount}个子标）</div>
            <div styleName="records">
                {records && records.length > 0?records.map(recordFn):empty}
                {records.length>0 && <div styleName="load">已经全部加载完毕</div>}
            </div>
        </div>
    }
}
export default itemCollection