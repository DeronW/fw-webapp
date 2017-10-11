import React from 'react'
import CSSModules from 'react-css-modules'
import {observer, inject} from 'mobx-react'
import {BottomNavBar} from '../../components'
import styles from '../../css/investor/investor.css'


@CSSModules(styles, {"allowMultiple": true, "errorWhenNotFound": false})
class Investor extends React.Component {
    state = {
        tab:'全部客户',
        select:'可用余额最高排序',
        show:false
    }
    componentDidMount(){

    }
    switchTab = (tab) => {
        if(tab == this.state.tab) return
        this.setState({tab:tab,select:'可用余额最高排序'})
    }
    switchSelect = (select) => {
        if(select == this.state.select) return
        this.setState({select:select})
    }
    switchShow = () => {
        this.setState({show:!this.state.show})
    }
    gotoHandler = (link) => {
        let {history} = this.props
        history.push(link)
    }
    render(){
        let {tab,select,show} = this.state

        let tabFn = (item,index) => {
            return <div styleName={item==tab?'tab tabActive':'tab'}
                        key={index}
                        onClick={()=>this.switchTab(item)}>{item}</div>
        }
        let selectFn = (item,index) => {
            let s = tab == "未投资" ? (item==select?'selectActive':'noSelect'):(item==select?'selectActive':'selectItem')
            return <div styleName={s}
                        key={item+index}
                        onClick={tab != "未投资" ? ()=>this.switchSelect(item):''}>{item}</div>
        }

        return <div styleName="bg">
            <div styleName="header">
                我的客户<div styleName="searchBtn" onClick={()=>this.gotoHandler('/investor-search')}></div>
            </div>
            <div styleName="investor">
                <div styleName="investItem" onClick={()=>this.gotoHandler("/investor-calendar")}>
                    <img src={require("../../images/investor/investor/calendar.png")}/>
                    <div>回款日历</div>
                </div>
                <div styleName="line"></div>
                <div styleName="investItem" onClick={()=>this.gotoHandler('/investor-birthday')}>
                    <img src={require("../../images/investor/investor/clock.png")}/>
                    <div>生日提醒</div>
                </div>
            </div>
            <div styleName="container">
                <div styleName="tabs">
                    {['全部客户','在投','空仓','未投资'].map(tabFn)}
                </div>
                <div styleName="filter" onClick={()=>this.switchShow()}>
                    <span>筛选</span><img src={require("../../images/investor/investor/filter.png")} />
                </div>
            </div>
            <div styleName="mask" style={{display:show?"block":"none"}}>
                <div styleName="select">
                    {['可用余额最高排序','返利最多排序','最近回款时间排序'].map(selectFn)}
                </div>
            </div>
            <div styleName="list">
                {/*只是简单实现，等有真正数据需要传递客户的ID到客户详情页，并且采用数组map形式显示数据*/}
                <div styleName="listItem" onClick={()=>this.gotoHandler('/investor-info')}>
                    <div styleName="name">钱程</div>
                    <div styleName="money">¥7000.00</div>
                    <div styleName="time">注册时间：2017-08-13 00:00:00</div>
                    <div styleName="balance">可用余额</div>
                </div>
                <div styleName="listItem" onClick={()=>this.gotoHandler('/investor-info')}>
                    <div styleName="name">钱程</div>
                    <div styleName="money">¥7000.00</div>
                    <div styleName="time">注册时间：2017-08-13 00:00:00</div>
                    <div styleName="balance">可用余额</div>
                </div>
            </div>
            <BottomNavBar/>
        </div>
    }
}
export default Investor