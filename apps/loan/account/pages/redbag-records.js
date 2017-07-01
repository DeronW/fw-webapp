import React from 'react'
import CSSModules from 'react-css-modules'
import {observer, inject} from 'mobx-react'
import {Redirect} from 'react-router'
import {Link} from 'react-router-dom'
import {Header} from '../../lib/components'

import styles from '../css/redbag-records.css'
import * as $FW from 'fw-javascripts'

@inject("redbag")
@observer
@CSSModules(styles, {
    "allowMultiple": true,
    "errorWhenNotFound": false
})
export default class RedbagRecords extends React.Component {

    componentDidMount() {

window.CCC = $FW.Utils.Cookie

        document.title = "红包明细";
        let {history, redbag} = this.props;
        redbag.loadMore(null)
        $FW
            .Event
            .touchBottom(redbag.loadMore);
    }
    formatTime = (ms) => {
        let jsonDate = new Date(Number(ms)).toJSON();
        let YMD = jsonDate.slice(0, 10);
        return `${YMD}`;
    }
    render() {
        let {history} = this.props;
        const text = {
            '0': '注册冻结',
            '1': '放款冻结',
            '2': '放款冻结',
            '3': '提现中',
            '4': '已提现',
            '6': '红包过期失效',
            '7': '活动过期失效',
            '8': '首借非掌众失效'
        };
        let statusText = (item, index) => <span key={index} styleName="status-text">{text[item.redbagStatus]}</span>
        let {rows, hasData} = this.props.redbag.records;
        let item_list = (item, index) => {
            return <div styleName="list-item" key={item.uuid}>
                <div styleName="red-status">
                    {statusText}
                    <span styleName="status-num">{item.redbagAmt}</span>
                </div>
                <div styleName="sub-red-status">
                    <span styleName="sub-status-text">{item.detailStatusStr}</span>
                    <span styleName="status-time">{this.formatTime(item.createTime)}</span>
                </div>
            </div>
        }
        // 没数据的空页面
        let empty = <div styleName="no-data-box">
            <img styleName="no-data-img" src={require("../images/no-data.png")}/>
            <p styleName="no-data-desc">暂无数据</p>
        </div>;
        return <div>
            <Header title="红包明细" history={history}/>
            <div>
                {/*数据列表*/}
                <div styleName="data-list">
                    {rows.map(item_list)}
                </div>
                {/*已加载完全部数据提示*/}
                {hasData && <div styleName="data-completion">已加载完全部数据</div>}
                {rows.length === 0 && !hasData && empty}
            </div>
        </div>
    }
}