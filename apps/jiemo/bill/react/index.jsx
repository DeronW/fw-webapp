function gotoHandler(link) {
    if (link.indexOf('://') < 0) {
        link = location.protocol + '//' + location.hostname + link;
    }else {
        location.href = encodeURI(link);
    }
}

function formatDate(now) {
    var now = new Date();
    var yy = now.getFullYear();
    var mm = now.getMonth() + 1;
    var dd = now.getDate();
    var clock = yy + "-";
    if(mm < 10) clock += "0";
    clock += mm + "-";
    if(dd < 10) clock += "0";
    clock += dd + " ";
    return clock;
}

const Bill = React.createClass({
    getInitialState:function(){
        return {
            billList : this.props.data.loanList
        }
    },
    render: function () {
        let bill_item = (item, index) => {
            return (
                <div className="bill-item" key={index} onClick={ () => gotoHandler("/static/jiemo/bill-detail/index.html") }>
                    <div className="bill-detail">
                        <div className="bill-detail-wrap">
                            <span className="bill-money">{item.loanLeftAmount}</span>
                            {item.exceedDays? <span className="bill-status"></span>:null}
                        </div>
                        <span className="bill-deadline">{formatDate(item.dueTime)}到期</span>
                    </div>
                    <div className="pay-back-btn-wrap">
                        {item.status == 0 ? <div className="pay-back-btn-status1">打款中</div> : <div className="pay-back-btn-status2" onClick={ () => gotoHandler(`/static/jiemo/bill-payback/index.html?deductionGid=${item.deductionGid}&loanGid=${item.loanGid}&loanType=${item.loanType}`) }>还款</div>}
                    </div>
                </div>
            )
        };


        return (
            <div>
                <div className="header">
                    <div className="title">账单</div>
                    <div className="history-bill">历史账单</div>
                </div>
                <div className="data-box">
                    <div className="transfer-box">
                        <div className="transfer-title">当前账单(元)</div>
                        <div className="transfer-money">100000.00</div>
                        <div className="loan-info">
                            <div className="transfer-lines">
                                <div className="return-money">
                                    <span className="return-money-title">信用额度(元)</span>
                                    <span className="return-money-num">{this.props.data.creditLine}</span>
                                </div>
                                <div className="return-date">
                                    <span className="return-date-title">剩余可借(元)</span>
                                    <span className="return-date-day">{this.props.data.canBorrowAmount}</span>
                                </div>
                            </div>
                            <span className="vertical-line"></span>
                        </div>
                    </div>
                    {this.state.billList.map(bill_item)}
                </div>
                <div className="no-data-box">
                    <img className="no-data-img" src="images/no-data.png"/>
                </div>
            </div>
        )
    }
});

$FW.DOMReady(function () {
    $FW.Ajax({
        url: `${API_PATH}api/userBase/v1/login.json`,
        method: "post",
        data: {mobile:"13811518528", password:"123456",sourceType:3}
    }).then((data) => {
        //console.log(data);
        $FW.Ajax({
            url: `${API_PATH}api/oriole/v1/loanloadpage.json`,
            method: "post",
            data: {token:data.userLogin.userToken, userGid:data.userLogin.userGid,userId:data.userLogin.userId, productId:1, sourceType:3}
        }).then((data) => {
            console.log(data)
            ReactDOM.render(<Bill data={data}/>, document.getElementById('cnt'));
        }, (error) => console.log(error))
    }, (error) => console.log(error));
    ReactDOM.render(<BottomNavBar index={2}/>, document.getElementById('bottom-nav-bar'));
});
