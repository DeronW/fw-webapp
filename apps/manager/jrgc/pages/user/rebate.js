import React from 'react'
import CSSModules from 'react-css-modules'
import ReactEcharts from 'echarts-for-react'
import {observer, inject} from 'mobx-react'
import styles from '../../css/user/rebate.css'

@CSSModules(styles, {"allowMultiple": true, "errorWhenNotFound": false})
class Rebate extends React.Component {
    state = {
        tab_num: 0,
        chart_num: 0
    }
    switchTabHandler = (index) => {
        this.setState({tab_num: index})
    }

    chartTabHandler = (index) => {
        this.setState({chart_num: index})
    }
    getOption = () => ({
        title: {
            text: '当前数据更新于:',
            textStyle: {
                color: '#555',
                fontSize: 16,
                padding: [0, 0, 10, 0]
            }
        },
        tooltip: {trigger: 'axis', axisPointer: {type: 'shadow'}},
        legend: {
            textStyle: {
                fontSize: 18
            },
            bottom: 3,
            data: ['返利额']
        },
        xAxis: {
            axisLabel: {
                fontSize: 16
            },
            name: '日期',
            data: ['9.16', '9.17', '9,18', '9.19', '9.20', '9.21', '9.22'],
            axisTick: {
                alignWithLabel: true
            }
        },
        yAxis: {
            type: 'value',
            axisLabel: {
                fontSize: 16
            },
            nameTextStyle: {
                padding: [6, 0]
            },
            name: '金额(万元)',
            max: function (value) {
                return Math.round(value.max + 0.1 * (value.max - value.min));
            },
            splitLine: {show: false}  //改设置不显示坐标区域内的y轴分割线
        },
        series: [{
            symbolSize: 8,
            emphasis: {
                barBorderRadius: 30
            },
            itemStyle: {
                normal: {
                    //每个柱子的颜色即为colorList数组里的每一项，如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组
                    color: function (params) {
                        let colorList = ['#9b5b54', '#ab827e', '#a7928f', '#a34b41', '#e16557', '#ad281a', '#e1c8c6'];
                        return colorList[params.dataIndex];
                    },
                    //柱形图圆角，初始化效果
                    barBorderRadius: [10, 10, 0, 0],
                    label: {
                        show: true,//是否展示
                        textStyle: {
                            fontWeight: 'bolder',
                            fontSize: '12',
                            fontFamily: '微软雅黑',
                        }
                    }
                },
            },
            name: '返利额',
            type: 'bar',
            barWidth: '30%',
            data: [5, 20, 12, 9, 2, 14, 9]
        }],
        dataZoom: [{
            type: 'inside',
            xAxisIndex: [0],
            filterMode: 'none',
            start: 0,
            end: 100
        }],
        textStyle: {
            fontSize: 16
        }
    })

    render() {
        let {history} = this.props;
        let {tab_num} = this.state;

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
                        {chart_num == 0 && <ReactEcharts option={this.getOption()}
                                                         style={{height: '100%', width: '100%'}}
                                                         styleName='echarts'/>}
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
                        <div styleName="itemDetail">
                            <div styleName="detailLine">
                                <div styleName="detailLeft">李丽华</div>
                                <div styleName="detailRight">¥7000.00</div>
                            </div>
                            <div styleName="detailLine">
                                <div styleName="detailLeft userDes">利随享28930 | 8.5% | 48天</div>
                                <div styleName="detailRight userDate">2017-08-13 00:00:00</div>
                            </div>
                        </div>
                    </div>
                    <div styleName="userItem">
                        <div styleName="itemDetail">
                            <div styleName="detailLine">
                                <div styleName="detailLeft">李丽华</div>
                                <div styleName="detailRight">¥7000.00</div>
                            </div>
                            <div styleName="detailLine">
                                <div styleName="detailLeft userDes">利随享28930 | 8.5% | 48天</div>
                                <div styleName="detailRight userDate">2017-08-13 00:00:00</div>
                            </div>
                        </div>
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
            {tab_num == 0 && all_section()}
            {tab_num == 1 && p2p_section()}
            {tab_num == 2 && zx_section()}
            {tab_num == 3 && gold_section()}
        </div>
    }
}

export default Rebate