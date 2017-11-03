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
        window.scrollTo(0,0)
        this.props.investor.switchSortType()
        Event.touchBottom(this.props.investor.fetchFellowRecords)

    }

    componentWillUnmount() {
        Event.cancelTouchBottom()
    }

    switchTypeHandler = type => {
        if(this.props.investor.fellow.value == type) return

        window.scrollTo(0,0)
        this.props.investor.switchSortType(type)
    }

    toggleShow = () => {
        this.setState({ show: !this.state.show })
    }
    gotoHandler = (link) => {
        let { history } = this.props
        history.push(link)
    }
    render() {
        let { show } = this.state
        let { history } = this.props
        // let { tab, sort, type, list } = this.props.investor.data.custmor
        let { fellow, MENU } = this.props.investor

        let amount = (item) => {
            let t
            if ([1,4,7,10].indexOf(fellow.value)>-1) {
                t = `￥${item.bankBalance}`
            } else if ([2,5,8].indexOf(fellow.value)>-1) {
                t = `￥${item.commissionAmt}`
            } else {
                t = item.realName ? (item.repayPerDate || '暂无回款') : '暂无回款'
            }
            return t
        }
        let remind = (item) => {
            let r
            if ([1,4,7,10].indexOf(fellow.value)>-1) {
                r = '可用余额'
            } else if ([2,5,8].indexOf(fellow.value)>-1) {
                r = '总返利'
            } else {
                r = '回款时间'
            }
            return r
        }
        let mobileFormat = (mobile) => {
            if(!mobile) return
            return mobile.toString().substr(0,3)+"****"+mobile.toString().substr(-4)
        }

        let listFn = (item, index) => {
            return <div styleName="listItem" key={item.custId + index} onClick={() => this.gotoHandler(`/investor-info?custId=${item.custId}`)}>
                <div styleName="name">{item.realName || mobileFormat(item.mobile)}</div>
                <div styleName="money">{amount(item)}</div>
                <div styleName="time">注册时间：{item.createTime}</div>
                <div styleName="balance">{remind(item)}</div>
            </div>
        }

        let tab_level_one = (item) => {
            let types = MENU[item].map(x => Object.values(x)[0])
            let act = types.indexOf(fellow.value) > -1

            let cn = act ? 'tab tabActive' : 'tab'
            return <div styleName={cn} key={item}
                onClick={() => this.switchTypeHandler(types[0])}>{item}</div>
        }

        let tab_level_two = (item) => {
            let txt = Object.keys(item)[0]
            let value = Object.values(item)[0]

            return <div styleName={fellow.value == value ? 'selectActive' : 'selectItem'}
                key={value}
                onClick={() => {
                    this.toggleShow()
                    this.switchTypeHandler(value)
                }}>{txt}</div>
        }

        let show_sort_type = () => {
            if (!this.state.show) return;

            let tab = []
            for (let k in MENU) {
                let t = MENU[k].map(kv => Object.values(kv)[0])
                if (t.indexOf(fellow.value) > -1) {
                    tab = MENU[k]
                    break
                }
            }

            return <div styleName="mask">
                <div styleName="select">
                    {tab.map(tab_level_two)}
                </div>
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
                    {/*['全部客户', '在投', '空仓', '未投资'].map(tabFn)*/}
                    {['全部客户', '在投', '空仓', '未投资'].map(tab_level_one)}
                </div>
                <div styleName="filter" onClick={() => this.toggleShow()}>
                    <span>筛选</span><img src={require("../../images/investor/investor/filter.png")} />
                </div>
            </div>
            {show_sort_type()}
            <div styleName="list">
                {fellow.records.map(listFn)}
            </div>
            <BottomNavBar />
        </div>
    }
}
export default Investor