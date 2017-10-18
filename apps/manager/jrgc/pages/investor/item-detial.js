import React from 'react'
import CSSModules from 'react-css-modules'
import {observer, inject} from 'mobx-react'
import {Header} from '../../components'

import styles from '../../css/investor/item-detial.css'

@inject('investor_account')
@observer
@CSSModules(styles, {"allowMultiple": true, "errorWhenNotFound": false})
class itemDetial extends React.Component {
    state = {
        type: '未回',
    }

    componentDidMount() {

    }

    switchType = type => {
        if (type == this.state.type) return
        this.setState({type: type})
    }

    render() {
        let {history} = this.props
        let {type} = this.state
        let types = ['未回', '已回']

        let typeFn = (item, index) => {
            return <div key={index} styleName={item == type ? "type typeActive" : "type"}
                        onClick={() => this.switchType(item)}>{item}
            </div>
        }
        let empty = <div styleName="empty">
            <img src={require('../../images/investor/empty.png')}/>
        </div>
        return <div>
            <Header title="TA的回款明细" history={history}/>
            <div styleName="types">
                {types.map(typeFn)}
            </div>
            <div styleName="number">共<span>5</span>笔记录</div>
            <div styleName="records">
                <div styleName="record">
                    <div styleName="title">
                        <span>尊享计划-T00010006<i>（尊享预约）</i></span>
                        <div styleName="end">{type}款</div>
                    </div>
                    <div styleName="item">
                        <span>投标日期</span>
                        <span>2017-01-23</span>
                    </div>
                    <div styleName="item">
                        <span>计划回款日期</span>
                        <span>计划回款日期</span>
                    </div>
                    <div styleName="item">
                        <span>实际回款日期</span>
                        <span>2017-01-22</span>
                    </div>
                    <div styleName="item">
                        <span>计划回款日</span>
                        <span>2017-01-22</span>
                    </div>
                    <div styleName="item">
                        <span>本金</span>
                        <span>¥3,000.00</span>
                    </div>
                    <div styleName="item">
                        <span>利息</span>
                        <span>¥2.00</span>
                    </div>
                    <div styleName="item">
                        <span>违约金</span>
                        <span>¥0.00</span>
                    </div>
                    <div styleName="item">
                        <span>总计金额</span>
                        <span styleName="red">¥3,000.00</span>
                    </div>
                </div>
                <div styleName="load">已经全部加载完毕</div>
            </div>
        </div>
    }
}

export default itemDetial