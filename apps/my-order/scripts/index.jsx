'use strict';

const NavTitle = React.createClass({
    render: function() {
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

var orderListData = {
    all: [
        {
            count: 35326,
            img: "http://lorempixel.com/100/100/",
            pay_at: "2016.11.11 15.20,30",
            place_order_time: "测试内容ik4n",
            price: 24510,
            score: 78425,
            status: "delivery",
            tags: [
                "string1",
                "string2",
                "string3",
                "string4",
                "string5"
            ],
            title: "测试内容2651"
        },
        {
            count: 35326,
            img: "http://static.yingyonghui.com/screenshots/614/614760_2.jpg",
            pay_at: "@date_time",
            place_order_time: "测试内容ik4n",
            price: 1000,
            score: 200,
            status: "delivery",
            tags: [
                "xioaa",
                "kstring4",
                "aaa"
            ],
            title: "测试内容2651"
        }
    ],

    ship: [
        {
            count: 35326,
            img: "http://static.yingyonghui.com/screenshots/614/614760_2.jpg",
            pay_at: "@date_time",
            place_order_time: "测试内容ik4n",
            price: 1000,
            score: 200,
            status: "delivery",
            tags: [
                "xioaa",
                "kstring4",
                "aaa"
            ],
            title: "测试内容2651"
        }
    ],
    receipt: [
        {
            count: 326,
            img: "http://static.yingyonghui.com/screenshots/614/614760_2.jpg",
            pay_at: "@date_time",
            place_order_time: "测试内容ik4n",
            price: 10000,
            score: 190,
            status: "delivery",
            tags: [
                "xioaa",
                "kstring4",
                "aaa"
            ],
            title: "afxxxxxxxxxx"
        },
        {
            count: 326,
            img: "http://static.yingyonghui.com/screenshots/614/614760_2.jpg",
            pay_at: "@date_time",
            place_order_time: "测试内容ik4n",
            price: 10000,
            score: 190,
            status: "delivery",
            tags: [
                "xioaa",
                "kstring4",
                "aaa"
            ],
            title: "afdafadfafdafasdf2651"
        }
    ],
    finisch: [
        {
            count: 326,
            img: "http://static.yingyonghui.com/screenshots/614/614760_2.jpg",
            pay_at: "@date_time",
            place_order_time: "测试内容ik4n",
            price: 10000,
            score: 190,
            status: "delivery",
            tags: [
                "xioaa",
                "kstring4",
                "aaa"
            ],
            title: "000000000000"
        },
        {
            count: 326,
            img: "http://static.yingyonghui.com/screenshots/614/614760_2.jpg",
            pay_at: "@date_time",
            place_order_time: "测试内容ik4n",
            price: 10000,
            score: 190,
            status: "delivery",
            tags: [
                "xioaa",
                "kstring4",
                "aaa"
            ],
            title: "ssssssss"
        }
    ]
}
const MyOrderMain = React.createClass({
    getInitialState: function() {
        return {
            index: 0,
            voucherName: ["全部", "待发货", "待收货", "已完成"]
        };
    },
    clickHandler: function(index) {
        this.setState({
            index: index  
        }); 
    },
    render: function() {
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

                <OrderList index = {this.state.index} data={orderListData}/>
            </div>
        );
    } 
});

const OrderList = React.createClass({
    render: function() {
        var self = this;
        let allBlock = function() {
            return (
                <div className="order-all">
                    {
                        self.props.data.all.map(function(index) {
                            return <OrderBlock data={index}/>
                        })
                    }
                </div>
            );
        };

        let shipBlock = function() {
            return (
                <div className="order-ship">
                    {
                        self.props.data.ship.map(function(index) {
                            return <OrderBlock data={index}/>
                        })
                    }
                </div>
            );
        };
        
        let receiptBlock = function() {
            return (
                <div className="order-receipt">
                    {
                        self.props.data.receipt.map(function(index) {
                            return <OrderBlock data={index}/>
                        })
                    }
                </div>
            );
        };

        let finishBlock = function() {
            return (
                <div className="order-finish">
                    {
                        self.props.data.finisch.map(function(index) {
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
    render: function() {
        return(
                <div className="order-block">
                    <div className="title-block">
                        <span className="time-text">{this.props.data.pay_at}</span>
                        <span className="ship-text">已发货</span>
                    </div>

                    <div className="info-block">
                        <div className="t-info">
                            <div className="commodity-img">
                                <img src={this.props.data.img}/>
                            </div>

                            <div className="commodity-info">
                                <div className="commodity-name">
                                    <h2>{this.props.data.title}</h2>
                                </div>

                                <div className="tag-block">
                                    {
                                        this.props.data.tags.map(function(index) {
                                            return <span className="text">{index}</span>
                                        })
                                    }
                                </div>

                                <div className="commodity-number">
                                    <span className="money-text">￥{severStr(this.props.data.price.toString(), 3, ",")} + {this.props.data.score}分</span>
                                    <span className="number-text">X{this.props.data.count}</span>
                                </div>
                            </div>
                        </div>

                        <div className="commodity-total">
                             <span className="commodity-text">共{this.props.data.count}件商品</span>
                             <span className="total-text">合计: ￥{this.props.data.price} + {this.props.data.score}工分</span>
                        </div>
                    </div>
                </div>
        ); 
    }
});

$FW.DOMReady(function() {
/*    $FW.Ajax({
        url: "http://10.10.100.112/mockjs/4/api/v1/order/list?status=",
        success: function(data) {
            ReactDOM.render(
                <MyOrderMain {...data}/>,
                document.getElementById("main")
            );
        }
    });
*/
})


ReactDOM.render(
    <MyOrderMain/>,
    document.getElementById("main")
);

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
        if(i == b + n) {
            if(i == newStr.length) {
                returnStr = returnStr + newStr.substring(b, i -c ) + poin; 
            } else {
                returnStr = returnStr + newStr.substring(b, i) + symbol; 
            }
            b = i; 
        } 
    }
    
    if ( c == 1) {
        return "-" + returnStr;
    } else {
        return returnStr;
    }
}

