import React from 'react'
import CSSModules from 'react-css-modules'
import { observer, inject } from 'mobx-react'
import { Header } from '../../components'

import styles from '../../css/investor/calendar.css'

@CSSModules(styles, { "allowMultiple": true, "errorWhenNotFound": false })
class Calendar extends React.Component {
    state = {
        month: 8,
        selectedIndex: 0,
        monthArrow:true,
        tab:'即将到期'
    }

    addMonthHandler = () => {
        let { month } = this.state
        let m = 1
        if (month < 12) {
            m = month + 1
        } else {
            m = 1
        }
        this.setState({ month: m })
    }
    reduceMonthHandler = () => {
        let { month } = this.state
        let n = 1
        if (month > 1) {
            n = month - 1
        } else {
            n = 12
        }
        this.setState({ month: n })
    }
    switchMonthArrowHandler = () => {
        this.setState({monthArrow:!this.state.monthArrow})
    }
    selectedHandler = (index) => {
        this.setState({ selectedIndex: index })
    }
    switchTabHandler = (tab) => {
        if(tab==this.state.tab) return
        this.setState({tab:tab})
    }
    render() {
        let { history } = this.props
        let { month, selectedIndex,monthArrow,tab } = this.state

        let tabFn = (item,index) => {
            return <div styleName="dueTab" key={index} onClick={()=>this.switchTabHandler(item)}>
                <div styleName={tab==item?"tab tabActive":"tab"}>{item}</div>
            </div>
        }
        return <div styleName="bg">
            <Header title="回款日历" history={history} />
            <div styleName="capital">
                <div styleName="capitalAmount">¥2,000.00万</div>
                <div styleName="capitalText">总待收本金</div>
            </div>
            <div styleName="collect">
                <div styleName="collectItem">
                    <div styleName="collectText">总待收利息</div>
                    <div styleName="collectAmount">¥20,000.00</div>
                </div>
                <div styleName="collectItem">
                    <div styleName="collectText">总待收黄金</div>
                    <div styleName="collectAmount">¥20,000.00克</div>
                </div>
            </div>
            <div styleName="monthBox">
                <div styleName="leftBtn" onClick={this.reduceMonthHandler}></div>
                <div styleName="month">2017年{month}月</div>
                <div styleName="rightBtn" onClick={this.addMonthHandler}></div>
                <div styleName={monthArrow?"monthArrow monthArrowUp":"monthArrow"} onClick={this.switchMonthArrowHandler}></div>
            </div>
            <div styleName="days" style={{display:monthArrow?'block':'none'}}>
                <div styleName="dayBox">
                    {/*
                        <div styleName={selectedIndex==index?'day daySelected':'day'} onClick={()=>{this.selectedIndex(index)}}>
                            <div styleName="week">06日 星期日</div>
                            <div styleName="circle"></div>
                            <div styleName="receivable">6笔回款</div>
                            <div styleName="receivable actual">1笔回款</div>
                        </div>
                    */}
                    <div styleName="day">
                        <div styleName="week">06日 星期日</div>
                        <div styleName="circle"></div>
                        <div styleName="receivable">6笔回款</div>
                        <div styleName="receivable actual">1笔回款</div>
                    </div>
                    <div styleName="day daySelected">
                        <div styleName="week">06日 星期日</div>
                        <div styleName="circle"></div>
                        <div styleName="receivable">6笔回款</div>
                        <div styleName="receivable actual">1笔回款</div>
                    </div>
                    <div styleName="day">
                        <div styleName="week">06日 星期日</div>
                        <div styleName="circle"></div>
                        <div styleName="receivable">6笔回款</div>
                        <div styleName="receivable actual">1笔回款</div>
                    </div>
                    <div styleName="day">
                        <div styleName="week">06日 星期日</div>
                        <div styleName="circle"></div>
                        <div styleName="receivable">6笔回款</div>
                        <div styleName="receivable actual">1笔回款</div>
                    </div>
                    <div styleName="day">
                        <div styleName="week">06日 星期日</div>
                        <div styleName="circle"></div>
                        <div styleName="receivable">6笔回款</div>
                        <div styleName="receivable actual">1笔回款</div>
                    </div>
                    <div styleName="day">
                        <div styleName="week">06日 星期日</div>
                        <div styleName="circle"></div>
                        <div styleName="receivable">6笔回款</div>
                        <div styleName="receivable actual">1笔回款</div>
                    </div>
                </div>
            </div>
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
                        <div styleName="dateAmount">￥600.00万</div>
                        <div styleName="dateAmount">1,000.000克</div>
                    </div>
                </div>
                <div styleName="dateItem">
                    <div styleName="dateDemind">本月已回款</div>
                    <div styleName="dateAmountBox">
                        <div styleName="dateAmount">￥600.00万</div>
                        <div styleName="dateAmount">1,000.000克</div>
                    </div>
                </div>
            </div>
            <div styleName="due">
                {['即将到期','已到期'].map(tabFn)}
            </div>
            <div styleName="dueList">
                <div styleName="dueItem">
                    <div styleName="dueDate">
                        <div>2017年8月13日</div>
                        <div></div>
                    </div>
                    <div styleName="investorList">
                        <div styleName="investor"></div>
                    </div>
                </div>
            </div>
        </div>
    }
}
export default Calendar