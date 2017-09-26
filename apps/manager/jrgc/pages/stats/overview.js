import React from 'react'
import CSSModules from 'react-css-modules'
import { inject, observer } from 'mobx-react'

import { Chart } from '../../components'

import styles from '../../css/stats/overview.css'


const TABS = { '1': '当天', '2': '7 天', '3': '30 天', '4': '半年' };


const TabHeader = CSSModules(styles, { allowMultiple: true, errorWhenNotFound: false })(props => {
    const { history, tabs, current, switchHandler } = props;

    const genTabItems = no => <div key={no}
        styleName={current == no ? "tab-item-active" : "tab-item"}
        onClick={switchHandler(no)}>
        { TABS[no] }
    </div>

    return <div styleName="tab-placeholder">
        <div styleName="tab-cnt">
            <div styleName="back-btn" onClick={() => history.go(-1)}></div>
            <div styleName="tab-group">
                { ['1', '2', '3', '4'].map(genTabItems) }
            </div>
        </div>
    </div>
})


@inject('stats_overview')
@observer
@CSSModules(styles, { allowMultiple: true, errorWhenNotFound: false })
class StatsOverview extends React.Component {

    componentDidMount() {
        const { stats_overview } = this.props;
        stats_overview.setCurrentTab('1');
        stats_overview.fetchTabData('1');
        stats_overview.fetchTabData('2');
        stats_overview.fetchTabData('3');
        stats_overview.fetchTabData('4');
    }

    switchTab = no => () => {
        const { stats_overview } = this.props;
        stats_overview.setCurrentTab(no);
        stats_overview.fetchTabData(no);
    }

    getOption = (date, value, valueAnnual) => ({
        legend: {
            data: ['年化投资额', '投资额']
        },
        xAxis: {
            name: '日期',
            data: date
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
            data: value
        }, {
            symbolSize: 9,
            smooth: true,
            lineStyle: { normal: { color: '#20629f' } },
            name: '投资额',
            type: 'line',
            data: valueAnnual
        }]
    })

    render() {
        const { history, stats_overview } = this.props,
            { currentTab } = stats_overview.data,
            { graphFormatted, investorFormatted } = stats_overview;

        const currentTabName = TABS[currentTab],
            { date, value, valueAnnual } = graphFormatted,
            { invested, investAmount, investAmountAnnual, registered, investedFirstTime } = investorFormatted;

        return <div>
            <TabHeader history={history} current={currentTab} switchHandler={this.switchTab} />

            <div styleName="graph">
                <Chart option={this.getOption(date, value, valueAnnual)} />
            </div>

            <div styleName="client-stats-grp">
                <div styleName="client-stats">
                    <div styleName="client-stats-name">{`${currentTabName}投资客户`}</div>
                    <div styleName="client-stats-value">{invested}</div>
                </div>
            </div>

            <div styleName="invest-stats-grp">
                <div styleName="invest-stats">
                    <div styleName="invest-stats-name">{`${currentTabName}投资额`}</div>
                    <div styleName="invest-stats-value">{investAmount}</div>
                </div>
                <div styleName="vertical-line"></div>
                <div styleName="invest-stats">
                    <div styleName="invest-stats-name">{`${currentTabName}年化投资额`}</div>
                    <div styleName="invest-stats-value">{investAmountAnnual}</div>
                </div>
            </div>

            <div styleName="client-stats-grp">
                <div styleName="client-stats">
                    <div styleName="client-stats-name">{`${currentTabName}注册客户`}</div>
                    <div styleName="client-stats-value">{registered}</div>
                </div>
                <div styleName="client-stats">
                    <div styleName="client-stats-name">{`${currentTabName}首投客户`}</div>
                    <div styleName="client-stats-value">{investedFirstTime}</div>
                </div>
            </div>
        </div>
    }

}

export default StatsOverview