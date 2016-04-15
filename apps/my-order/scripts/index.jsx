'use strict';

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

var data = [
    {
        pay_at: "@date_time",
        products: [
            {
                count: 64786,
                img: "测试内容0ptn",
                score: 10130,
                tags: "测试内容ut7v",
                price: 53206,
                title: "测试内容25hr"
            }
        ],
        orderPrice: 58536,
        status: "prepare",
        orderCount: 76720,
        orderScore: 88380
    },
    {
        pay_at: "@date_time",
        products: [
            {
                count: 64786,
                img: "测试内容0ptn",
                score: 10130,
                tags: "测试内容ut7v",
                price: 53206,
                title: "测试内容25hr"
            }
        ],
        orderPrice: 58536,
        status: "shipping",
        orderCount: 76720,
        orderScore: 88380
    },
    {
        pay_at: "@date_time",
        products: [
            {
                count: 64786,
                img: "测试内容0ptn",
                score: 10130,
                tags: "测试内容ut7v",
                price: 53206,
                title: "测试内容25hr"
            }
        ],
        orderPrice: 58536,
        status: "complete",
        orderCount: 76720,
        orderScore: 88380
    }
]

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

                <OrderList index={this.state.index} data={data}/>
            </div>
        );
    }
});

const OrderList = React.createClass({
    render: function () {
        var self = this;
        let allBlock = function () {
            return (
                <div className="order-all">
                    {
                        self.props.data.all.map(function (index) {
                            return <OrderBlock data={index}/>
                        })
                    }
                </div>
            );
        };

        let shipBlock = function () {
            return (
                <div className="order-ship">
                    {
                        self.props.data.ship.map(function (index) {
                            return <OrderBlock data={index}/>
                        })
                    }
                </div>
            );
        };

        let receiptBlock = function () {
            return (
                <div className="order-receipt">
                    {
                        self.props.data.receipt.map(function (index) {
                            return <OrderBlock data={index}/>
                        })
                    }
                </div>
            );
        };

        let finishBlock = function () {
            return (
                <div className="order-finish">
                    {
                        self.props.data.finisch.map(function (index) {
                            return <OrderBlock data={index}/>
                        })
                    }
                </div>
            );
        };

        return (
            <div className="order-area">
                {this.props.index == 0 ? allBlock() : null}
                {this.props.index == 1 ? shipBlock() : null}
                {this.props.index == 2 ? receiptBlock() : null}
                {this.props.index == 3 ? finishBlock() : null}
            </div>
        );
    }
});

const OrderBlock = React.createClass({
    render: function () {
        return (
            <div className="order-block">
                <div className="title-block">
                    <span className="time-text"></span>
                    <span className="ship-text">已发货</span>
                </div>

                <div className="info-block">
                    <div className="t-info">
                        <div className="commodity-img">
                            <img src=""/>
                        </div>

                        <div className="commodity-info">
                            <div className="commodity-name">
                                <h2></h2>
                            </div>

                            <div className="tag-block">
                                <span className="text">afafa</span>
                            </div>

                            <div className="commodity-number">
                                <span className="money-text">￥ + 分</span>
                                <span className="number-text">X</span>
                            </div>
                        </div>
                    </div>

                    <div className="commodity-total">
                        <span className="commodity-text">共件商品</span>
                        <span className="total-text">合计: ￥ + 工分</span>
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


/*ReactDOM.render(
 <MyOrderMain/>,
 document.getElementById("main")
 );
 */
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