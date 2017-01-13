const HistoryBill = React.createClass({
    getInitialState: function () {
        return {
            page: 1,
            hasData: true,
            column: []
        }
    },
     componentDidMount:function(){
         $FW.Ajax({
             url:`${API_PATH}api/oriole/v1/loanhistory.json`,
             method:'POST',
             data:{token:localStorage.userToken, userGid:localStorage.userGid,userId:localStorage.userId, sourceType:3, pageSize:20, pageIndex:1},
         })
             .then((data)=> this.setState({column: data.products}));
         $FW.Event.touchBottom(this.loadMoreProductHandler);
     },
    loadMoreProductHandler: function (done) {
        this.setState({page: this.state.page + 1});
        let arr = [];
        this.state.hasData ?
            $FW.Ajax({
                url: `${API_PATH}api/oriole/v1/loanhistory.json`,
                method:'POST',
                data: {token:localStorage.userToken, userGid:localStorage.userGid,userId:localStorage.userId, sourceType:3, pageSize:20, pageIndex:this.state.page},
                success: (data) => {
                    let products = data.products;
                    this.setState({
                        column: [...this.state.column, ...products],
                        hasData: !!products.length
                    })
                    done && done()
                }
            }) : null
    },
    render:function(){
         let item_list = (item,index) => {
             return (
                 <div className="bill-item" key={index}>
                     <div className="bill-detail">
                         <div className="bill-detail-wrap">
                             <span className="bill-money">{item.loanAmount}</span>
                         </div>
                         <span className="bill-deadline">{item.loanTime}</span>
                     </div>
                     <div className="pay-back-btn-wrap">
                         <span className="bill-status">{item.repaymentStatus}<img src="images/right-arrow.jpg"/></span>
                     </div>
                 </div>
             )
         };
         return (
             <div>
                 <div className="data-box">
                     {this.state.column.map(item_list)}
                     <div className="data-completion">已加载完全部数据</div>
                 </div>
                 <div className="no-data-box">
                     <img className="no-data-img" src="images/no-data.png"/>
                 </div>
             </div>
         )
     }
});

$FW.DOMReady(function() {
    ReactDOM.render(<Header title={"历史账单"}/>, document.getElementById('header'));
    ReactDOM.render(<HistoryBill/>, document.getElementById('cnt'));
});
