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
            voucherName: ["未使用", "已使用", "已过期"],
            active: false,
            code: ""
        };
    },
    clickHandler: function (index) {
        this.setState({index: index});
    },

    //激活兑换
    changeVal: function (e) {
        var val = e.target.value;
        if (val != "") {
            this.setState({active: true});
        }
        else {
            this.setState({active: false});
        }
        this.setState({"code": val});
    },

    exChange: function (index) {
        if (!this.state.active) return;
        $FW.Ajax({
            data: {cheapCode: this.state.code},
            url: `${API_PATH}/mall/api/cheap/v1/bondCheapCode.json`,
            enable_loading: true
        }).then((data) => {
            $FW.Component.Alert('绑定成功');
            setTimeout(function () {
                window.location.reload();
            }, 1500)
        });
    },

    render: function () {
        var self = this;

        var btnVoucher = (v, index) =>
            <div key={index} className={index == this.state.index ? "btn-tab select-li" : "btn-tab"}
                 onClick={ function() { self.clickHandler(index) } }>
                <span className="tab-text">{self.state.voucherName[index]}</span>
            </div>;

        var inputWrap =
            <div className="input-wrap">
                <input type="text" defaultValue="" placeholder="" onChange={this.changeVal}/>
                <input type="button" className={this.state.active ? "msg-tip active":"msg-tip"}
                       value={"兑换"}
                       onClick={this.exChange}/>
                <span className="vertical-line"></span>
            </div>;

        return (
            <div>
                <div className="ui-tab">
                    <div> {this.state.voucherName.map(btnVoucher)} </div>
                </div>
                <div className="coupon-cont">
                    {inputWrap}
                    {
                        this.props.cheapCodes &&
                        <OrderList index={this.state.index} cheapCodes={this.props.cheapCodes}/>
                    }
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
                    { self.state[s].map((cheap) => <OrderBlock index={self.props.index} key={cheap.cheapBizNo}
                                                               cheap={cheap}
                                                               dataJson={cheap}/>) }
                </div>
            );
        };

        let blockText = <div className="no-commodity-block">暂无记录</div>;

        return (
            <div className="order-area">
                {this.props.index == 0 && (this.state['1'].length != 0 ? allBlock("1") : blockText) }
                {this.props.index == 1 && (this.state['2'].length != 0 ? allBlock("2") : blockText) }
                {this.props.index == 2 && (this.state['3'].length != 0 ? allBlock("3") : blockText) }
            </div>
        );
    }
});

const OrderBlock = React.createClass({
    clickUse: function () {
        if (this.props.index != 0) return;
        
        let cheap = this.props.cheap;
        let cheapBizNo = cheap.cheapBizNo;
        window.location.href = "/static/mall/order-confirm/index.html" + location.search + "&cheapBizNo=" + cheap.cheapBizNo + "&reduceAmont=" + cheap.reduceAmont;
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
            case 1:
                status_name = '未使用';
                status_color = pay_color;
                break;
            case 2:
                status_name = '已使用';
                status_color = pay_color;
                break;
            case 3:
                status_name = '已过期';
                status_color = prepare_color;
                break;
            default:
                return true
                break;
        }
        var _this = this;
        var text;
        if (this.props.index == 0) {
            text = "立即使用"
        }
        else if (this.props.index == 1) {
            text = "已使用"
        }
        else if (this.props.index == 2) {
            text = "已过期"
        }
        return (
            <div className="order-block">
                <div className="info-block">
                    <a>
                        <div className="t-info" onClick={_this.gotoDetail}>
                            <div className={this.props.index==0 ?"commodity-img" :"commodity-img commodity-img1"}>
                                <p className="price"><span>￥</span><b>{cheap.reduceAmont}</b></p>
                                <p className="condition">满{cheap.fullAmont}元可用</p>
                                {/*<img src={product.img || 'images/default-product.jpg'}/> */}
                            </div>
                            <div className="commodity-info">
                                <div className="commodity-name">
                                    <h2>{cheap.cheapName ? cheap.cheapName : "优惠券" }</h2>
                                </div>
                                <div className="commodity-number">
                                        <span className="money-text">
                                            全场通用
                                        </span>
                                </div>
                                <div className={this.props.index ==0 ? "buy-now":"buy-now buy-now-hui"}
                                     onClick={this.clickUse}> {text}</div>
                            </div>
                        </div>
                    </a>
                </div>
            </div>
        );
    }
});


$FW.DOMReady(function () {
    ReactDOM.render(<Header title={"优惠券"}/>, HEADER_NODE);
    $FW.Ajax({
        url: `${API_PATH}/mall/api/cheap/v1/queryAllcheap.json`,
        enable_loading: true
    }).then(data => {
            ReactDOM.render(<CouponMain cheapCodes={data.cheapCodes}/>, CONTENT_NODE);
        },
        e => {
            ReactDOM.render(<CouponMain/>, CONTENT_NODE)
        })
});

