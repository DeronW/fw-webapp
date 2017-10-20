import React from 'react'
import CSSModules from 'react-css-modules'
import {observer, inject} from 'mobx-react'
import {Header, BottomNavBar} from '../../components'
import styles from '../../css/investor/hj-list.css'
import {Event, Components} from 'fw-javascripts'

@inject('investor_account')
@observer
@CSSModules(styles, {"allowMultiple": true, "errorWhenNotFound": false})
class HjList extends React.Component {
    state = {
        list_num: 0
    }

    componentDidMount() {
        this.props.investor_account.resetGoldListPageNo()
        this.props.investor_account.fetchGoldList()
        Event.touchBottom(this.props.investor_account.fetchGoldList)
    }

    componentWillUnmount() {
        Event.cancelTouchBottom()
    }

    tabHandler = (index) => {
        let {type} = this.props.investor_account.data_hj
        this.setState({list_num: index})
        console.log(type, index)
        if (type == index) return
        this.props.investor_account.resetGoldListType(index)
    }

    render() {
        let {history} = this.props
        let {list_num} = this.state
        let {type, records, amount, totalCount} = this.props.investor_account.data_hj, current_record = records[type]
        let listtab_func = (item, index) => {
            let listItem_style = index == list_num ? `listItem listItem${index} listOn` : `listItem listItem${index}`
            return <div styleName={listItem_style} key={index} onClick={() => this.tabHandler(index)}>
                {item}
            </div>
        }
        let detail_func = (item, index) => {
            return <div styleName="detailItem" key={index}>
                <div styleName="detailTitle">
                    <div styleName="titleLeft">优享金12065</div>
                    <div styleName="titleRight">未起算</div>
                </div>
                <div styleName="dataLine">
                    <div styleName="dataLineLeft">成交金价(每克)</div>
                    <div styleName="dataLineRight">¥{item.dealGoldPrice}</div>
                </div>
                <div styleName="dataLine">
                    <div styleName="dataLineLeft">购买克重</div>
                    <div styleName="dataLineRight">{item.purchaseGoldAmount}</div>
                </div>
                <div styleName="dataLine">
                    <div styleName="dataLineLeft">预期赠金克重</div>
                    <div styleName="dataLineRight">{item.perGiveGoldAmount}</div>
                </div>
                <div styleName="dataLine">
                    <div styleName="dataLineLeft">已获赠金克重</div>
                    <div styleName="dataLineRight">{item.hasGiveGoldAmount}</div>
                </div>
                <div styleName="dataLine">
                    <div styleName="dataLineLeft">起算日</div>
                    <div styleName="dataLineRight">{item.startDate}</div>
                </div>
                <div styleName="dataLine">
                    <div styleName="dataLineLeft">到期日</div>
                    <div styleName="dataLineRight">{item.expiredDate}</div>
                </div>
            </div>
        }
        return <div>
            <Header title="已购黄金" history={history}/>
            <div styleName="listInfo">
                <div styleName="listTitle">累计赠金</div>
                <div styleName="totalNum">{amount.allGiveGoldAmount}<span styleName="listUnit">克</span></div>
                <div styleName="listInfoLast">
                    <div styleName="listInfoLeft">总待收黄金：{amount.collectGoldAmount}克</div>
                    <div styleName="listInfoRight">待收赠金：{amount.collectGiveGoldAmount}克</div>
                </div>
            </div>
            <div styleName="listTab">
                {['全部', '持有中', '已到期'].map(listtab_func)}
            </div>
            <div styleName="countTotal">
                共{totalCount}笔记录
            </div>
            {current_record.list.map(detail_func)}
        </div>
    }
}

export default HjList