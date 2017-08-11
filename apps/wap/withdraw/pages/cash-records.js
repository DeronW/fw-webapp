import React from 'react'

import CSSModules from 'react-css-modules'
import styles from '../css/index.css'
import { observer, inject } from 'mobx-react'
import { Redirect } from 'react-router'
import * as $FWC from 'fw-javascripts'

@inject("cash_records") @observer @CSSModules(styles,{"allowMultiple":true,"errorWhenNotFound": false})
export default class CashRecords extends React.Component {
    static onEnter() {
        document.title = "提现记录";
    }
    constructor(props){
        super(props);
        this.state = {
            page: 0,
            totalPage: null,
            month: [],
            listFalse: false,
            data:{}
        }
        this.loadRecordHandler = this.loadRecordHandler.bind(this);
        this.format_record = this.format_record.bind(this);
        this.get_date = this.get_date.bind(this);
        this.insertRecord = this.insertRecord.bind(this);
        this. stateText = this. stateText.bind(this);
    }
    backwards(){
        history.go(-1);
    }

    componentDidMount(){
        this.loadRecordHandler();
        // console.log($FWC.Event.touchBottom());
        $FWC.Event.touchBottom(this.loadRecordHandler);
    }
    loadRecordHandler(){
        let {cash_records} = this.props;
        console.log(cash_records);
        if (this.state.totalPage && this.state.page >= this.state.totalPage) return;
        // 首山的接口不能添加 API_PATH 参数, 它的域名是独立的: assets-api.9888.cn
        cash_records.getData().then(() => {
            this.setState({data:cash_records.pageData})
            console.log(this.state.data);
            this.state.data.result.forEach((i) => this.insertRecord(this.state.month, this.format_record(i)));

                this.setState({
                    month: this.state.month,
                    page: this.state.page + 1,
                    totalPage: parseInt(this.state.data.pagination.totalPage)
                });
        })
    };
    format_record(record) {
            var r = record.happenTime.split(' ')[0].split('-');
            var d = new Date(r[0], r[1] - 1, r[2]);
            return {
                money: record.reflectAmount,
                timestamp: d.getTime(),
                datetime: record.happenTime,
                state: parseInt(record.handleState),
                order_id: record.indentNo,
                withdrawMode: parseInt(record.withdrawMode)
        }
    }
    get_date(time) {
            var d = new Date(time);
            return d.getFullYear() + '年' + (d.getMonth() + 1) + '月'
    }
    insertRecord(month, record) {
            var i, date, new_flag = true;
            date = this.get_date(record.timestamp);

            for (i = 0; i < month.length; i++) {
                if (date == month[i].title) {
                    new_flag = false;
                    month[i].records.push(record);
                    break;
                }
            }
            if (new_flag) {
                month.push({
                    title: date,
                    records: [record]
                })
            }
    }
    stateText (n) {
        // 0：未处理；1：出纳通过；2：出纳拒绝；3：会计通过；4：会计拒绝；5：预审拒绝；6：退款会计审核中；7：退款会计批准；8：退款会计拒绝；9：提现成功；10：提现失败；11：处理中
        if (n == 0) return '未处理';
        if (n == 1) return '出纳通过';
        if (n == 2) return '出纳拒绝';
        if (n == 3) return '会计通过';
        if (n == 4) return '会计拒绝';
        if (n == 5) return '预审拒绝';
        if (n == 6) return '退款会计审核中';
        if (n == 7) return '退款会计批准';
        if (n == 8) return '退款会计拒绝';
        if (n == 9) return '提现成功';
        if (n == 10) return '提现失败';
        if (n == 11) return '处理中';
    }
  
    render() {
        let record = (data, index) => {
            return (
                <div styleName="record" key={index}>
                    <div styleName="first-line">
                        <div> 订单号</div>
                        <div styleName="order-id"> {data.order_id} </div>
                        <div styleName={"state state-" + data.state}>
                            {this.stateText(data.state)}</div>
                    </div>
                    <div styleName="second-line">
                        金额
                        <div styleName="money">&yen;{data.money}</div>
                    </div>
                    {
                        data.withdrawMode != undefined || data.withdrawMode != "" ?
                            <div styleName="second-line">提现方式
                                <div styleName="money">{data.withdrawMode == 1 ? "实时到帐" : "大额提现"}</div>
                            </div> : ""
                    }
                    <div styleName="third-line">
                        发生时间
                        <div styleName="time">{data.datetime}</div>
                    </div>
                </div>
            )
        };
        let month = (data, index) => {
            return (
                <div key={index}>
                    <div styleName="month-title">{data.title}</div>
                    {data.records.map(record)}
                </div>
            )
        };
        let empty = this.state.listFalse ? <div styleName="empty-records">暂无记录</div> : null;
        let noMore = this.state.page == this.state.totalPage ?
            <div styleName="all-shown">已全部展示</div> : null;
        return <div>
            <div styleName="cash-records-wrapper">
                {/*头部*/}
                <div styleName="head">
                    <div styleName="return-btn" onClick={this.backwards}>
                        <img styleName="back-icon" src={require('../images/back.png')}  alt="" />
                    </div>
                    <div styleName="title" >提现记录</div>
                    <a styleName="to-cash-records" href="#/reset-deal-password">修改交易密码</a>
                </div>
               {/*内容*/}
               <div styleName="records-content">
                    {this.state.month.map(month)}
                    {noMore}
                    {empty}
                </div>
            </div>
        </div>
    }

}