import React from 'react'
import CSSModules from 'react-css-modules'
import {observer, inject} from 'mobx-react'
import {Header, BottomNavBar} from '../../components'
import styles from '../../css/investor/hj-list.css'

@CSSModules(styles, {"allowMultiple": true, "errorWhenNotFound": false})
class HjList extends React.Component {
    state = {
        list_num: 0
    }

    tabHandler = (index) => {
        this.setState({list_num: index})
    }

    render() {
        let {history} = this.props
        let {list_num} = this.state
        let listtab_func = (item, index) => {
            let listItem_style = index == list_num ? `listItem listItem${index} listOn` : `listItem listItem${index}`
            return <div styleName={listItem_style} key={index} onClick={() => this.tabHandler(index)}>
                {item}
            </div>
        }
        let detail_func = () => {
            return <div styleName="detailItem">
                <div styleName="detailTitle">
                    <div styleName="titleLeft">优享金12065</div>
                    <div styleName="titleRight">未起算</div>
                </div>
                <div styleName="dataLine">
                    <div styleName="dataLineLeft">成交金价(每克)</div>
                    <div styleName="dataLineRight">¥284.14</div>
                </div>
                <div styleName="dataLine">
                    <div styleName="dataLineLeft">成交金价(每克)</div>
                    <div styleName="dataLineRight">¥284.14</div>
                </div>
                <div styleName="dataLine">
                    <div styleName="dataLineLeft">成交金价(每克)</div>
                    <div styleName="dataLineRight">¥284.14</div>
                </div>
                <div styleName="dataLine">
                    <div styleName="dataLineLeft">成交金价(每克)</div>
                    <div styleName="dataLineRight">¥284.14</div>
                </div>
                <div styleName="dataLine">
                    <div styleName="dataLineLeft">成交金价(每克)</div>
                    <div styleName="dataLineRight">¥284.14</div>
                </div>
                <div styleName="dataLine">
                    <div styleName="dataLineLeft">成交金价(每克)</div>
                    <div styleName="dataLineRight">¥284.14</div>
                </div>
            </div>
        }
        return <div>
            <Header title="已购黄金" history={history}/>
            <div styleName="listInfo">
                <div styleName="listTitle">累计赠金</div>
                <div styleName="totalNum">7.000<span styleName="listUnit">克</span></div>
                <div styleName="listInfoLast">
                    <div styleName="listInfoLeft">总待收黄金：10.140克</div>
                    <div styleName="listInfoRight">待收赠金：3.140克</div>
                </div>
            </div>
            <div styleName="listTab">
                {['全部', '持有中', '已到期'].map(listtab_func)}
            </div>
            <div styleName="countTotal">
                共3笔记录
            </div>
            {detail_func()}
        </div>
    }
}

export default HjList