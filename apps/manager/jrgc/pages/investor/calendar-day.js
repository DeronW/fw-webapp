import React from 'react'
import CSSModules from 'react-css-modules'
import { observer, inject } from 'mobx-react'
import { Utils } from 'fw-javascripts'

import styles from '../../css/investor/calendar-day.css'

@inject('investor')
@observer
@CSSModules(styles, { "allowMultiple": true, "errorWhenNotFound": false })
class calendarDay extends React.Component {
    state = {
        tab: '即将到期',
        date: Utils.hashQuery.date
    }
    componentDidMount() {
        let { tab, date } = this.state
        let { fetchDueDay } = this.props.investor

        fetchDueDay(tab, date)
    }
    switchTab = tab => {
        if (tab == this.state.tab) return
        let { fetchDueDay } = this.props.investor

        this.setState({ tab: tab }, fetchDueDay(tab, this.state.date))
    }
    formatDateHandler = (date) => {
        let d = new Date(date)
        var t = d.getFullYear() + "年" + d.getMonth() + 1 + "月" + d.getDate() + "日"
        return t
    }
    render() {
        let { history } = this.props
        let tabs = ['即将到期', '已到期']
        let { tab } = this.state
        let { calendar } = this.props.investor.data
        let { dayDueList } = calendar

        let tabFn = (item, index) => {
            return <div key={index} styleName={item == tab ? "tab tabActive" : "tab"}
                onClick={() => this.switchTab(item)}>{item}
            </div>
        }
        let dueFn = (dueItem, dueIndex) => {
            let personFn = (personItem, personIndex) => {
                return <div styleName="investor" key={personItem.custId}>
                    <div styleName="investorName">{personItem.realName}</div>
                    <div styleName={personFn.busType == 2 ? "investorAmount" : "investorAmountRed"}>{personItem.total}</div>
                    <div styleName="investorText">{personItem.principal} | {personItem.interest}</div>
                </div>
            }
            return <div styleName="dueItem" key={dueItem.createDate}>
                <div styleName="dueDate">
                    <div>{this.formatDateHandler(Object.keys(dueItem.createDate)[dueIndex])}</div>
                </div>
                <div styleName="investorList">
                    {dueItem.createData.map(personFn)}
                </div>
            </div>
        }
        return <div styleName="bg">
            <div styleName="header">
                <a styleName="btnBack" onClick={history.goBack}></a>
                <div styleName="tabs">
                    {tabs.map(tabFn)}
                </div>
            </div>
            <div styleName="dueList">
                {/*dayDueList.map(dueFn)*/}
                <div styleName="dueItem">
                    <div styleName="dueDate">
                        <div>2017年8月13日</div>
                    </div>
                    <div styleName="investorList">
                        <div styleName="investor">
                            <div styleName="investorName">李丽华</div>
                            <div styleName="investorAmount">10.000克</div>
                            <div styleName="investorText">购买克重790.000克 | 收益克重110.000克</div>
                        </div>
                        <div styleName="investor">
                            <div styleName="investorName">李丽华</div>
                            <div styleName="investorAmountRed">￥90.00万</div>
                            <div styleName="investorText">购买克重790.000克 | 收益克重110.000克</div>
                        </div>
                    </div>
                </div>
                <div styleName="dueItem">
                    <div styleName="dueDate">
                        <div>2017年8月14日</div>
                    </div>
                    <div styleName="investorList">
                        <div styleName="investor">
                            <div styleName="investorName">李丽华</div>
                            <div styleName="investorAmount">10.000克</div>
                            <div styleName="investorText">购买克重790.000克 | 收益克重110.000克</div>
                        </div>
                        <div styleName="investor">
                            <div styleName="investorName">李丽华</div>
                            <div styleName="investorAmountRed">￥90.00万</div>
                            <div styleName="investorText">购买克重790.000克 | 收益克重110.000克</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    }
}
export default calendarDay