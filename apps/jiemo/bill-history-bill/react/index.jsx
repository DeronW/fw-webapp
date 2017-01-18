function gotoHandler(link) {
    location.href = encodeURI(link);
}

const HistoryBill = React.createClass({
    getInitialState: function () {
        return {
            page: 1,
            column: []
        }
    },
     componentDidMount:function(){
         $FW.Ajax({
             url:`${API_PATH}api/oriole/v1/loanhistory.json`,
             method:'POST',
             data:{token:localStorage.userToken, userGid:localStorage.userGid,userId:localStorage.userId, sourceType:3, pageSize:20, pageIndex:1},
         })
             .then((data)=> {
                 this.setState({column:data.loanHistoryList})
             }, (err)=> console.log(err));
         $FW.Event.touchBottom(this.loadMoreProductHandler);
     },
    loadMoreProductHandler: function (done) {
        this.setState({page: this.state.page + 1});
        $FW.Ajax({
            url: `${API_PATH}api/oriole/v1/loanhistory.json`,
            method:'POST',
            data: {token:localStorage.userToken, userGid:localStorage.userGid,userId:localStorage.userId, sourceType:3, pageSize:20, pageIndex:this.state.page},
            success: (data) => {
                console.log(data)
                let loanHistoryList = data.loanHistoryList;
                this.setState({
                    column: loanHistoryList,
                    hasData: !!loanHistoryList.length
                })
                done && done()
            },
            fail: ()=>true
        })
    },
    render:function(){
         let item_list = (item,index) => {
             let repayment;
             if (item.repaymentStatus == 0) repayment = '借款失败';
             if (item.repaymentStatus == 1) repayment = '已还款';
             return (
                 <div className="bill-item" key={index} onClick={ () => gotoHandler(`/static/jiemo/bill-detail/index.html?loanType=${item.loanType}&loanGid=${item.loanGid}`) }>
                     <div className="bill-detail">
                         <div className="bill-detail-wrap">
                             <span className="bill-money">{item.loanAmount}</span>
                         </div>
                         <span className="bill-deadline">{item.loanTimeStr}</span>
                     </div>
                     <div className="pay-back-btn-wrap">
                         <span className="bill-status">{repayment}<img src="images/right-arrow.jpg"/></span>
                     </div>
                 </div>
             )
         };
         return (
             <div>
                 {this.state.column.length == 0 ? (<div className="no-data-box">
                         <img className="no-data-img" src="images/no-data.png"/>
                     </div>):
                     (<div className="data-box">
                         {this.state.column.map(item_list)}
                         <div className="data-completion">已加载完全部数据</div>
                     </div>)}
             </div>
         )
     }
});

$FW.DOMReady(function() {
    ReactDOM.render(<Header title={"历史账单"}/>, document.getElementById('header'));
    ReactDOM.render(<HistoryBill/>, document.getElementById('cnt'));
});
