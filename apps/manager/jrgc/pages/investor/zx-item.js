import React from 'react'
import CSSModules from 'react-css-modules'
import { observer, inject } from 'mobx-react'

import styles from '../../css/investor/zx-item.css'

@CSSModules(styles, { "allowMultiple": true, "errorWhenNotFound": false })
class zxItem extends React.Component {
    state = {
        tab: 'Ta的项目',
        type:'未起息',
    }
    gotoHandler = (params) => {
        let { history } = this.props
        history.push('/investor-item-detial')
    }
    switchTab = tab => {
        if (tab == this.state.tab) return
        let t = tab == 'Ta的项目' ? '未起息':'全部'
        this.setState({tab: tab, type:t})
    }
    switchType = type => {
        if (type == this.state.type) return
        this.setState({type: type})
    }
    render() {
        let { history } = this.props
        let { tab,type } = this.state
        let tabs = ['Ta的项目', '转入项目']
        let types = tab == 'Ta的项目' ? ['未起息','回款中','已回款']:['全部','回款中','已回款']

        let tabFn = (item, index) => {
            return <div key={index} styleName={item == tab ? "tab tabActive" : "tab"}
                        onClick={() => this.switchTab(item)}>{item}
            </div>
        }
        let typeFn = (item,index) => {
            return <div key={index} styleName={item == type ? "type typeActive" : "type"}
                        onClick={() => this.switchType(item)}>{item}
            </div>
        }
        return <div styleName="bg">
            <div styleName="header">
                <a styleName="btnBack" onClick={history.goBack}></a>
                <div styleName="tabs">
                    {tabs.map(tabFn)}
                </div>
            </div>
            <div styleName="earnings">
                <div styleName="text">累计收益</div>
                <div styleName="money">¥9,888.12</div>
                <div styleName="capital">待收本金：¥1,028,000.00</div>
                <div styleName="detail" onClick={()=>this.gotoHandler()}>
                    <span>查看回款明细</span>
                    <img  src={require('../../images/investor/zx-item/arrow.png')} />
                </div>
                <div styleName="interest">待收利息：¥10,015.56</div>
            </div>
            <div styleName="types">
                {types.map(typeFn)}
            </div>
            <div styleName="number">共<span>5</span>笔记录</div>
            {/*<div styleName="records">
                <div styleName="record">
                    <div styleName="title">
                        <span>尊享计划-T00010006</span>
                        <div styleName="end">已回款</div>
                    </div>
                    <div styleName="item">
                        <span>预期年化</span>
                        <span styleName="bold">8.5%</span>
                    </div>
                    <div styleName="item">
                        <span>年化加息奖励</span>
                        <span styleName="bold">8.5%</span>
                    </div>
                    <div styleName="item">
                        <span>起息日</span>
                        <span>2017-01-22</span>
                    </div>
                    <div styleName="item">
                        <span>计划回款日</span>
                        <span>2017-01-22</span>
                    </div>
                    <div styleName="item">
                        <span>投资金额</span>
                        <span styleName="red">¥3,000.00</span>
                    </div>
                    <div styleName="item">
                        <span>交易日期</span>
                        <span>2017-01-22</span>
                    </div>
                </div>
                <div styleName="load">已经全部加载完毕</div>
            </div>*/}
            <div styleName="no-data">
                <img src={require('../../images/investor/zx-item/no-data.png')}/>
            </div>
        </div>
    }
}
export default zxItem