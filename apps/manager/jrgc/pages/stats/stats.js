import React from 'react'
import CSSModules from 'react-css-modules'
import { inject, observer } from 'mobx-react'

import ReactEcharts from 'echarts-for-react'

import styles from '../../css/stats/stats.css'


const TABS = ["当天", "7 天", "30 天", "半年"];


const TabHeader = CSSModules(styles, { allowMultiple: true, errorWhenNotFound: false })(props => {
    const { history, tabs, current, switchHandler } = props;

    const genTabItems = (name, i) => <div styleName={current == i ? "tab-item-active" : "tab-item"}
        key={i} onClick={switchHandler(i)}>
        {name}
    </div>

    return <div styleName="tab-placeholder">
        <div styleName="tab-cnt">
            <div styleName="back-btn" onClick={() => history.go(-1)}></div>
            <div styleName="tab-group" style={{ marginLeft: "72px" }}>
                { tabs.map(genTabItems) }
            </div>
        </div>
    </div>
})


@CSSModules(styles, { allowMultiple: true, errorWhenNotFound: false })
class Stats extends React.Component {

    state = { currentTabNo: 0 }

    switchTab = no => () => {
        this.setState({ currentTabNo: no })
    }

    getOption = () => ({
        title: {},
        tooltip: {},
        legend: {
            textStyle: {
                fontSize: 18
            },
            bottom: 3,
            data: ['年化投资额', '投资额']
        },
        xAxis: {
            axisLabel: {
                fontSize: 16
            },
            name: '日期',
            data: ['9.21', '9.22']
        },
        yAxis: {
            axisLabel: {
                fontSize: 16
            },
            nameTextStyle: {
                padding: [6, 0]
            },
            name: '金额(万元)',
            max: function(value) {
                return Math.round(value.max + 0.1*(value.max - value.min));
            }
        },
        series: [{
            symbolSize: 8,
            lineStyle: {
                normal: {
                    color: '#d75063'
                }
            },
            name: '年化投资额',
            type: 'line',
            data: [5, 20]
        }, {
            symbolSize: 8,
            lineStyle: {
                normal: {
                    color: '#20629f'
                }
            },
            name: '投资额',
            type: 'line',
            data: [15, 25]
        }],
        dataZoom: [{
            type: 'inside',
            xAxisIndex: [0],
            filterMode: 'none',
            start: 0,
            end: 100
        }, {
            type: 'inside',
            yAxisIndex: [0],
            filterMode: 'none',
            start: 0,
            end: 100
        }],
        textStyle: {
            fontSize: 16
        }
    })

    render() {
        const { currentTabNo } = this.state;

        return <div>
            <TabHeader tabs={TABS} current={currentTabNo} switchHandler={this.switchTab} />

            <div styleName="graph">
                <ReactEcharts styleName="chart"
                    style={{ height: "100%", width: "100%" }}
                    option={this.getOption()} />
            </div>

            <div styleName="client-stats-grp">
                <div styleName="client-stats">
                    <div styleName="client-stats-name">{`${TABS[currentTabNo]}投资客户`}</div>
                    <div styleName="client-stats-value">3</div>
                </div>
            </div>

            <div styleName="invest-stats-grp">
                <div styleName="invest-stats">
                    <div styleName="invest-stats-name">{`${TABS[currentTabNo]}投资额`}</div>
                    <div styleName="invest-stats-value">123</div>
                </div>
                <div styleName="vertical-line"></div>
                <div styleName="invest-stats">
                    <div styleName="invest-stats-name">{`${TABS[currentTabNo]}投资额`}</div>
                    <div styleName="invest-stats-value">123</div>
                </div>
            </div>

            <div styleName="client-stats-grp">
                <div styleName="client-stats">
                    <div styleName="client-stats-name">{`${TABS[currentTabNo]}注册客户`}</div>
                    <div styleName="client-stats-value">2</div>
                </div>
                <div styleName="client-stats">
                    <div styleName="client-stats-name">{`${TABS[currentTabNo]}首投客户`}</div>
                    <div styleName="client-stats-value">1</div>
                </div>
            </div>
        </div>
    }

}

export default Stats