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
        Event.touchBottom(this.props.user.fetchCustList)
    }

    componentWillUnmount() {
        Event.cancelTouchBottom()
    }

    gotoHandler = (params) => {
        let {history} = this.props
        history.push('/investor-info')
    }

    switchTabHandler = (index) => {
        let {type} = this.props.user.data.rebate_cust
        let {resetType} = this.props.user
        this.setState({tab_num: index})
        console.log(type, index)
        console.log(type == index)
        if (type == index) return
        resetType(index)
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
            data: timeDimensionList
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
            data: rebateAmtList
        }]
    })

    render() {
        let {history} = this.props;
        let {tab_num} = this.state;
        let {rebate_graph, rebate_cust} = this.props.user.data
        let {type, list} = this.props.user.data.rebate_cust
        let current_list = list[type], current_pageNo = current_list.page_no
        let tabs = ['全部', '微金', '尊享', '黄金']
        let tab_func = (item, index) => {
            return <div key={index} styleName={tab_num == index ? "tab tabActive" : "tab"}
                        onClick={() => this.switchTabHandler(index)}>
                {item}
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
                        {/*{chart_num == '0' &&*/}
                        {/*<ReactEcharts*/}
                        {/*option={this.getOption(rebate_graph.updateTime, rebate_graph.timeDimensionList, rebate_graph.rebateAmtList)}*/}
                        {/*style={{height: '100%', width: '100%'}}*/}
                        {/*styleName='echarts'/>}*/}
                    </div>

                    <div styleName="chartTab">
                        {['7天', '30天', '90天', '年度'].map(chart_func)}
                    </div>
                </div>
                <div styleName="allData">
                    <div styleName="dataLine">
                        <div styleName="lineItem">
                            <div styleName="name">总返利</div>
                            <div styleName="count">¥100,000,000.00</div>
                        </div>
                        <div styleName="lineItem">
                            <div styleName="name">今日返利</div>
                            <div styleName="count">¥4.06</div>
                        </div>
                    </div>
                    <div styleName="dataLine lastLine">
                        <div styleName="lineItem">
                            <div styleName="name">已发返利</div>
                            <div styleName="count">¥4.06</div>
                        </div>
                        <div styleName="lineItem">
                            <div styleName="name">待发返利</div>
                            <div styleName="count">¥4.06</div>
                        </div>
                    </div>
                </div>
                <div styleName="users">
                    <div styleName="userItem">
                        <div styleName="itemDetail" onClick={() => this.gotoHandler()}>
                            <div styleName="detailLine">
                                <div styleName="detailLeft">李丽华</div>
                                <div styleName="detailRight">¥7000.00</div>
                            </div>
                            <div styleName="detailLine">
                                <div styleName="detailLeft userDes">利随享28930 | 8.5% | 48天</div>
                                <div styleName="detailRight userDate">2017-08-13 00:00:00</div>
                            </div>
                        </div>
                        <div styleName="itemDetail" onClick={() => this.gotoHandler()}>
                            <div styleName="detailLine">
                                <div styleName="detailLeft">李丽华</div>
                                <div styleName="detailRight">¥7000.00</div>
                            </div>
                            <div styleName="detailLine">
                                <div styleName="detailLeft userDes">利随享28930 | 8.5% | 48天</div>
                                <div styleName="detailRight userDate">2017-08-13 00:00:00</div>
                            </div>
                        </div>
                        {(current_pageNo == '0' && current_list.custList.length > 0 ) && <div>已经全部加载完毕</div>}
                    </div>
                </div>
            </div>
        }

        let p2p_section = () => {
            return <div>
                this is p2p section
            </div>
        }

        let zx_section = () => {
            return <div>
                this is zx section
            </div>
        }

        let gold_section = () => {
            return <div>
                this is gold section
            </div>
        }

        return <div>
            <div styleName="header">
                <a styleName="btnBack" onClick={history.goBack}></a>
                <div styleName="tabs">
                    {tabs.map(tab_func)}
                </div>
            </div>
            {tab_num == '0' && all_section()}
            {tab_num == '1' && p2p_section()}
            {tab_num == '2' && zx_section()}
            {tab_num == '3' && gold_section()}
        </div>
    }
}

export default Rebate