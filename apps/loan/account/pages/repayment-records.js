import React from 'react'
import CSSModules from 'react-css-modules'
import { observer, inject } from 'mobx-react'
import { Redirect } from 'react-router'
import { Link } from 'react-router-dom'
import { Header, BottomNavBar } from '../../lib/components'
import { Browser, Post, NativeBridge } from '../../lib/helpers'
import { Event, Utils } from 'fw-javascripts'

import styles from '../css/repayment-records.css'

@inject("repayment_youyi", "repayment_fangxin")
@observer
@CSSModules(styles, {
    "allowMultiple": true,
    "errorWhenNotFound": false
})
export default class RepaymentRecords extends React.Component {
    state = {
        loanUuid: "",
        productId: "",
        resultList: [],
        curPage: 1,
        uid: ""
    }
    componentDidMount() {
        document.title = '还款';
        NativeBridge.setTitle("还款");
        this.loadMoreHandler().then(() => {
            Event.touchBottom(this.loadMoreHandler);
        })

        // let {repayment_youyi} = this.props; Post(`/api/order/v1/orderList.json`, {
        //  page: this.state.curPage,     pageSize: 10,     loanStatus: 2 }).then(data
        // => {     this.setState({resultList: data.resultList}); })

    }
    componentWillUnmount() {
        Event.cancelTouchBottom();
    }
    loadMoreHandler = (done) => {
        let { resultList, curPage } = this.state;

        if (curPage === 0)
            return done && done();

        return Post(`/api/order/v1/orderList.json`, {
            pageSize: 10,
            page: curPage,
            loanStatus: 2
        }).then(data => {
            resultList.push(...data.resultList)
            this.setState({ curPage: (curPage < data.totalPage ? curPage + 1 : 0) })
            this.setState({ resultList: resultList });

            done && done()
        })
    }
    toRepaymentDetail = (productId, uuid, loanGid) => () => {
        let { repayment_youyi, repayment_fangxin, history } = this.props;
        // 根据返回的productId跳转到不同的还款页面
        productId == '1' && history.push(`/repayment-fangxin?id=${loanGid}`);
        productId == '21' && history.push(`/repayment-fenqi?id=${uuid}`);
        productId == '11' && history.push(`/repayment-youyi?id=${uuid}`);
    }
    render() {
        let { history } = this.props;
        let { resultList } = this.state;
        let repayment_item = (item, index) => {
            return <div styleName="item-self" key={index}>
                <div styleName="top">
                    <div styleName="top-left">
                        <span styleName="logo-text">{item.productName}</span>
                        {item.overdueStatus && <span styleName="status">已逾期</span>}
                    </div>
                    <div styleName="top-right">
                        {/*<span styleName="repay-num">&yen;{item.loanLeftAmtStr}</span>*/}
                        <span styleName="repay-num">￥{item.loanLeftAmtStr}</span>
                        <span
                            styleName="repay-btn"
                            onClick={this.toRepaymentDetail(item.productId, item.uuid, item.loanGid)}>还款</span>
                    </div>
                </div>
                <div styleName="line"></div>
                <div styleName="bottom">
                    <div styleName="time-limit">
                        <p styleName="time-detail">{item.termNumStr}</p>
                        <p styleName="desc">期限</p>
                    </div>
                    <b styleName="gap-line-left"></b>
                    <div styleName="put-day">
                        <p styleName="time-detail">{item.loanTimeStr}</p>
                        <p styleName="desc">放款日</p>
                    </div>
                    <b styleName="gap-line-right"></b>
                    <div styleName="deadline">
                        <p styleName="time-detail">{item.dueTimeStr}</p>
                        <p styleName="desc">还款日</p>
                    </div>
                </div>
            </div>
        }
        let noData = <div styleName="no-data">
            <img src={require("../images/no-data.png")} alt="" styleName="blank-img" />
            <p styleName="blank-text">暂无数据</p>
        </div>

        return <div styleName="bg">
            <Header title="还款" noBack /> {/*内容部分*/}
            <div styleName="repayment-content">
                {resultList.length > 0 && resultList.map(repayment_item)}
            </div>
            {resultList.length == 0 && noData}
            <BottomNavBar history={history} />
        </div>
    }
}
