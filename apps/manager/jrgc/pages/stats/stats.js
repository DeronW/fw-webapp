import React from 'react'
import CSSModules from 'react-css-modules'
import { inject, observer } from 'mobx-react'

import { Chart } from '../../components'

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

@inject('stats')
@observer
@CSSModules(styles, { allowMultiple: true, errorWhenNotFound: false })
class Stats extends React.Component {

    state = { currentTabNo: 0 }

    componentDidMount() {
        const { stats } = this.props;
        stats.fetchTabData(0);
    }

    switchTab = no => () => {
        const { stats } = this.props;
        stats.fetchTabData(no);
        this.setState({ currentTabNo: no })
    }

    getOption = (date, value, valueAnnual) => ({
        legend: {
            data: ['年化投资额', '投资额']
        },
        xAxis: {
            name: '日期',
            data: date.slice() || []
        },
        yAxis: {
            name: '金额(万元)'
        },
        series: [{
            symbolSize: 9,
            smooth: true,
            lineStyle: { normal: { color: '#d75063' } },
            name: '年化投资额',
            type: 'line',
            data: value.slice() || []
        }, {
            symbolSize: 9,
            smooth: true,
            lineStyle: { normal: { color: '#20629f' } },
            name: '投资额',
            type: 'line',
            data: valueAnnual.slice() || []
        }]
    })

    render() {
        const { history, stats } = this.props,
            { currentTabNo } = this.state;

        let { investor, graph } = stats.data,
            { invested, investAmount, investAmountAnnual, registered, investedFirstTime } = investor[currentTabNo],
            { date, value, valueAnnual } = graph[currentTabNo];

        return <div>
            <TabHeader history={history}
                tabs={TABS} current={currentTabNo} switchHandler={this.switchTab} />

            <div styleName="graph">
                <Chart option={this.getOption(date, value, valueAnnual)} />
            </div>

            <div styleName="client-stats-grp">
                <div styleName="client-stats">
                    <div styleName="client-stats-name">{`${TABS[currentTabNo]}投资客户`}</div>
                    <div styleName="client-stats-value">{invested}</div>
                </div>
            </div>

            <div styleName="invest-stats-grp">
                <div styleName="invest-stats">
                    <div styleName="invest-stats-name">{`${TABS[currentTabNo]}投资额`}</div>
                    <div styleName="invest-stats-value">{investAmount}</div>
                </div>
                <div styleName="vertical-line"></div>
                <div styleName="invest-stats">
                    <div styleName="invest-stats-name">{`${TABS[currentTabNo]}年化投资额`}</div>
                    <div styleName="invest-stats-value">{investAmountAnnual}</div>
                </div>
            </div>

            <div styleName="client-stats-grp">
                <div styleName="client-stats">
                    <div styleName="client-stats-name">{`${TABS[currentTabNo]}注册客户`}</div>
                    <div styleName="client-stats-value">{registered}</div>
                </div>
                <div styleName="client-stats">
                    <div styleName="client-stats-name">{`${TABS[currentTabNo]}首投客户`}</div>
                    <div styleName="client-stats-value">{investedFirstTime}</div>
                </div>
            </div>
        </div>
    }

}

export default Stats