import React from 'react'
import CSSModules from 'react-css-modules'
import { inject, observer } from 'mobx-react'

import { Header } from '../../components'

import styles from '../../css/stats/invested.css'


const TABS = { '1': '当天', '2': '7 天', '3': '30 天', '4': '半年' };


@inject('stats_overview', 'stats_investor')
@observer
@CSSModules(styles, { allowMultiple: true, errorWhenNotFound: false })
class Invested extends React.Component {

    state = {
        currentTab: '',
        investorCnt: '',
        investAmount: '',
        investAmountAnnual: ''
    }

    componentDidMount() {
        const { stats_overview, stats_investor } = this.props,
            { currentTab } = stats_overview.data,
            { invested, investAmount, investAmountAnnual } = stats_overview.investorFormatted;
        this.setState({
            currentTab: currentTab,
            investorCnt: invested,
            investAmount: investAmount,
            investAmountAnnual: investAmountAnnual
        })
    }

    render() {
        const { history } = this.props,
            { currentTab, investorCnt, investAmount, investAmountAnnual } = this.state,
            currentTabName = TABS[currentTab];

        return <div>
            <Header title={`${currentTabName}投资客户(${investorCnt})`} history={history} />

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

            <div styleName="sort-tab">
                <div styleName="sort-type">
                    <div styleName="sort-type-name">投资额</div>
                    <div styleName="sort-btn">
                        <i styleName="sort-asc"></i>
                        <i styleName="sort-des"></i>
                    </div>
                </div>
                <div styleName="sort-type">
                    <div styleName="sort-type-name">年化投资额</div>
                    <div styleName="sort-btn">
                        <i styleName="sort-asc"></i>
                        <i styleName="sort-des"></i>
                    </div>
                </div>
                <div styleName="sort-type">
                    <div styleName="sort-type-name">余额</div>
                    <div styleName="sort-btn">
                        <i styleName="sort-asc"></i>
                        <i styleName="sort-des"></i>
                    </div>
                </div>
            </div>

            <div styleName="investor-list">
                <div styleName="investor-item">
                    <div styleName="left-info">
                        <div styleName="left-top-info">李明</div>
                        <div styleName="left-bottom-info">利随享28930 | 8.5% | 48天</div>
                    </div>
                    <div styleName="right-info">
                        <div styleName="right-top-info">￥7000.00</div>
                        <div styleName="right-bottom-info">投资额</div>
                    </div>
                </div>
            </div>

            <div styleName="end-of-item-info">已全部加载完毕</div>
        </div>
    }

}

export default Invested