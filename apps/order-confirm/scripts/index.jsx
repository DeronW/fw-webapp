'use strict';

const STATIC_PATH = document.getElementById('static-path').value;
const API_PATH = document.getElementById('api-path').value;

var query = $FW.Format.urlQuery();

window.FormaData = {
    buyNum: query.count || 1,
    useBean: true,
    payBeanPrice: null,
    payRmbPrice: null,
    productBizNo: query.bizNo,
    useTicket: false,
    ticket: [],
    tokenStr: query.tokenStr,
    addressId: null
};

function submit() {
    console.log(window.FormData);
    $FW.Ajax({
        url: '/mall/api/order/v1/commit_pay_order.json',
        data: window.FormaData,
        success: function () {
            alert("make order success")
        }
    })
}

const ConfirmOrder = React.createClass({

    getInitialState: function () {
        return {
            show_modal: true,
            product_count: this.props.product.count,
            disable_pay: false,
            checked_voucher: {},
            show_voucher_modal: false
        }
    },
    showVoucherModal: function () {
        this.setState({show_voucher_modal: true})
    },
    hideVoucherModalHandler: function () {
        this.setState({show_voucher_modal: false})
    },
    confirmCheckedVoucherHandler: function (checked_voucher) {
        this.setState({show_voucher_modal: false, checked_voucher: checked_voucher});
    },
    changeValue: function (e) {
        this.setState({value: e.target.value})
    },
    makeOrderHandler: function () {
        $FW.Ajax({
            url: '/mall/api/order/v1/validatePaySmsCode.json',
            data: {smsCode: window.FormData.sms_code},
            success: submit
        })
    },
    updateProductCountHandler: function (c) {
        this.setState({product_count: c});
        window.FormData.buyNum = c;
    },

    render: function () {
        let address = null;
        let _this = this;

        if (this.props.default_address_id) {
            this.props.address_list.forEach(function (i) {
                if (i.id == _this.props.default_address_id) address = i;
            });
        }

        return (
            <div className="confirm-order">
                <header className="header">
                    确认订单
                    <a href="#" className="btn-back"
                       style={{background:"url("+STATIC_PATH+"images/ico-blue-back.png) no-repeat 30px center"}}>
                    </a>
                </header>
                { address ? <Address address={address}/> : <NewAddress /> }
                <ConfirmOrder.Product product={this.props.product}
                                      update_product_count_handler={this.updateProductCountHandler}/>
                <ConfirmOrder.Extra product_count={this.state.product_count}
                                    product_price={this.props.product.price}
                                    product_score={this.props.product.score}
                                    user={this.props.user}
                                    show_voucher_modal={this.showVoucherModal}/>
                <ConfirmOrder.Captcha />
                <div className="confirm-order-foot">
                    <a onClick={this.makeOrderHandler}
                       className={this.state.disable_pay ? "btn-red btn-gray" : "btn-red"}>确认购买</a>
                </div>
                {this.state.show_voucher_modal ?
                    <ConfirmOrder.VoucherModal hide_voucher_modal={this.hideVoucherModalHandler}
                                               checked_voucher={this.state.checked_voucher}
                                               voucher_list={this.props.ticket_list}
                                               confirm_checked_voucher={this.confirmCheckedVoucherHandler}/> : null}
            </div>
        )
    }
});

ConfirmOrder.Product = React.createClass({
    getInitialState: function () {
        return {count: this.props.product.count}
    },
    decreaseHandler: function () {
        let count = this.state.count - 1;
        if (count <= 0) count = 1;
        this.setState({count: count});
        this.props.update_product_count_handler(count);
    },
    increaseHandler: function () {
        this.setState({count: this.state.count + 1});
        this.props.update_product_count_handler(this.state.count + 1);
    },
    render: function () {
        let p = this.props.product;

        return (
            <div className="pro-order">
                <div className="list">
                    <img src={p.img} className="list-img"/>
                    <div className="title">{p.title}</div>
                    <div className="mark">
                        { p.tags.map((d, index) => <div key={index}>{d}</div>) }
                    </div>
                    <div className="price-box">
                        <span>&yen;</span><span>{p.price}</span>
                        { p.score ? <span> + {p.score}</span> : null }
                    </div>
                </div>
                <div className="num-box">
                    <div className="num-text">商品数量</div>
                    <div className="num">
                        <div className="minus" onClick={this.decreaseHandler}
                             style={{background:"url("+STATIC_PATH+"images/gray-minus.png) no-repeat center"}}></div>
                        <div className="value">{this.state.count}</div>
                        <div className="plus" onClick={this.increaseHandler}
                             style={{background:"url("+STATIC_PATH+"images/gray-plus.png) no-repeat center"}}></div>
                    </div>
                </div>
                <div className="total-box">
                    <div className="total-money">
                        <span>合计：</span>
                        <span>&yen;{$FW.Format.currency(this.state.count * p.price)}</span>
                        {p.score ? <span> </span> : null}
                        {p.score ? p.score * this.state.count : null}
                    </div>
                    <div className="total-text">
                        共{this.state.count}件商品
                    </div>
                </div>
            </div>
        )
    }
});

ConfirmOrder.Extra = React.createClass({
    getInitialState: function () {
        return {
            checked_coupons: {},
            use_bean: true
        }
    },
    toggleBeanHandler: function () {
        this.setState({use_bean: !this.state.use_bean});
        window.FormData.useBean = !this.state.use_bean;
        window.FormData.payBeanPrice = window.FormData.useBean ? this.props.user.bean : 0;
    },
    render: function () {
        let checked_tickets = [];
        for (var i in this.state.checked_coupons) {
            if (!this.state.checked_coupons.hasOwnProperty(i)) checked_tickets.push(i);
        }

        let selectedVoucher = checked_tickets.length ?
            <div className="coupons-r">{checked_tickets[0].productName} &times; {checked_tickets.length}</div> : null;

        let score_used = this.props.product_count * this.props.product_score;
        let total_price = this.props.product_count * this.props.product_price;
        if (this.state.use_bean) total_price -= this.props.user.bean / 100;
        if (total_price < 0) total_price = 0;

        window.FormData.payRmbPrice = total_price;
        window.FormData.useTicket = checked_tickets.length > 0;
        window.FormData.ticket = checked_tickets.map((i) => i.id);

        return (
            <div className="balance-wrap">
                <div className="account-box">
                    <div className="coupons" onClick={this.props.show_voucher_modal}
                         style={{background:"url("+STATIC_PATH+"images/ico-gray-right.png) no-repeat 653px 27px"}}>
                        <div className="coupons-l">兑换券支付</div>
                        {selectedVoucher}
                    </div>
                    <div className="bean">
                        <div className="bean1">工豆账户</div>
                        <div className="bean2">&yen;{this.props.user.bean}</div>
                        <div className="bean3">
                            <div className={this.state.use_bean ? "btn-circle-box on" : "btn-circle-box"}>
                                <div className="btn-circle" onClick={this.toggleBeanHandler}>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="score">
                        <div className="score1">工分账户</div>
                        <div className={ 1 < 0 ? "score2 red" : "score2"}>{this.props.user.score}</div>
                        <div className="score3">{score_used ? score_used : null}</div>
                    </div>
                </div>
                <div className="balance-box">
                    <div className="balance1">当前余额</div>
                    <div className={"balance2 red"}>&yen;{this.props.user.charge}</div>
                    <div className="balance3">&yen;{$FW.Format.currency(total_price)}</div>
                    <div className="balance4">总计：</div>
                </div>
            </div>
        )
    }
});

ConfirmOrder.Captcha = React.createClass({
    getInitialState: function () {
        return {value: '', remain: 0}
    },
    changeValueHandler: function (e) {
        this.setState({value: e.target.value})
    },
    getCaptchaHandler: function () {
        if (this.state.remain == 0) {
            this.tick();
            $FW.Ajax({
                url: "/mall/api/order/v1/SendPhoneVerifyPay.json",
                method: 'post',
                success: function () {
                    alert('验证码已发送, 请查收')
                }
            })
        }
    },
    countingDown: function () {
        if (this.state.remain == 1) window.clearInterval(this._timer);
        this.setState({remain: this.state.remain - 1});
    },
    tick: function () {
        this.setState({remain: 60});
        this._timer = setInterval(this.countingDown, 1000);
    },
    render: function () {
        return (
            <div className="test">
                <div className="test-h">获取验证码</div>
                <div className="test-cnt">
                    <div className="test-input">
                        <input type="text" value={this.state.value} onChange={this.changeValueHandler}
                               placeholder="请输入验证码"/>
                    </div>
                    <div className={1 ? "btn-test-blue" : "btn-test-blue btn-test-gray"}
                         onClick={this.getCaptchaHandler}>
                        {this.state.remain ? this.state.remain + 's' : '获取验证码'}
                    </div>
                </div>
            </div>
        )
    }
});

ConfirmOrder.VoucherModal = React.createClass({
    getInitialState: function () {
        return {
            checked_voucher: this.props.checked_voucher
        }
    },

    ToggleCoupons: function (id) {
        var checked_voucher = this.state.checked_voucher;
        this.state.checked_voucher[id] = !this.state.checked_voucher[id];
        this.setState({checked_voucher: checked_voucher});
    },

    render: function () {
        let _this = this;

        let voucher = function (data, index) {
            let checkImg = _this.state.checked_voucher[data.id] ? 'red-right' : 'gray-block';

            return (
                <div className="li" key={index}
                     onClick={function(){_this.ToggleCoupons(data.id) }}>
                    <div className="chose"
                         style={{background:"url("+STATIC_PATH+"images/"+checkImg+".png) no-repeat 0 center"}}></div>
                    <div className="name">{data.productName}</div>
                    <div className="date">{data.endTime}</div>
                </div>
            )
        };

        return (
            <div className="coupon-pop-box">
                <div className="masker"></div>
                <div className="coupon-pop">
                    <div className="coupon-pop-h">使用兑换券</div>
                    <div className="coupon-pop-cont">
                        <div className="head">
                            <div className="chose"
                                 style={{background:"url("+STATIC_PATH+"images/gray-block.png) no-repeat 0 center"}}></div>
                            <div className="name">兑换券名称</div>
                            <div className="date">有效期</div>
                        </div>
                        <div className="list-wrap">
                            <div className="list">
                                { this.props.voucher_list.map(voucher)}
                            </div>
                        </div>
                    </div>
                    <div className="btn">
                        <div className="btn-cancel" onClick={this.props.hide_voucher_modal}>取消</div>
                        <div className="btn-confirm" onClick={function(){
                            _this.props.confirm_checked_voucher(_this.state.checked_voucher)
                        }}>确认
                        </div>
                    </div>
                </div>
            </div>
        )
    }
});

const NewAddress = React.createClass({
    render: function () {
        return (
            <div className="new-adress">
                <a href="/delivery_address/create">收货地址
                    <div className="btn-new-address"
                         style={{background:"url("+STATIC_PATH+"images/ico-add.png) no-repeat center"}}></div>
                </a>
            </div>
        )
    }
});

const Address = React.createClass({
    render: function () {
        let address = this.props.address;

        return (
            <div className="goods-adress">
                <div className="goods-adress-h">收货地址</div>
                <div className="goods-adress-cnt"
                     style={{background:"#fff url("+STATIC_PATH+"images/ico-blue-location.png) no-repeat 30px 30px"}}>
                    <a style={{background:"url("+STATIC_PATH+"images/ico-gray-right.png) no-repeat 671px center"}}>
                        <div className="inf">
                            <div className="receiver"><span>收货人：</span><span>{address.receiver}</span></div>
                            <div className="phone">{address.receiverPhone}</div>
                        </div>
                        <div className="detail">收货地址：{address.addressDetail}</div>
                    </a>
                </div>
            </div>
        )
    }
});

$FW.DOMReady(function () {
    let query = $FW.Format.urlQuery();
    let bizNo = query.bizNo;
    if (!bizNo) {
    }

    $FW.Ajax({
        url: API_PATH + 'mall/api/order/v1/pre_pay_order.json?productBizNo=' + bizNo + '&buyNum=1',
        //url: 'http://10.10.100.112/mockjs/4/api/v1/order/new.json?productBizNo=',
        success: function (data) {

            var user = {
                score: data.avaliablePoint,
                bean: data.avaliableBeanBalanceYuan,
                charge: data.availableCashBalance
            };
            var product = {
                img: data.previewTitleImage,
                title: data.productName,
                price: data.singleRmb,
                score: data.singlePoint,
                tags: data.tags,
                count: query.count || 1
            };

            window.FormData.addressId = query.address_id || data.addressId;
            window.FormData.payBeanPrice = user.bean;

            ReactDOM.render(<ConfirmOrder product={product} ticket_list={data.ticketList} user={user}
                                          address_list={data.addressList}
                                          default_address_id={query.address_id || data.addressId}
                />,
                document.getElementById('cnt'));
        }
    });
});