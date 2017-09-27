import React from 'react'
import CSSModules from 'react-css-modules'
import { inject, observer } from 'mobx-react'

import { Event } from 'fw-javascripts'

import { Header } from '../../components'

import styles from '../../css/stats/invested-first-time.css'


const STATS_DURATION = { '1': '当天', '2': '7 天', '3': '30 天', '4': '半年' };

const SORT_TABS = { 'amount': '首投金额', 'time': '首投时间', 'balance': '余额' };


@inject('stats_overview', 'stats_investor')
@observer
@CSSModules(styles, { allowMultiple: true, errorWhenNotFound: false })
class InvestedFirstTime extends React.Component {

    state = {
        statsDurationType: '',
        investorCnt: '',
        sortBy: 'amount',
        sortDescending: true,
        pageNo: 1,
    }

    componentDidMount() {
        window.scroll(0, 0);

        const investorType = 'investedFirstTime',
            { stats_overview, stats_investor } = this.props,
            { statsDurationType } = stats_overview.data,
            { registered } = stats_overview.investorFormatted,
            { investorCnt, sortBy, sortDescending, pageNo } = this.state;

        stats_investor.initStats(investorType, statsDurationType);

        this.setState({
            statsDurationType: statsDurationType,
            investorCnt: registered
        });

        this.loadMore(null)
            .then(() => Event.touchBottom(this.loadMore))
    }

    componentWillUnmount() {
        Event.cancelTouchBottom();
    }

    loadMore = (done) => {
        const { stats_investor } = this.props,
            { sortBy, sortDescending, pageNo } = this.state;

        if (pageNo === 0) return done && done();

        return stats_investor.fetchInvestorInfo(sortBy, sortDescending, pageNo)
            .then(pageNo => {
                this.setState({ pageNo: pageNo });
                done && done();
            });
    }

    handleSort = sortBy => {
        Event.cancelTouchBottom();
        document.documentElement.scrollTop = 0;

        const { stats_investor } = this.props;

        if (this.state.sortBy === sortBy) {
            this.setState({
                pageNo: 1,
                sortDescending: !this.state.sortDescending
            }, () => this.loadMore(null)
                .then(() => Event.touchBottom(this.loadMore)))
        } else {
            this.setState({
                pageNo: 1,
                sortBy: sortBy,
                sortDescending: true
            }, () => this.loadMore(null)
                .then(() => Event.touchBottom(this.loadMore)))
        }
    }

    formatInvestItemData = investor => {
        const { sortBy } = this.state,
            sortByCN = SORT_TABS[sortBy];
        let sortValue = '';
        if (sortBy === 'amount') sortValue = investor.firstInvestAmt;
        if (sortBy === 'time') sortValue = investor.applyDate;
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
            { statsDurationType, investorCnt, pageNo } = this.state,
            currentTabName = STATS_DURATION[statsDurationType];

        const genSortTabItems = type => {
            const { sortBy, sortDescending } = this.state;
            let isSortIconActive = { asc: false, des: false };

            if (sortBy === type) isSortIconActive = { asc: !sortDescending, des: sortDescending }

            return <div key={type} styleName="sort-type"
                onClick={() => { this.handleSort(type) }}>
                <div styleName={sortBy === type ? "sort-type-name-active" : "sort-type-name"}>{SORT_TABS[type]}</div>
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
                    { sortBy !== '余额' &&
                        <div styleName="left-bottom-info">{bid} | {interest} | {duration}</div>
                    }
                </div>
                <div styleName="right-info">
                    <div styleName="right-top-info">{sortValue}</div>
                    <div styleName="right-bottom-info">{sortBy}</div>
                </div>
            </div>
        }

        return <div>
            <Header title={`${currentTabName}首投客户(${investorCnt})`} history={history} />

            <div styleName="sort-tab">
                { ['amount', 'time', 'balance'].map(genSortTabItems) }
            </div>

            <div styleName="investor-list">
                { investorRawData.map(genInvestorItem) }
            </div>

            { pageNo === 0 && investorRawData.length > 0 &&
                <div styleName="end-of-item-info">已全部加载完毕</div>
            }

            { investorRawData.length === 0 &&
                <div styleName="empty-info"></div>
            }
        </div>
    }
}


export default InvestedFirstTime