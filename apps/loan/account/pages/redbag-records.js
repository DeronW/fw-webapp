import React from 'react'
import CSSModules from 'react-css-modules'
import styles from '../css/red-bag-records.css'
import { observer, inject } from 'mobx-react'
import { Redirect } from 'react-router'
import { Link } from 'react-router-dom'
import { Header } from '../../lib/components'

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

       
        const text =[
                {key:"0",value:"注册冻结"},
                {key:"1",value:"放款冻结"},
                {key:"2",value:"可提现"},
                {key:"3",value:"提现中"},
                {key:"4",value:"已提现"},
                {key:"6",value:"红包过期失效"},
                {key:"7",value:"活动过期失效"},
                {key:"8",value:"首借非掌众失效"},
            ]
            let statusText = (item,index) => {
            let redNum = item.redbagStatus;
            redNum == item.key && return <span styleName="status-text" key={index}>{item.value}</span>
        }
        
        text.map(statusText);


        let {rows, hasData} = this.props.redbag.records;

        let item_list = (item,index) => {
            return <div styleName="list-item" key={index}>
                        <div styleName="red-status">
                            {rows.map(statusText)}
                            <span styleName="status-num">{item.redbagAmt}</span>
                        </div>
                        <div styleName="sub-red-status">
                            <span styleName="sub-status-text">{item.detailStatusStr}</span>
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