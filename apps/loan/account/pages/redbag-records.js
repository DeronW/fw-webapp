import React from 'react'
import CSSModules from 'react-css-modules'
import { observer, inject } from 'mobx-react'
import { Redirect } from 'react-router'
import { Link } from 'react-router-dom'
import { Header } from '../../lib/components'

import styles from '../css/redbag-records.css'
import { Event } from 'fw-javascripts'

@inject("redbag")
@observer
@CSSModules(styles, {
    "allowMultiple": true,
    "errorWhenNotFound": false
})
export default class RedbagRecords extends React.Component {

    componentDidMount() {
        document.title = "红包明细";
        let { redbag } = this.props;
        redbag.loadMoreRecords(null, true)
        Event.touchBottom(redbag.loadMoreRecords);
    }
    formatTime = (ms) => {
        let jsonDate = new Date(Number(ms)).toJSON();
        let YMD = jsonDate.slice(0, 10);
        return `${YMD}`;
    }
    render() {
        let { history } = this.props;
        const text = {
            '0': '冻结',
            '1': '可提现',
            '2': '提现中',
            '3': '已提现',
            '4': '失效'
        };
        let { rows, hasData } = this.props.redbag.records;

        let item_list = (item, index) => {
            return <div styleName="list-item" key={item.uuid + index}>
                <div styleName="red-status">
                    <span styleName="status-text">{text[item.redbagStatus]}</span>
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
            <img styleName="no-data-img" src={require("../images/no-data.png")} />
            <p styleName="no-data-desc">暂无数据</p>
        </div>;

        return <div>
            <Header title="红包明细" history={history} enable={'force'}/>
            <div>
                {/*数据列表*/}
                <div styleName="data-list">
                    {rows.length > 0 && rows.map(item_list)}
                </div>
                {/*已加载完全部数据提示*/}
                {!hasData && rows.length !==0 && <div styleName="data-completion">已加载完全部数据</div>}

                {rows.length === 0 && !hasData && empty}
            </div>
        </div>
    }
}