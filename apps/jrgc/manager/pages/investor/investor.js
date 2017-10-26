import React from 'react'
import CSSModules from 'react-css-modules'
import { observer, inject } from 'mobx-react'
import { Event, Components, Utils } from 'fw-javascripts'

import { BottomNavBar } from '../../components'
import styles from '../../css/investor/investor.css'

@inject('investor')
@observer
@CSSModules(styles, { "allowMultiple": true, "errorWhenNotFound": false })
class Investor extends React.Component {
    state = {
        show: false
    }
    componentDidMount() {
        this.props.investor.resetCustPageNo()
        this.props.investor.fetchCustList()
        Event.touchBottom(this.props.investor.fetchCustList)
    }
    componentWillUnmount() {
        Event.cancelTouchBottom()
    }
    switchTab = (t) => {
        let {resetCustPageNo,setCustTab,setCustValue,fetchCustList} = this.props.investor
        let { tab,type,sort } = this.props.investor.data.custmor

        if (t == tab) return
        resetCustPageNo()
        setCustTab(t)

        let next_tab = sort[t]
        let next_type = Object.values(next_tab[0])[0]
        setCustValue(next_type)
    }
    switchType = (t,i) => {
        let {resetCustPageNo,setCustType,setCustValue,fetchCustList} = this.props.investor
        let { tab,type,sort } = this.props.investor.data.custmor

        if (t == type) return
        resetCustPageNo()
        setCustType(t)
        setCustValue(sort[tab][i][t])
        this.setState({ show: !this.state.show })
    }
    switchShow = () => {
        this.setState({ show: !this.state.show })
    }
    gotoHandler = (link) => {
        let { history } = this.props
        history.push(link)
    }
    render() {
        let { show } = this.state
        let { history } = this.props
        let { tab,sort,type,list }= this.props.investor.data.custmor

        let amount = (item) => {
            let t
            if(type == '可用余额最高排序'){
                t = `￥${item.bankBalance}`
            }else if(type == '返利最多排序'){
                t = `￥${item.commissionAmt}`
            }else{
                t = item.createTime || '暂无回款'
            }
            return t
        }
        let remind = (item) => {
            let r
            if(type == '可用余额最高排序'){
                r = '可用余额'
            }else if(type == '返利最多排序'){
                r = '总返利'
            }else{
                r = '回款时间'
            }
            return r
        }
        let tabFn = (item, index) => {
            return <div styleName={item == tab ? 'tab tabActive' : 'tab'}
                key={index}
                onClick={() => this.switchTab(item)}>{item}</div>
        }
        let selectFn = (item, index) => {
            return <div styleName={Object.keys(item)[0] == type ? 'selectActive' : 'selectItem'}
                key={item + index}
                onClick={() => this.switchType(Object.keys(item)[0],index)}>{Object.keys(item)[0]}</div>
        }
        let listFn = (item,index) => {
            return <div styleName="listItem" key={item.custId+index} onClick={() => this.gotoHandler(`/investor-info?custId=${item.custId}`)}>
                <div styleName="name">{item.realName || item.mobile}</div>
                <div styleName="money">{amount(item)}</div>
                <div styleName="time">注册时间：{item.createTime}</div>
                <div styleName="balance">{remind(item)}</div>
            </div>
        }
        return <div styleName="bg">
            <div styleName="header">
                我的客户<div styleName="searchBtn" onClick={() => this.gotoHandler('/investor-search')}></div>
            </div>
            <div styleName="investor">
                <div styleName="investItem" onClick={() => this.gotoHandler("/investor-calendar")}>
                    <img src={require("../../images/investor/investor/calendar.png")} />
                    <div>回款日历</div>
                </div>
                <div styleName="line"></div>
                <div styleName="investItem" onClick={() => this.gotoHandler('/investor-birthday')}>
                    <img src={require("../../images/investor/investor/clock.png")} />
                    <div>生日提醒</div>
                </div>
            </div>
            <div styleName="container">
                <div styleName="tabs">
                    {['全部客户','在投','空仓','未投资'].map(tabFn)}
                </div>
                <div styleName="filter" onClick={() => this.switchShow()}>
                    <span>筛选</span><img src={require("../../images/investor/investor/filter.png")} />
                </div>
            </div>
            {show && <div styleName="mask">
                <div styleName="select">
                    {sort[tab].map(selectFn)}
                </div>
            </div>}
            <div styleName="list">
                {list&&list.map(listFn)}
            </div>
            <BottomNavBar />
        </div>
    }
}
export default Investor