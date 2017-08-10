import React from 'react'
import CSSModules from 'react-css-modules'
import { inject, observer } from 'mobx-react'

import { Event, Utils } from 'fw-javascripts'

import { Post } from '../../lib/helpers'

import { Header } from '../../lib/components'

import styles from '../css/repayment-youyi-records.css'


@inject('repayment_youyi')
@observer
@CSSModules(styles)
class RepaymentYouyiRecords extends React.Component {

    state = { pageNo: 1 }

    componentDidMount() {
        document.title = '还款记录';

        this.props.repayment_youyi.setLoopLoanUuid(Utils.hashQuery.id);

        this.loadMoreRecords(null).then(() => Event.touchBottom(this.loadMoreRecords));
    }

    componentWillUnmount() {
        Event.cancelTouchBottom();
        this.props.repayment_youyi.clearRecords();
    }

    loadMoreRecords = (done) => {
        let { pageNo } = this.state;
        if (pageNo == 0) return done && done;

        return this.props.repayment_youyi.fetchRecords(pageNo).then(moreToLoad => {
            this.setState({ pageNo: moreToLoad ? (pageNo + 1) : 0 });
            done && done();
        })
    }

    formatTime = (t) => {
        let JSONDate = (new Date(t)).toJSON();
        return `${JSONDate.slice(0,10)} ${JSONDate.slice(11,19)}`
    }

    render() {
        let { history, repayment_youyi } = this.props,
            list = repayment_youyi.records;

        let genItem = (item, index) => {
            let { repaymentAmtStr, createTimeStr, bankShortName, cardNo } = item;
            return <div styleName="item" key={index}>
                <div styleName="time-amount-info">
                    <div styleName="amount">{repaymentAmtStr}</div>
                    <div styleName="time">{createTimeStr}</div>
                </div>
                <div styleName="card-info">
                    {bankShortName}(尾号{cardNo.slice(-4)})
                </div>
            </div>
        }

        return <div styleName="cnt-container">
            <Header title="还款记录" history={history} />

            <div styleName="logo-container">
                <img src={require('../images/repayment-youyi/logo.png')}></img>
                优易借
            </div>

            <div styleName="list">
                { list.map(genItem) }
            </div>
        </div>

    }

}

export default RepaymentYouyiRecords
