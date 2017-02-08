const Logistics = React.createClass({
    getInitialState: function () {
        return {}
    },
    render: function () {
        let ls = this.props.data.logistics;
        var query = $FW.Format.urlQuery();
        let logisticsItem = (l, index)=> {
            return (
                <div className="logistics-li" key={index}>
                    {index == 0 ? <span className="first-mark-status"></span> : <span className="mark-status"></span>}
                    <span className="logistics-vertical-line"></span>
                    <div className={index==0? "logistics-title green":"logistics-title grey"}>{ls[index].text}</div>
                    <div className={index==0? "logistics-date green":"logistics-date grey"}>{ls[index].date}</div>
                </div>
            )
        };
        return (
            <div className="logistics">
                <div className="product-info">
                    <div className="logistics-info">
                        <div className="logistics-item logistics-margin-top-space">物流状态：{this.props.data.state}</div>
                        <div className="logistics-item">物流名称：{query.sendChannel}</div>
                        <div className="logistics-item">物流编号：{this.props.data.sendOrderNo}</div>
                    </div>
                </div>
                <div className="logistics-wrap">
                    {ls.map((l, index) => logisticsItem(l, index)) }
                </div>
            </div>
        )
    }
});


$FW.DOMReady(function () {
    ReactDOM.render(<Header title={"查看物流"}/>, HEADER_NODE);
    var query = $FW.Format.urlQuery();
    $FW.Ajax({
        //url: "http://localhost/nginx-1.9.12/html/logistics.json",
        url: API_PATH + "mall/api/order/v1/logistics.json",
        enable_loading: true,
        data: {
            sendOrderNo: query.sendOrderNo,
            sendChannel: query.sendChannel,
            sendChannelEnum: query.sendChannelEnum
            //sendOrderNo:1000688237617,
            //sendChannel:"韵达快递",
            //sendChannelEnum:"YD"
        },
        success: function (data) {
            console.log(data);
            ReactDOM.render(<Logistics data={data}/>, CONTENT_NODE);
        }
    });
});

