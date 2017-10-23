import React from 'react'
import CSSModules from 'react-css-modules'
import { observer, inject } from 'mobx-react'
import { Header } from '../../components'

import styles from '../../css/investor/calendar.css'

@inject('investor')
@observer
@CSSModules(styles, { "allowMultiple": true, "errorWhenNotFound": false })
class Calendar extends React.Component {
    state = {
        month: new Date().getMonth() + 1,
        year: new Date().getFullYear(),
        selectedIndex: 0,
        monthArrow: true,
        tab: '即将到期',
        toggleList: []
    }
    componentDidMount() {
        let { fetchMonthCal, fetchMonthInfo, fetchDueMonth, fetchOverview } = this.props.investor
        let { tab, month, year } = this.state

        fetchOverview()
        fetchMonthCal(this.getMonthHandler(year, month))
        fetchMonthInfo(this.getMonthHandler(year, month))
        fetchDueMonth(tab, this.getMonthHandler(year, month))
    }
    addMonthHandler = () => {
        let { month, year } = this.state
        var m = month, y = year

        if (month < 12) {
            m = Number(month) + 1
        } else {
            m = 1
            y = year + 1
        }
        this.updateDateHandler(y, m)
    }
    reduceMonthHandler = () => {
        let { month, year } = this.state
        var m = month, y = year

        if (month > 1) {
            m = Number(month) - 1
        } else {
            m = 12
            y = year - 1
        }
        this.updateDateHandler(y, m)
    }
    updateDateHandler = (year, month) => {
        let { fetchMonthCal, fetchMonthInfo, fetchDueMonth } = this.props.investor
        let { tab } = this.state

        this.setState({
            month: month,
            year: year
        }, fetchMonthCal(this.getMonthHandler(year, month)), fetchMonthInfo(this.getMonthHandler(year, month)), fetchDueMonth(tab, this.getMonthHandler(year, month)))
    }
    getMonthHandler = (y, m) => {
        if (m < 10) m = `0${m}`
        let month = `${y}-${m}`
        return month
    }
    selectedHandler = (index, date) => {
        let { history } = this.props
        this.setState({ selectedIndex: index })
        history.push(`/investor-calendar-day?date=${date}`)

    }
    switchMonthArrowHandler = () => {
        this.setState({ monthArrow: !this.state.monthArrow })
    }
    switchTabHandler = (tab) => {
        let { fetchDueMonth } = this.props.investor
        let { month, year } = this.state

        if (tab == this.state.tab) return
        this.setState({ tab: tab }, fetchDueMonth(tab, this.getMonthHandler(year, month)))
    }
    toggleHandler = (index) => {
        let t = this.state.toggleList
        t[index] = !t[index]
        this.setState({ toggleList: t })
    }
    formatDateHandler = (date) => {
        let d = new Date(date)
        var t = d.getFullYear() + "年" + d.getMonth() + 1 + "月" + d.getDate() + "日"
        return t
    }
    render() {
        let { history } = this.props
        let { month, year, selectedIndex, monthArrow, tab } = this.state
        let { calendar } = this.props.investor.data
        let { overview, calendarList, monthInfo, monthDueList } = calendar

        let tabFn = (item, index) => {
            return <div styleName="dueTab" key={index} onClick={() => this.switchTabHandler(item)}>
                <div styleName={tab == item ? "tab tabActive" : "tab"}>{item}</div>
            </div>
        }
        let dayFn = (item, index) => {
            return <div key={index} styleName={selectedIndex == index ? 'day daySelected' : 'day'} onClick={() => { this.selectedHandler(index, item.date) }}>
                <div styleName="week">{item.day} {item.weekDate}</div>
                <div styleName="circle"></div>
                <div styleName="receivable">{item.totalPlanCount}笔回款</div>
                <div styleName="receivable actual">{item.totalRealCount}笔回款</div>
            </div>
        }

        let dueFn = (dueItem, dueIndex) => {
            let toggleId = this.state.toggleList[dueIndex]

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
                    <div onClick={() => this.toggleHandler(dueIndex)}></div>
                </div>
                <div styleName="investorList">
                    {toggleId && dueItem.createData.map(personFn)}
                </div>
            </div>
        }
        let empty = <div styleName="empty">
            <img src={require('../../images/investor/empty.png')} />
        </div>
        return <div styleName="bg">
            <Header title="回款日历" history={history} />
            <div styleName="capital">
                <div styleName="capitalAmount">¥{overview.principal}万</div>
                <div styleName="capitalText">总待收本金</div>
            </div>
            <div styleName="collect">
                <div styleName="collectItem">
                    <div styleName="collectText">总待收利息</div>
                    <div styleName="collectAmount">¥{overview.interest}</div>
                </div>
                <div styleName="collectItem">
                    <div styleName="collectText">总待收黄金</div>
                    <div styleName="collectAmount">¥{overview.goldAmt}克</div>
                </div>
            </div>
            <div styleName="monthBox">
                <div styleName="leftBtn" onClick={this.reduceMonthHandler}></div>
                <div styleName="month">{year}年{month}月</div>
                <div styleName="rightBtn" onClick={this.addMonthHandler}></div>
                <div styleName={monthArrow ? "monthArrow monthArrowUp" : "monthArrow"} onClick={this.switchMonthArrowHandler}></div>
            </div>
            {monthArrow && <div styleName="days">
                <div styleName="dayBox">
                    {calendarList.map(dayFn)}
                </div>
            </div>}
            <div styleName="date">
                <div styleName="dateType">
                    <div styleName="radius brown"></div>
                    <div styleName="dateText">实际回款日</div>
                    <div styleName="radius"></div>
                    <div styleName="dateText">计划回款日</div>
                </div>
                <div styleName="dateItem">
                    <div styleName="dateDemind">本月应回款</div>
                    <div styleName="dateAmountBox">
                        <div styleName="dateAmount">￥{monthInfo.planAmt}万</div>
                        <div styleName="dateAmount">{monthInfo.planGoldAmt}克</div>
                    </div>
                </div>
                <div styleName="dateItem">
                    <div styleName="dateDemind">本月已回款</div>
                    <div styleName="dateAmountBox">
                        <div styleName="dateAmount">￥{monthInfo.realAmt}万</div>
                        <div styleName="dateAmount">{monthInfo.realGoldAmt}克</div>
                    </div>
                </div>
            </div>
            <div styleName="due">
                {['即将到期', '已到期'].map(tabFn)}
            </div>
            <div styleName="dueList">
                {monthDueList&&monthDueList.length>0?monthDueList.map(dueFn):empty}
            </div>
        </div>
    }
}
export default Calendar