class Content extends React.Component{
    constructor(props){
        super(props);
        this.tabs = [
          {
            billType: 'applying',
            typeCN: '申请中'
          }, {
            billType: 'returning',
            typeCN: '还款中'
          }, {
            billType: 'failing',
            typeCN: '未通过'
          }, {
            billType: 'paid',
            typeCN: '已还款'
          }
        ];
        this.pageSize = 5;
        this.state = {
           loanStatus: this.getLoanStatus($FW.Format.urlQuery().tab.toLowerCase().slice(4)),
           billItems: Array(4).fill([]),
           moreToLoad: Array(4).fill(true)
        }
    }
    getLoanStatus = (tName) => {
        return this.tabs.findIndex((t) => (tName === t.billType)) + 1;
    }
    loadMoreHandler = (done) => {
        let loanIndex = this.state.loanStatus - 1;
        if (!this.state.moreToLoad[loanIndex]) {return;}
        let billItemsLength = this.state.billItems[loanIndex].length;
        let pageIndex = billItemsLength / this.pageSize + 1; // if there are more to load, this must be an integer
        $FXH.Post(`${API_PATH}/api/order/v1/orderList.json`, {
           pageSize: this.pageSize,
           pageIndex: pageIndex,
           loanStatus: this.state.loanStatus
         }).then((data) => {
           let newBillItems = data.resultList;
           let billItemsTemp = JSON.parse(JSON.stringify(this.state.billItems));
           billItemsTemp[loanIndex] = billItemsTemp[loanIndex].concat(newBillItems);
           this.setState({billItems: billItemsTemp});
           if (this.state.billItems[loanIndex].length === data.totalCount) {
               let moreToLoadTemp = this.state.moreToLoad.slice(0);
               moreToLoadTemp[loanIndex] = false;
               this.setState({moreToLoad: moreToLoadTemp});
           }
           done && done();
        }, (err) => $FW.Component.Toast(err.message));
    }
    componentDidMount() {
        this.loadMoreHandler(null);
        $FW.Event.touchBottom(this.loadMoreHandler);
    }
    shiftTab = (status) => {
        this.setState({loanStatus: status});
        let loanIndex = this.state.loanStatus - 1;
        if (this.state.billItems[loanIndex].length == 0 && this.state.moreToLoad[loanIndex]) {
            setTimeout(() => {this.loadMoreHandler(null)}, 500);
        }
    }
    render() {
        let tabEls = this.tabs.map((tab, index) => (
                <div key={tab.billType} className={index === this.state.loanStatus - 1 ? "ui-tab-li ui-select-li" : "ui-tab-li"} onClick={() => {this.shiftTab(index + 1);}}>
                     <span className="text">{tab.typeCN}</span>
                </div>
            ));
        let billItemEls = this.state.billItems[this.state.loanStatus - 1].map((item, index) => {
            let status = parseInt(item.baseStatus);
            let statusColor = `bill-${this.tabs[status-1].billType}-color`;
            return (
                <a className="list_li" key={index} href={item.productId == 1 ? `/static/loan/bill-detail/index.html?uuid=${item.loanGid}` : `/static/loan/bill-detail-dumiao/index.html?uuid=${item.uuid}`}>
                    <div className="list-img"><img src={item.productId == 1 ? "images/fxh-logo.png" : "images/dumiao-logo.png"}/></div>
                    <div className="list-content">
                        <div className="apply-num">借款金额:{item.loanAmtStr}元</div>
                        <div className="apply-duration">借款期限:{item.termNum}天</div>
                    </div>
                    <div className="apply-status-wrap">
                        <div className="apply-status"><span className={statusColor}>{this.tabs[status - 1].typeCN}</span></div>
                        <div className="apply-time">{item.loanTime}</div>
                    </div>
                </a>
            )
        });
        return (
            <div className="billContent">
                <div className="bill-header">
                    {!$FW.Browser.inWeixin() && <div className="billTitle">借款账单</div>}
                    <div className="ui-tab-block">{tabEls}</div>
                </div>
                <div className={$FW.Browser.inWeixin() ? "billContainer-weixin" : "billContainer"}>
                    {billItemEls}
                    {this.state.billItems[this.state.loanStatus - 1].length === 0 && <span className="no-data"></span>}
                </div>
            </div>
        )
    }
}

$FW.DOMReady(function(){
    ReactDOM.render(<Content />, CONTENT_NODE);
    ReactDOM.render(<BottomNavBar/>, BOTTOM_NAV_NODE);
});
