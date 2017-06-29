class BillDetail extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        let baseStatus = this.props.data.baseStatus;
        let link = `${API_PATH}/api/order/v1/jump.shtml?sourceType=${SOURCE_TYPE}&token=${USER.token}&uid=${USER.uid}&loanUuid=${$FW.Format.urlQuery().uuid}`;
        let app_link = `https://m.easyloan888.com/api/order/v1/jump.shtml?token=${USER.token}&uid=${USER.uid}&loanUuid=${$FW.Format.urlQuery().uuid}`;
        // if (!$FW.Browser.inWeixin()) {
        //     // 不再微信里, 要添加订单号, 直接跳转到订单. 在微信中要跳转到读秒的首页
        //     link += `&loanUuid=${$FW.Format.urlQuery().uuid}`
        // }

        return (
            <div className="detail-container">
                <div className="logo-wrap">
                    <div className="logo-container">
                        <img src={this.props.data.productLogo} />
                        <div className="logo-name">{this.props.data.productName}</div>
                    </div>
                </div>
                <div className="bill-detail-wrap">
                    <div className="bill-detail">
                        <div className="bill-left">
                            <div className="bill-num">{this.props.data.loanAmtStr}</div>
                            <div className="bill-info">借款金额</div>
                        </div>
                        <div className="bill-right">
                            <div className="bill-num">{this.props.data.termNumStr}</div>
                            <div className="bill-info">借款期限</div>
                        </div>
                    </div>
                    <div className="vertical-line"></div>
                </div>
                <div className="detail-status">

                </div>
                {baseStatus < 3 &&
                    <div className="enter-btn-wrap">
                        <a className="enter-btn" onClick={()=>{$FW.Browser.inApp()?NativeBridge.goto(app_link,false,"分期"):gotoHandler(link)}}>点击查看详情</a>
                    </div>}
            </div>
        )
    }
}
function gotoHandler(link, need_login) {
    if (link.indexOf('://') < 0) {
        link = location.protocol + '//' + location.hostname + link;
    }
    if ($FW.Browser.inApp()) {
        NativeBridge.goto(link, need_login)
    } else {
        location.href = encodeURI(link);
    }
}
const USER = $FW.Store.getUserDict();
$FW.DOMReady(function () {
    ReactDOM.render(<Header title={"账单详情"} />, HEADER_NODE);
    $FXH.Post(`${API_PATH}/api/order/v1/orderDetail.json`, {
        loanUuid: $FW.Format.urlQuery().uuid
    }).then((data) => {
        ReactDOM.render(<BillDetail data={data} />, CONTENT_NODE);
    });
});
