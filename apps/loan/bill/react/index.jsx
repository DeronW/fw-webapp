class Content extends React.Component{
    constructor(props){
        super(props);
        this.tabs = ['billApplying', 'billReturning', 'billFailing', 'billPaid'];
        // this.tabs = [
        //   {
        //     billType: 'billApplying',
        //     typeCN: '申请中'
        //   }, {
        //     billType: 'billReturning',
        //     typeCN: '还款中'
        //   }, {
        //     billType: 'billFailing',
        //     typeCN: '未通过'
        //   }, {
        //     billType: 'billPaid',
        //     typeCN: '已还款'
        //   }
        // ];
        let tab = $FW.Format.urlQuery().tab;
        this.count = 5;
        this.state = {
           tab:tab,
           page:{
               billApplying:1,
               billReturning:1,
               billFailing:1,
               billPaid:1
           },
           bill:[],
           hasData:true
        }
        this.tabClickHandler = this.tabClickHandler.bind(this);
    }
    loadMoreHandler = (done) => {
        const USER = $FW.Store.getUserDict();
        let page = this.state.page[this.state.tab];
        if (page == 0) return;
        // let loanStatus = this.tabs.findIndex((t) => (t.billType === this.state.tab)) + 1;
        let loanStatus;
        if (this.state.tab == 'billApplying') {
            loanStatus = 1
        } else if (this.state.tab == 'billReturning') {
            loanStatus = 2
        } else if (this.state.tab == 'billFailing') {
            loanStatus = 3
        } else if (this.state.tab == 'billPaid') {
            loanStatus = 4
        }

     $FW.Post(`${API_PATH}/api/order/v1/orderList.json`,{
         pageSize:this.count,
         pageIndex:page,
         loanStatus:loanStatus,
         token: USER.token,
         userGid: USER.gid,
         userId: USER.id,
         uid:USER.uid,
         sourceType: SOURCE_TYPE
       }).then((data)=>{
        //  let tab = this.tabs[loanStatus-1].billType;
         let tab;
         if (loanStatus == 1) {
             tab = 'billApplying'
         } else if (loanStatus == 2) {
             tab = 'billReturning'
         } else if (loanStatus == 3) {
             tab = 'billFailing'
         } else if (loanStatus == 4) {
             tab = 'billPaid'
         } else {
             done && done();
             return;
         }
         window.Bill[tab] = window.Bill[tab].concat(data.resultList);
         let bill = window.Bill[this.state.tab];
         let new_page = this.state.page;
         new_page[this.state.tab] = new_page[this.state.tab] + 1;
         if (data.totalCount < 5) new_page[this.state.tab] = 0;
         this.setState({bill: bill, page: new_page, hasData:!!data.resultList.length});
         done && done();
     }, (err)=>$FW.Component.Toast(err.message));
    }
    componentDidMount(){
        this.loadMoreHandler(null);
        $FW.Event.touchBottom(this.loadMoreHandler);
    }
    tabClickHandler(tab) {
        this.setState({ tab: tab, bill: window.Bill[tab] });
        if (window.Bill[tab].length == 0) {
            setTimeout(function () {
                this.loadMoreHandler(null);
            }.bind(this), 500)
        }
    }
    render() {
        let tab_bar = (i) => {
            let name = {
                billApplying: '申请中',
                billReturning: '还款中',
                billFailing: '未通过',
                billPaid: '已还款',
            };
            return (
                <div key={i} className={i == this.state.tab ? "ui-tab-li ui-select-li" : "ui-tab-li"}
                     onClick={()=>{this.tabClickHandler(i) }}>
                     {/* <span className="text">{i.typeCN}</span> */}
                    <span className="text">{name[i]}</span>
                </div>
            )
        };

        let list_li = (item,index) => {
            let status = parseInt(item.baseStatus);
            let uuid = item.uuid;
            let loanGid = item.loanGid;
            // let baseStatus =
            let baseStatus;
            let statusColor;
            switch(status){
                case 1 :
                    baseStatus = "申请中";
                    statusColor = "bill-applying-color";
                    break;
                case 2 :
                    baseStatus = "还款中";
                    statusColor = "bill-returning-color"
                    break;
                case 3 :
                    baseStatus = "未通过";
                    statusColor = "bill-failing-color";
                    break;
                case 4 :
                    baseStatus = "已还款";
                    statusColor = "bill-paid-color";
                    break;
            }
            return (
                <a className="list_li" key={index} href={item.productId == 1 ? `/static/loan/bill-detail/index.html?uuid=${loanGid}` : `/static/loan/bill-detail-dumiao/index.html?uuid=${uuid}`}>
                    <div className="list-img"><img src={item.productId == 1 ? "images/fxh-logo.png" : "images/dumiao-logo.png"}/></div>
                    <div className="list-content">
                        <div className="apply-num">借款金额:{item.loanAmtStr}元</div>
                        <div className="apply-duration">借款期限:{item.termNum}天</div>
                    </div>
                    <div className="apply-status-wrap">
                        <div className="apply-status"><span className={statusColor}>{baseStatus}</span></div>
                        <div className="apply-time">{item.loanTime}</div>
                    </div>
                </a>
            )
        }

        let empty = <span className="no-data"></span>;

        return (
            <div className="billContent">
                <div className="bill-header">
                    {!$FW.Browser.inWeixin() && <div className="billTitle">借款账单</div>}
                    <div className="ui-tab-block">
                        {this.tabs.map(tab_bar)}
                    </div>
                </div>
                <div className={$FW.Browser.inWeixin() ? "billContainer-weixin" : "billContainer"}>
                    {this.state.bill.map(list_li)}
                    {this.state.bill.length === 0 && !this.state.hasData && empty}
                </div>
            </div>
        )
    }
}

window.Bill = {
    billApplying: [],
    billReturning: [],
    billFailing: [],
    billPaid: []
};

$FW.DOMReady(function(){
    ReactDOM.render(<Content />, CONTENT_NODE);
    ReactDOM.render(<BottomNavBar/>, BOTTOM_NAV_NODE);
});
