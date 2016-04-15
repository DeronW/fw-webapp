'use strict';

const STATIC_PATH = document.getElementById('static-path').value;
const API_PATH = document.getElementById('api-path').value;

const NavTitle = React.createClass({
    render: function () {
        return (
            <div className="nav-title">
                <span className="back-btn">
                    <img src="../images/back-btn.png"/>
                </span>
                <h1 className="title">我的订单</h1>
            </div>
        );
    }
});

const MyOrderMain = React.createClass({
    getInitialState: function () {
        return {
            index: 0,
            voucherName: ["全部", "待发货", "待收货", "已完成"]
        };
    },
    clickHandler: function (index) {
        this.setState({
            index: index
        });
    },
    render: function () {
        var self = this;

        var btnVoucher = (v, index) => (
            <div className={index == this.state.index ? "btn-tab select-li" : "btn-tab"}
                 style={{backgroundImage: "url("+STATIC_PATH+"images/line-icon.png)"}}
                 onClick={ function() { self.clickHandler(index) } }>
                <span className="tab-text">{self.state.voucherName[index]}</span>
            </div>
        );

        return (
            <div>
                <NavTitle/>
                <div className="ui-tab">
                    <div> {this.state.voucherName.map(btnVoucher)} </div>
                </div>
                <OrderList index={this.state.index} orders={this.props.orders}/>
            </div>
        );
    }
});

const OrderList = React.createClass({
    getInitialState: function () {
        var state = {
            all: [],
            prepare: [],
            shipping: [],
            complete: []
        };
        this.props.orders.forEach(function (i) {
            state.all.push(i);
            state[i.status].push(i);
        });
        return state
    },
    render: function () {
        var self = this;
        let allBlock = function (s) {
            return (
                <div className="order-all">
                    {
                        self.state[s].map((order) => <OrderBlock key={order.id} dataJson={order}/>)
                    }
                </div>
            );
        };

        let blockText = function() {
            return (
                <div className="no-commodity-block">
                    对不起没有商品
                </div>
            );
        }

        return (
            <div className="order-area">
                {this.props.index == 0 ? (this.state.all.length != 0 ? allBlock("all") : blockText()) : null}
                {this.props.index == 1 ? (this.state.prepare.length != 0 ? allBlock("prepare") : blockText()) : null}
                {this.props.index == 2 ? (this.state.shipping.length != 0 ? allBlock("shipping") : blockText()) : null}
                {this.props.index == 3 ? (this.state.complete.length != 0 ? allBlock("complete") : blockText()) : null}
            </div>
        );
    }
});

const OrderBlock = React.createClass({
    render: function () {
        let tags = function(s) {
           return (
             <span className="text">{s}</span>
            );
        }
        let infoBlock = function (index) {
            return (
                <a href={index.order_item_detail_url}>
                    <div className="t-info">
                        <div className="commodity-img">
                            <img src={index.img}/>
                        </div>

                        <div className="commodity-info">
                            <div className="commodity-name">
                                <h2>{index.title}</h2>
                            </div>

                            <div className="tag-block">
                                {
                                    index.tags.length != 0 ? tags(index.tags) : null
                                }
                            </div>

                            <div className="commodity-number">
                                <span className="money-text">￥{index.price} + {index.score}分</span>
                                <span className="number-text">X{index.count}</span>
                            </div>
                        </div>
                    </div>
                </a>
            );
        };

        return (
            <div className="order-block">
                <div className="title-block">
                    <span className="time-text">{this.props.dataJson.pay_at}</span>
                    <span className="ship-text">
                        {this.props.dataJson.status == "prepare" ? "待发货" : null}
                        {this.props.dataJson.status == "shipping" ? "待收货" : null}
                        {this.props.dataJson.status == "complete" ? "已完成" : null}
                        
                    </span>
                </div>

                <div className="info-block">
                    {
                        this.props.dataJson.products.map(function (index) {
                            return infoBlock(index);
                        })
                    }

                    <div className="commodity-total">
                        <span className="commodity-text">共件{this.props.dataJson.orderCount}商品</span>
                        <span className="total-text">
                            合计:￥
                            {this.props.dataJson.orderPrice}
                            + 
                            {this.props.dataJson.orderScore}
                            工分
                        </span>
                    </div>
                </div>
            </div>
        );
    }
});

$FW.DOMReady(function () {
    $FW.Ajax({
        url: API_PATH + "mall/api/v1/order_list.json",
        success: function (data) {
            ReactDOM.render(<MyOrderMain orders={data.orders}/>, document.getElementById("cnt")
            );
        }
    });
});

function severStr(str, n, symbol) {
    var returnStr = "";
    var c = 0;
    var newFloorStr = "";
    if (str[0] == "-") {
        c = 1;
        newFloorStr = Math.floor(str.substring(1, str.length)).toString();
    } else {
        newFloorStr = Math.floor(str).toString();
    }
    var a = newFloorStr.length % n;
    var b = 0;
    var poin = str.substr(newFloorStr.length, str.length);
    returnStr = (a != 0) ? (newFloorStr.substring(0, a) + symbol) : "";
    var newStr = newFloorStr.substring(a, newFloorStr.length);
    for (var i = 1; i < newStr.length + 1; i++) {
        if (i == b + n) {
            if (i == newStr.length) {
                returnStr = returnStr + newStr.substring(b, i - c) + poin;
            } else {
                returnStr = returnStr + newStr.substring(b, i) + symbol;
            }
            b = i;
        }
    }

    if (c == 1) {
        return "-" + returnStr;
    } else {
        return returnStr;
    }
}
