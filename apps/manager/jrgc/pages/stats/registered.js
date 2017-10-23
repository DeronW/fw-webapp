import React from 'react'
import CSSModules from 'react-css-modules'
import { inject, observer } from 'mobx-react'

import { Event } from 'fw-javascripts'

import { Header } from '../../components'

import styles from '../../css/stats/registered.css'


const STATS_DURATION = { '1': '当天', '2': '7 天', '3': '30 天', '4': '半年' };

const SORT_TABS = { 'time': '注册时间' };


@inject('stats_overview', 'stats_investor')
@observer
@CSSModules(styles, { allowMultiple: true, errorWhenNotFound: false })
class Registered extends React.Component {

    state = {
        statsDurationType: '',
        investorCnt: '',
        sortBy: 'time',
        orderBy: 0, // 0: descending, 1: ascending
        pageNo: 1,
    }

    componentDidMount() {
        window.scroll(0, 0);

        const investorType = 'registered',
            { stats_overview, stats_investor } = this.props,
            { statsDurationType } = stats_overview.data,
            { registered } = stats_overview.investorFormatted,
            { investorCnt, sortBy, orderBy, pageNo } = this.state;

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
            { sortBy, orderBy, pageNo } = this.state;

        if (pageNo === 0) return done && done();

        return stats_investor.fetchInvestorInfo(sortBy, orderBy, pageNo)
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
                orderBy: Math.abs(this.state.orderBy - 1)
            }, () => this.loadMore(null)
                .then(() => Event.touchBottom(this.loadMore)))
        } else {
            this.setState({
                pageNo: 1,
                sortBy: sortBy,
                orderBy: 0
            }, () => this.loadMore(null)
                .then(() => Event.touchBottom(this.loadMore)))
        }
    }

    formatInvestItemData = investor => {
        const { sortBy } = this.state,
            sortByCN = SORT_TABS[sortBy];
        let sortValue = '';
        if (sortBy === 'time') sortValue = investor.regTime;
        return ({
            name: investor.custRealName,
            phone: investor.prdName,
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
            const { sortBy, orderBy } = this.state;
            let orderIconActive = { asc: false, des: false };

            if (sortBy === type) {
                orderIconActive.asc = !!orderBy;
                orderIconActive.des = !orderBy;
            }

            return <div key={type} styleName="sort-type"
                onClick={() => { this.handleSort(type) }}>
                <div styleName={sortBy === type ? "sort-type-name-active" : "sort-type-name"}>{SORT_TABS[type]}</div>
                <div styleName="sort-btn">
                    <i styleName={orderIconActive.asc ? "sort-asc-active" : "sort-asc"}></i>
                    <i styleName={orderIconActive.des ? "sort-des-active" : "sort-des"}></i>
                </div>
            </div>
        }

        const genInvestorItem = (investor, i) => {
            const { name, phone, sortBy, sortValue } = this.formatInvestItemData(investor);
            return <div key={`${Date.now()}${i}`} styleName="investor-item">
                <div styleName="left-info">
                    <div styleName="left-top-info">{name}</div>
                    <div styleName="left-bottom-info">手机号: {phone}</div>
                </div>
                <div styleName="right-info">
                    {sortBy}: {sortValue}
                </div>
            </div>
        }

        return <div>
            <Header title={`${currentTabName}注册客户(${investorCnt})`} history={history} />

            <div styleName="sort-tab">
                { ['time'].map(genSortTabItems) }
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


export default Registered