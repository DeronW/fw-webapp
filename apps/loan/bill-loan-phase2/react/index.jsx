class Content extends React.Component{
    constructor(){
        super();
        this.tabs = ['billApplying', 'billReturning', 'billFailing', 'billPaid'];
        this.count = 5;
        this.state = {
           tab:"billApplying",
           page:{
               billApplying:1,
               billReturning:1,
               billFailing:1,
               billPaid:1
           },
           bill:[]
        }
        this.tabClickHandler = this.tabClickHandler.bind(this);
    }
    loadMoreHandler(done){
        const USER = $FW.Store.getUserDict();
        let page = this.state.page[this.state.tab];
        if (page == 0) return;
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

     $FW.Post(`${API_PATH}api/order/v1/orderList.json`,{
         pageSize:this.count,
         pageIndex:page,
         loanStatus:loanStatus,
         token: USER.token,
         userGid: USER.gid,
         userId: USER.id,
         sourceType: SOURCE_TYPE
       }).then((data)=>{
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
         window.Bill[tab] = window.Bill[tab].concat(data.products);
         let bill = window.Bill[this.state.tab];
         let new_page = this.state.page;
         new_page[this.state.tab] = new_page[this.state.tab] + 1;
         if (data.totalCount < 5) new_page[this.state.tab] = 0;
         this.setState({bill: bill, page: new_page});
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
                    <span className="text">{name[i]}</span>
                </div>
            )
        };

        let list_li = (index) => {
            return (
                <div className="list_li" key={index}>
                    <div className="list-img"><img src="images/dumiao-logo.png"/></div>
                    <div className="list-content">
                        <div className="apply-num">借款金额:2500.00元</div>
                        <div className="apply-duration">借款期限:21天</div>
                    </div>
                    <div className="apply-status-wrap">
                        <div className="apply-status">申请中</div>
                        <div className="apply-time">2017-04-05</div>
                    </div>
                </div>
            )
        }

        return (
            <div className="billContent">
                <div className="bill-header">
                    <div className="billTitle">借款账单</div>
                    <div className="ui-tab-block">
                        {this.tabs.map(tab_bar)}
                    </div>
                </div>
                <div className="billContainer">
                    {this.state.bill.map(list_li)}
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
    ReactDOM.render(<BottomNavBar index={2} />, BOTTOM_NAV_NODE);
});

