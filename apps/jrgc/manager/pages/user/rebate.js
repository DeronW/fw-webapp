import React from 'react'
import CSSModules from 'react-css-modules'
import ReactEcharts from 'echarts-for-react'
import {observer, inject} from 'mobx-react'
import styles from '../../css/user/rebate.css'
import {Event, Components} from 'fw-javascripts'

@inject("user")
@observer
@CSSModules(styles, {"allowMultiple": true, "errorWhenNotFound": false})
class Rebate extends React.Component {
    state = {
        tab_num: '0',
        chart_num: '0'
    }

    componentDidMount() {
        this.props.user.fetGraphData('11')
        this.props.user.resetPageNo()
        this.props.user.fetchCustList()
        this.props.user.fetchRebateInfo()
        Event.touchBottom(this.props.user.fetchCustList)
    }

    componentWillUnmount() {
        Event.cancelTouchBottom()
    }

    gotoHandler = (link) => {
        let {history} = this.props
        history.push(link)
    }

    switchTabHandler = (index) => {
        let {type} = this.props.user.data.rebate_cust
        let {setType,fetGraphData, fetchGraphSortNo} = this.props.user
        this.setState({tab_num: index})

        setType(index+1)
        fetGraphData(fetchGraphSortNo(index, this.state.chart_num))
    }

    chartTabHandler = (index) => {
        let {tab_num, chart_num} = this.state
        let {fetGraphData, fetchGraphSortNo} = this.props.user
        this.setState({chart_num: index})
        fetGraphData(fetchGraphSortNo(tab_num, index))
    }

    getOption = (updateTime, timeDimensionList, rebateAmtList) => ({
        title: {
            text: `当前数据更新于:${updateTime}`,
            textStyle: {
                color: '#555',
                fontSize: 16,
                padding: [0, 0, 10, 0]
            }
        },
        tooltip: {trigger: 'axis', axisPointer: {type: 'shadow'}},
        legend: {
            data: ['返利额']
        },
        xAxis: {
            name: '日期',
            data: timeDimensionList.flatten()
        },
        yAxis: {
            name: '金额(元)'
        },
        series: [{
            symbol: 'diamond',
            symbolSize: 8,
            showAllSymbol: true,
            smooth: true,
            lineStyle: {normal: {color: '#d75063'}},
            name: '返利额',
            type: 'line',
            data: rebateAmtList.flatten()
        }]
    })

    render() {
        let {history} = this.props;
        let {tab_num} = this.state;
        let {rebate_graph, rebate_cust,rebate_info} = this.props.user.data
        let {type, list} = this.props.user.data.rebate_cust
        let current_list = list[type], current_pageNo = current_list.page_no

        let tabs = ['全部', '微金', '尊享', '黄金']
        let tab_func = (item, index) => {
            return <div key={index} styleName={tab_num == index ? "tab tabActive" : "tab"}
                        onClick={() => this.switchTabHandler(index)}>
                {item}
            </div>
        }
        let itemFn = (item,index) => {
            return <div styleName="itemDetail" key={item.custId+index} onClick={() => this.gotoHandler(`/investor-info?custId=${item.custId}`)}>
                <div styleName="detailLine">
                    <div styleName="detailLeft">{item.custRealName}</div>
                    <div styleName="detailRight">¥{item.alreadyRebate}</div>
                </div>
                <div styleName="detailLine">
                    <div styleName="detailLeft userDes">{item.prdName} | {item.annualRate}% | {item.repayPeriod}</div>
                    <div styleName="detailRight userDate">{item.applyDate}</div>
                </div>
            </div>
        }
        let all_section = () => {
            let {chart_num} = this.state
            let chart_func = (item, index) => {
                return <div styleName={chart_num == index ? "chartTabItem chartTabActive" : "chartTabItem"} key={index}
                            onClick={() => this.chartTabHandler(index)}>
                    {item}
                </div>
            }
            return <div>
                <div styleName="allChart">
                    <div styleName="chartWrapper">
                        {<ReactEcharts option={
                            this.getOption(
                                rebate_graph.updateTime,
                                rebate_graph.timeDimensionList,
                                rebate_graph.rebateAmtList)}
                        style={{height: '100%', width: '100%'}}
                        styleName='echarts'/>}
                    </div>

                    <div styleName="chartTab">
                        {['7天', '30天', '90天', '年度'].map(chart_func)}
                    </div>
                </div>
                {tab_num == '0' && <div styleName="allData">
                    <div styleName="dataLine">
                        <div styleName="lineItem">
                            <div styleName="name">总返利</div>
                            <div styleName="count">¥{rebate_info.totalRebate}</div>
                        </div>
                        <div styleName="lineItem">
                            <div styleName="name">今日返利</div>
                            <div styleName="count">¥{rebate_info.todayRebate}</div>
                        </div>
                    </div>
                    <div styleName="dataLine lastLine">
                        <div styleName="lineItem">
                            <div styleName="name">已发返利</div>
                            <div styleName="count">¥{rebate_info.issuedRebate}</div>
                        </div>
                        <div styleName="lineItem">
                            <div styleName="name">待发返利<span>(以实际发放为准)</span></div>
                            <div styleName="count">¥{rebate_info.pendingRebate}</div>
                        </div>
                    </div>
                </div>}
                <div styleName="users">
                    <div styleName="userItem">
                        {current_list.custList&&current_list.custList.map(itemFn)}
                    </div>
                    {current_list.custList.length > 0 && <div styleName="load">已经全部加载完毕</div>}
                </div>
            </div>
        }

        return <div>
            <div styleName="header">
                <a styleName="btnBack" onClick={history.goBack}></a>
                <div styleName="tabs">
                    {tabs.map(tab_func)}
                </div>
            </div>
            {all_section()}
        </div>
    }
}

export default Rebate