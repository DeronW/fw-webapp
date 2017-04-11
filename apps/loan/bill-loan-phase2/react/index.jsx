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
    loadMoreHandler(){
        let page = this.state.page[this.state.tab];
        if (page == 0) return;
        let is_Level;
        if (this.state.tab == 'billApplying') {
            is_Level = -1
        } else if (this.state.tab == 'billReturning') {
            is_Level = 1
        } else if (this.state.tab == 'billFailing') {
            is_Level = 2
        } else if (this.state.tab == 'billPaid') {
            is_Level = 3
        }

     $FW.Post(`${API_PATH}mall/api/index/v1/vip_list.json`,{
         count:this.count,
         page:page,
         vipLevel:is_Level
       }).then((data)=>{
         let tab;
         if (is_Level == -1) {
             tab = 'billApplying'
         } else if (is_Level == 1) {
             tab = 'billReturning'
         } else if (is_Level == 2) {
             tab = 'billFailing'
         } else if (is_Level == 3) {
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

        let list_li = () => {
            return (
                <div className="list_li">
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
                    {list_li()}
                    {list_li()}
                    {list_li()}
                    {list_li()}
                    {list_li()}
                    {list_li()}
                    {list_li()}
                    {list_li()}
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

