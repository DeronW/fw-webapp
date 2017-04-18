class BillDetail extends React.Component{
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
                            <div className="bill-num">{this.props.data.loanAmtStr}</div>
                            <div className="bill-info">借款金额</div>
                        </div>
                        <div className="bill-right">
                            <div className="bill-num">{this.props.data.tremNum}</div>
                            <div className="bill-info">借款期限</div>
                        </div>
                    </div>
                    <div className="vertical-line"></div>
                </div>
                <div className="detail-status">

                </div>
                <div className="enter-btn-wrap">
                    <a className="enter-btn" href={`${API_PATH}api/order/v1/jump.html?token=${USER.token}&userGid=${USER.gid}userId=${USER.id}&uid=${USER.uid}`}>点击进入读秒</a>
                </div>
            </div>
        )
    }
}

const USER = $FW.Store.getUserDict();
$FW.DOMReady(function(){
    ReactDOM.render(<Header title={"账单详情"} />, HEADER_NODE);
    $FW.Post(`${API_PATH}api/order/v1/orderDetail.json`,{
        loanUuid:$FW.Format.urlQuery().uuid,
        token: USER.token,
        userGid: USER.gid,
        userId: USER.id,
        uid:USER.uid,
        sourceType: SOURCE_TYPE
    }).then((data)=>{
        ReactDOM.render(<BillDetail data={data}/>, CONTENT_NODE);
    });
});
