const Coupon = React.createClass({
    render: function () {
        let ls = this.props.data.coupon;
        let coupon = (l, index) => {
            return (
                <div className="coupon">
                    <div className="l-r-text">
                        <div className="info-block">
                            <span className="text">券码</span>
                            <span className="data-text">{ls[index].cardNum}</span>
                        </div>
                        <div className="info-block">
                            <span className="text">密码</span>
                            <span className="data-text">{ls[index].cardPwd}</span>
                        </div>
                        <div className="info-block">
                            <span className="text">有效期</span>
                            <span className="data-text">{ls[index].tillDate}</span>
                        </div>
                    </div>
                </div>
            )
        };
        return (
            <div className="coupon-list">
                {ls.map((l, index) => coupon(l, index)) }
            </div>
        )
    }
});


$FW.DOMReady(function () {
    ReactDOM.render(<Header title={"查看券码"}/>, HEADER_NODE);
    var query = $FW.Format.urlQuery();
    $FW.Ajax({
        url: API_PATH + "mall/api/order/v1/viewCardPass.json",
        enable_loading: 'mini',
        data: {
            bizNo: query.bizNo,
            cardUuid: query.cardUuid
        },
        success: function (data) {
            ReactDOM.render(<Coupon data={data}/>, CONTENT_NODE);
        }
    });
});

