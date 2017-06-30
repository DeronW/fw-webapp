import React from 'react'
import CSSModules from 'react-css-modules'
import styles from '../css/red-packet-detail.css'
import { observer, inject } from 'mobx-react'
import { Redirect } from 'react-router'
import { Link } from 'react-router-dom'
import { Header } from '../../lib/components'

import * as $FWC from 'fw-components'
import * as $FW from 'fw-javascripts'

@inject("red_packet_detail") @observer @CSSModules(styles, { "allowMultiple": true, "errorWhenNotFound": false })
export default class RedPacketDetail extends React.Component {
    static onEnter() {
        document.title = "红包明细";
    }
    constructor(props){
        super(props);
        // this.state = {
        //     page: 1,
        //     hasData: true
        // }
    }
    componentDidMount() {
        let {history,red_packet_detail} = this.props;
        red_packet_detail.loadMore(null)
        $FW.Event.touchBottom(red_packet_detail.loadMore);
    }
    formatTime = (ms) => {
        let jsonDate = new Date(Number(ms)).toJSON();
        let YMD = jsonDate.slice(0, 10);
        // let HMS = jsonDate.slice(11, 19);
        return `${YMD}`;
    }
    render(){
        // 判断红包状态
        let statusText = (item) => {
            let redNum = parseInt(item.redbagStatus);
            if(redNum == 0){
                return <span styleName="status-text">注册冻结</span>
            }else if(redNum ==1){
                return <span styleName="status-text">放款冻结</span>
            }else if(redNum == 2){
                return <span styleName="status-text">可提现</span>
            }else if(redNum ==3){
                return <span styleName="status-text">提现中</span>
            }else if(redNum ==4){
                return <span styleName="status-text">已提现</span>
            }else if(redNum == 6){
                return <span styleName="status-text">红包过期失效</span>
            }else if(redNum == 7){
                return <span styleName="status-text">活动过期失效</span>
            }else if(redNum == 8){
                return <span styleName="status-text">首借非掌众失效</span>
            }
        }


        let {rows, hasData} = this.props.red_packet_detail;

        let item_list = (item,index) => {
            return <div styleName="list-item">
                        <div styleName="red-status">
                            {rows.map(statusText)}
                            <span styleName="status-num">{item.redbagAmt}</span>
                        </div>
                        <div styleName="sub-red-status">
                            <span styleName="sub-status-text">{item.remark}</span>
                            <span styleName="status-time">{this.formatTime(item.createTime)}</span>
                        </div>
                    </div>
        }
        return <div>
            <Header title="红包明细"/>
            <div>
                {/*数据列表*/}
                <div styleName="data-list">
                    {rows.map(item_list)}
                </div>
                {/*已加载完全部数据提示*/}
                {hasData && <div styleName="data-completion">已加载完全部数据</div>}
                {/*{rows.length === 0 && !hasData && empty}*/}
            </div>
        </div>
    }
}