import React from 'react'
import CSSModules from 'react-css-modules'
import { observer, inject } from 'mobx-react'
import { Redirect } from 'react-router'
import { Link } from 'react-router-dom'
import { Header } from '../../lib/components'

import styles from '../css/redbag-records.css'
import * as $FW from 'fw-javascripts'

@inject("redbag")
@observer
@CSSModules(styles, { "allowMultiple": true, "errorWhenNotFound": false })
export default class RedBagRecords extends React.Component {
    constructor(props){
        super(props);
        // this.state = {
        //     page: 1,
        //     hasData: true
        // }
    }
    componentDidMount() {
        document.title = "红包明细";
        let {history,redbag} = this.props;
        redbag.loadMore(null)
        $FW.Event.touchBottom(redbag.loadMore);
    }
    formatTime = (ms) => {
        let jsonDate = new Date(Number(ms)).toJSON();
        let YMD = jsonDate.slice(0, 10);
        // let HMS = jsonDate.slice(11, 19);
        return `${YMD}`;
    }
    render(){
        let {history} = this.props;
        // 判断红包状态
        // let statusText = (item,index) => {
        //     let redNum = item.redbagStatus;
        //     if(redNum == 0){
        //         return <span styleName="status-text">注册冻结</span>
        //     }else if(redNum ==1){
        //         return <span styleName="status-text">放款冻结</span>
        //     }else if(redNum == 2){
        //         return <span styleName="status-text">可提现</span>
        //     }else if(redNum ==3){
        //         return <span styleName="status-text">提现中</span>
        //     }else if(redNum ==4){
        //         return <span styleName="status-text">已提现</span>
        //     }else if(redNum == 6){
        //         return <span styleName="status-text">红包过期失效</span>
        //     }else if(redNum == 7){
        //         return <span styleName="status-text">活动过期失效</span>
        //     }else if(redNum == 8){
        //         return <span styleName="status-text">首借非掌众失效</span>
        //     }
        // }

        // const text = ["注册冻结","放款冻结","可提现","提现中","已提现","红包过期失效","活动过期失效","首借非掌众失效"];

       
        const text = {
            '0': '注册冻结',
            '1': '放款冻结',
            '2': '放款冻结',
            '3': '提现中',
            '4': '已提现',
            '6': '红包过期失效',
            '7': '活动过期失效',
            '8': '首借非掌众失效',
        };


        let statusText = (item) => <span styleName="status-text">{text[item.redbagStatus]}</span>
        
        let {rows, hasData} = this.props.redbag.records;

        let item_list = (item,index) => {
            return <div styleName="list-item">
                        <div styleName="red-status">
                            {item.detailStatusStr}
                            
                            <span styleName="status-num">{item.redbagAmt}</span>
                        </div>
                        <div styleName="sub-red-status">
                            <span styleName="sub-status-text">{rows.map(statusText)}</span>
                            <span styleName="status-time">{this.formatTime(item.createTime)}</span>
                        </div>
                    </div>
        }
        return <div>
            <Header title="红包明细" history = {history}/>
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