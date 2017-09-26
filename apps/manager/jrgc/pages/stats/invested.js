import React from 'react'
import CSSModules from 'react-css-modules'
import { inject, observer } from 'mobx-react'

import { Header } from '../../components'

import styles from '../../css/stats/invested.css'


const TABS = { '1': '当天', '2': '7 天', '3': '30 天', '4': '半年' };
const SORT_TABS = { 'amount': '投资额', 'amountAnnual': '年化投资额', 'balance': '余额'};


@inject('stats_overview', 'stats_investor')
@observer
@CSSModules(styles, { allowMultiple: true, errorWhenNotFound: false })
class Invested extends React.Component {

    state = {
        sortBy: 'amountAnnual',
        sortDescending: true,
        pageNo: 1,
        currentTab: '',
        investorCnt: '',
        investAmount: '',
        investAmountAnnual: ''
    }

    componentDidMount() {
        const { stats_overview, stats_investor } = this.props,
            { currentTab } = stats_overview.data,
            { invested, investAmount, investAmountAnnual } = stats_overview.investorFormatted,
            { sortBy, sortDescending, pageNo } = this.state;

        this.setState({
            currentTab: currentTab,
            investorCnt: invested,
            investAmount: investAmount,
            investAmountAnnual: investAmountAnnual
        });

        stats_investor.initStats('invested', currentTab);

        stats_investor.fetchInvestorInfo(sortBy, sortDescending, pageNo);
    }

    handleSort = sortBy => {
        const { stats_investor } = this.props;

        if (this.state.sortBy === sortBy) {
            this.setState({ sortDescending: !this.state.sortDescending }, () => {
                const { sortBy, sortDescending, pageNo } = this.state;
                stats_investor.fetchInvestorInfo(sortBy, sortDescending, pageNo);
            })
        } else {
            this.setState({ sortBy: sortBy, sortDescending: true }, () => {
                const { sortBy, sortDescending, pageNo } = this.state;
                stats_investor.fetchInvestorInfo(sortBy, sortDescending, pageNo);
            })
        }
    }

    formatInvestItemData = investor => {
        const { sortBy } = this.state,
            sortByCN = SORT_TABS[sortBy];
        let sortValue = '';
        if (sortBy === 'amount') sortValue = investor.investAmt;
        if (sortBy === 'amountAnnual') sortValue = investor.annualInvestAmt;
        if (sortBy === 'balance') sortValue = investor.balance;
        return ({
            name: investor.custRealName,
            bid: investor.prdName,
            interest: investor.annualRate,
            duration: investor.repayPeriod,
            sortBy: sortByCN,
            sortValue: sortValue
        })
    }

    render() {
        const { history, stats_investor } = this.props,
            { investorRawData } = stats_investor.data,
            { currentTab, investorCnt, investAmount, investAmountAnnual } = this.state,
            currentTabName = TABS[currentTab];

        const genSortTabItems = type => {
            const { sortBy, sortDescending } = this.state;
            let isSortIconActive = { asc: false, des: false };

            if (sortBy === type) isSortIconActive = { asc: !sortDescending, des: sortDescending }

            return <div key={type} styleName="sort-type">
                <div styleName="sort-type-name"
                    onClick={() => { this.handleSort(type) }}>{SORT_TABS[type]}</div>
                <div styleName="sort-btn">
                    <i styleName={isSortIconActive.asc ? "sort-asc-active" : "sort-asc"}></i>
                    <i styleName={isSortIconActive.des ? "sort-des-active" : "sort-des"}></i>
                </div>
            </div>
        }

        const genInvestorItem = (investor, i) => {
            const { name, bid, interest, duration, sortBy, sortValue } = this.formatInvestItemData(investor);
            return <div key={`${Date.now()}${i}`} styleName="investor-item">
                <div styleName="left-info">
                    <div styleName="left-top-info">{name}</div>
                    <div styleName="left-bottom-info">{bid} | {interest} | {duration}</div>
                </div>
                <div styleName="right-info">
                    <div styleName="right-top-info">{sortValue}</div>
                    <div styleName="right-bottom-info">{sortBy}</div>
                </div>
            </div>
        }

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
                { ['amount', 'amountAnnual', 'balance'].map(genSortTabItems) }
            </div>

            <div styleName="investor-list">
                { investorRawData.map(genInvestorItem) }
            </div>

            <div styleName="end-of-item-info">已全部加载完毕</div>
        </div>
    }
}


export default Invested