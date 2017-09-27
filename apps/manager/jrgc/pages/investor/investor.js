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
    render(){
        let {tab,select,show} = this.state

        let tabFn = (item,index) => {
            return <div styleName={item==tab?'tab tabActive':'tab'}
                        key={index}
                        onClick={()=>this.switchTab(item)}>{item}</div>
        }
        let selectFn = (item,index) => {
            return <div styleName={item==select?'selectActive':'selectItem'}
                        key={item+index}
                        onClick={()=>this.switchSelect(item)}>{item}</div>
        }

        return <div styleName="bg">
            <div styleName="header">
                我的客户<div styleName="searchBtn"></div>
            </div>
            <div styleName="investor">
                <div styleName="investItem">
                    <img src={require("../../images/investor/investor/calendar.png")}/>
                    <div>回款日历</div>
                </div>
                <div styleName="line"></div>
                <div styleName="investItem">
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
                <div styleName="listItem">
                    <div styleName="name">钱程</div>
                    <div styleName="money">¥7000.00</div>
                    <div styleName="time">注册时间：2017-08-13 00:00:00</div>
                    <div styleName="balance">可用余额</div>
                </div>

            </div>
        </div>
    }
}
export default Investor