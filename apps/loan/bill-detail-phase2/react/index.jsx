class BillHistory extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div className="detail-container">
                <div className="logo-wrap">
                    <div className="logo-container">
                        <img src="images/dumiao-logo.png"/>
                        <div className="logo-name">读秒</div>
                    </div>
                </div>
                <div className="bill-detail-wrap">
                    <div className="bill-detail">
                        <div className="bill-left">
                            <div className="bill-num">2500.00</div>
                            <div className="bill-info">借款金额</div>
                        </div>
                        <div className="bill-right">
                            <div className="bill-num">3个月</div>
                            <div className="bill-info">借款期限</div>
                        </div>
                    </div>
                    <div className="vertical-line"></div>
                </div>
                <div className="detail-status">
                    
                </div>
            </div>
        )
    }
}

$FW.DOMReady(function(){
    ReactDOM.render(<Header title={"账单详情"} />, HEADER_NODE);
    ReactDOM.render(<BillHistory />, CONTENT_NODE);
});
