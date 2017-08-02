import React from 'react'
import CSSModules from 'react-css-modules'
import { inject, observer } from 'mobx-react'

import { Event } from 'fw-javascripts'

import { Post } from '../../lib/helpers'

import { Header } from '../../lib/components'

import styles from '../css/repayment-youyi-records.css'


@inject('repayment_youyi')
@observer
@CSSModules(styles)
class RepaymentYouyiRecords extends React.Component {

    pageNo = 1 ;

    componentDidMount() {
        document.title = '还款记录';
        Event.touchBottom(this.loadMoreRecords);
        this.loadMoreRecords(null);
    }

    componentWillUnmount() {
        Event.cancelTouchBottom();
    }

    loadMoreRecords = (done) => {
        if (this.pageNo == 0) return done && done;

        this.props.repayment_youyi.fetchRecords(this.pageNo).then(moreToLoad => {
            this.pageNo = moreToLoad ? (this.pageNo + 1) : 0;
            done && done();
        })
    }

    render() {
        let { history, repayment_youyi } = this.props,
            list = repayment_youyi.records;

        let genItem = (item, index) => {
            let { repaymentAmtStr, repaymentTime, bankShortName, cardNo } = item;
            return <div styleName="item" key={index}>
                <div styleName="time-amount-info">
                    <div styleName="amount">{repaymentAmtStr}</div>
                    <div styleName="time">{repaymentTime}</div>
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
