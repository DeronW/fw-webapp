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
            <li className={index == this.state.index ? "select-li" : ""} onClick={
                    function() {
                        self.clickHandler(index)
                    }
                }>
                <span className="tab-text">{self.state.voucherName[index]}</span>
            </li>
        );

        return (
            <div>
                <NavTitle/>

                <div className="ui-tab">
                    <ul>
                        {this.state.voucherName.map(btnVoucher)}
                    </ul>
                </div>

                <OrderList index={this.state.index} dataJson={this.props}/>
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
        this.props.dataJson.cont.forEach(function (i) {
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
                        self.state[s].map(function (index) {
                            return <OrderBlock dataJson={index}/>
                        })
                    }
                </div>
            );
        };

        return (
            <div className="order-area">
                {this.props.index == 0 ? allBlock("all") : null}
                {this.props.index == 1 ? allBlock("prepare") : null}
                {this.props.index == 2 ? allBlock("shipping") : null}
                {this.props.index == 3 ? allBlock("complete") : null}
            </div>
        );
    }
});

const OrderBlock = React.createClass({
    render: function () {
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
                                <span className="text">tags</span>
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
                        <span className="total-text">合计:￥{this.props.dataJson.orderPrice}
                            + {this.props.dataJson.orderScore}工分</span>
                    </div>
                </div>
            </div>
        );
    }
});

$FW.DOMReady(function () {
    $FW.Ajax({
        url: "http://10.10.100.112/mockjs/4/api/v1/order/list?status=",
        success: function (data) {
            ReactDOM.render(<MyOrderMain {...data}/>, document.getElementById("cnt")
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
