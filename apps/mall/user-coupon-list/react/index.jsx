const CouponMain = React.createClass({
    getInitialState: function () {
        var index = 0;
        if (location.hash == '#2') {
            index = 1
        }
        else if (location.hash == '#3') {
            index = 2
        }

        return {
            index: index,
            voucherName: ["未使用", "已使用", "已过期"]
        };
    },
    clickHandler: function (index) {
        this.setState({index: index});
    },

    exChange: function (index) {
        $FW.Ajax(`${API_PATH}/mall/api/index/v1/bondCheapCode.json`)
            .then((data) => {
　　　　　　　　　alert(JSON.stringify(data))
            });
    },

    render: function () {
        var self = this;

        var btnVoucher = (v, index) =>
            <div key={index} className={index == this.state.index ? "btn-tab select-li" : "btn-tab"}
                 onClick={ function() { self.clickHandler(index) } }>
                <span className="tab-text">{self.state.voucherName[index]}</span>
            </div>;

        return (
            <div>
                <div className="ui-tab">
                    <div> {this.state.voucherName.map(btnVoucher)} </div>
                </div>
                <div className="coupon-cont">
                    <div className="input-wrap">
                        <input type="text" defaultValue="" placeholder="" onChange={this.changeVal}/>
                        <input type="button" className={this.state.active ? "msg-tip active":"msg-tip"}
                               value={"兑换"}
                               onClick={this.exChange}/>
                        <span className="vertical-line"></span>
                    </div>
                    <OrderList index={this.state.index} cheapCodes={this.props.cheapCodes}/>
                </div>
            </div>
        );
    }
});

const OrderList = React.createClass({
    getInitialState: function () {
        var state = {
            1: [],
            2: [],
            3: []
        };
        this.props.cheapCodes.forEach(function (i) {
            //state.all.push(i);
            state[i.status].push(i);
        });
        return state
    },
    render: function () {
        var self = this;
        let allBlock = function (s) {
            return (
                <div className="order-all">
                    { self.state[s].map((cheap) => <OrderBlock key={cheap.id} cheap={cheap} dataJson={cheap}/>) }
                </div>
            );
        };

        let blockText = <div className="no-commodity-block">暂无记录</div>;

        return (
            <div className="order-area">
                {this.props.index == 0 && (this.state.(1).length != 0 ? allBlock("1") : blockText) }
                {this.props.index == 1 && (this.state.(2).length != 0 ? allBlock("2") : blockText) }
                {this.props.index == 2 && (this.state.(3).length != 0 ? allBlock("3") : blockText) }
            </div>
        );
    }
});

const OrderBlock = React.createClass({
    clickPay: function (orderTime, orderNo, groupNo, payableRmbAmt) {
        let FormData = {
            orderTime: orderTime,
            orderBizNo: orderNo,
            orderGroupBizNo: groupNo
        };
        //alert(FormData); return false;
        $FW.Ajax({
            data: FormData,
            url: `${API_PATH}/mall/api/cart/v1/order_to_account.json`,
            enable_loading: true,
            success: function (result) {
                location.href =
                    '/static/mall/payment/index.html?&merchantNo=' + result.merchantNo +
                    '&amount=' + result.amount + '&orderTime=' + result.orderTime + '&orderBizNo=' + result.orderBizNo + '&orderGroupBizNo=' + result.orderGroupBizNo +
                    '&payableRmbAmt=' + result.totalShouldPayPrice + '&createdTime=' + result.duration
            }
        });
    },

    clickCancel: function (orderNo, groupNo) {
        confirmPanel.show(orderNo, groupNo)
    },

    clickCancelNo: function (index) {
        confirmPanel.hide()
    },
    gotoDetail: function (index) {
        //   let order = this.props.order;
        //   location.href = '/static/mall/order-detail/index.html?bizNo=' + order.bizNo + '&cardUuid=' + order.cardUuid + '&orderId=' + order.orderId
    },
    render: function () {
        let pay_color = {
            color: "#fd4d4c",
            float: "right"
        };
        let prepare_color = {
            color: "#fd4d4c",
            float: "right"
        };
        let shipping_color = {
            color: "#4aaef9",
            float: "right"
        };
        let complete_color = {
            color: "#999999",
            float: "right"
        };

        let cheap = this.props.cheap;
        let status_name;
        let status_color;
        switch (cheap.status) {
            case '2':
                status_name = '已使用';
                status_color = pay_color;
                break;
            case '3':
                status_name = '已过期';
                status_color = prepare_color;
                break;
            default:
                return true
                break;
        }
        var _this = this;
        let product_item = function (product, index) {

            return (
                <a key={index}>
                    <div className="t-info" onClick={_this.gotoDetail}>
                        <div className="commodity-img">
                            <p className="price"><span>￥</span><b>{product.reduceAmont}</b></p>
                            <p className="condition">满{product.fullAmont}元可用</p>
                            {/*<img src={product.img || 'images/default-product.jpg'}/> */}
                        </div>
                        <div className="commodity-info">
                            <div className="commodity-name">
                                <h2></h2>
                            </div>
                            {/*
                             <div className="tag-block">
                             { product.tags.length != 0 ? product.tags.map(
                             (i, index) => <span key={index} className="text">{i}</span>) : null }
                             </div>
                             */}
                            <div className="commodity-number">
                                <span className="money-text">
                                </span>
                                <span className="number-text">&times; {product.count}</span>
                            </div>
                            <div className="buy-now">立即使用</div>
                        </div>
                    </div>
                </a>
            );
        };

        return (
            <div className="order-block">
            </div>
        );
    }
});

const ConfAlert = React.createClass({
    getInitialState: function () {
        return {
            orderNo: "",
            groupNo: "",
            showcAlert: false
        }
    },
    show: function (orderNo, groupNo) {
        this.setState({
            orderNo: orderNo,
            groupNo: groupNo,
            showcAlert: true
        });
    },
    hide: function () {
        this.setState({showcAlert: false});
    },
    cancelY: function () {
        var sourceType;

        if ($FW.Browser.inApp()) {
            if ($FW.Browser.inAndroid()) {
                sourceType = 4
            }
            else {
                sourceType = 3
            }
        }
        else {
            sourceType = 2
        }

        $FW.Ajax({
            data: {
                orderBizNo: this.state.orderNo,
                orderGroupBizNo: this.state.groupNo,
                source: sourceType
            },
            url: `${API_PATH}/mall/api/cart/v1/cancelOrder.json`,
            enable_loading: true,
            success: function (data) {
                location.reload()
            }
        });
    },
    render: function () {
        if (!this.state.showcAlert) return null;
        return (
            <div className="alert-block">
                <div className="alert-bg"></div>
                <div className="alert-panel">
                    <div className="alert-text">是否取消订单？</div>
                    <div className="alert-btn"></div>
                    <div onClick={this.cancelY} className="alert-btn-y">是</div>
                    <div onClick={this.hide} className="alert-btn-n">否</div>
                </div>
            </div>
        );
    }
});

$FW.DOMReady(function () {
    ReactDOM.render(<Header title={"优惠券"} back_handler={back_handler}/>, HEADER_NODE);
    $FW.Ajax({
        url: `${API_PATH}/mall/api/cheap/v1/queryAllcheap.json`,
        enable_loading: true
    }).then(data => {
        ReactDOM.render(<CouponMain cheapCodes={data.cheapCodes}/>, CONTENT_NODE);
        window.confirmPanel = ReactDOM.render(<ConfAlert/>, document.getElementById("alert"));
    })
});

function back_handler() {
    location.href = '/static/mall/user/index.html';
}
