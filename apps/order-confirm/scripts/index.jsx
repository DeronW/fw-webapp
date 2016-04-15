'use strict';

const STATIC_PATH = document.getElementById('static-path').value;
const API_PATH = document.getElementById('api-path').value;

window.FormaData = {
    count: 1,
    use_bean: false,
    captura: null,
    value: "",
    couponsUsed: [],
    CouponPop: false

};

const ConfirmOrder = React.createClass({

    getInitialState: function () {

        console.log(this.props)

        return {
            show_modal: true,
            product_count: this.props.data.products[0].count,
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

        console.log(checked_voucher)
    },
    changeValue: function (e) {
        this.setState({
            value: e.target.value
        })
    },

    render: function () {
        let shipping_info = this.props.data.shipping_info;

        return (
            <div className="confirm-order">
                <header className="header">
                    确认订单
                    <a href="#" className="btn-back"
                       style={{background:"url("+STATIC_PATH+"images/ico-blue-back.png) no-repeat 30px center"}}>
                    </a>
                </header>
                { shipping_info ? <Address username={shipping_info.username}
                                           phone={shipping_info.phone}
                                           address={shipping_info.address}/> : <NewAddr /> }
                <ConfirmOrder.Product products={this.props.data.products}/>
                <ConfirmOrder.Extra product_count={this.state.product_count}
                                    product_price={this.props.data.products[0].price}
                                    product_score={this.props.data.products[0].score}
                                    user_charge={this.props.user.charge} user_bean={this.props.user.bean}
                                    user_score={this.props.user.score}
                                    show_voucher_modal={this.showVoucherModal}/>
                <ConfirmOrder.Captcha />
                <div className="confirm-order-foot">
                    <a href="#" className={this.state.disable_pay ? "btn-red btn-gray" : "btn-red"}>确认购买</a>
                </div>
                {this.state.show_voucher_modal ?
                    <ConfirmOrder.VoucherModal hide_voucher_modal={this.hideVoucherModalHandler}
                                               checked_voucher={this.state.checked_voucher}
                                               confirm_checked_voucher={this.confirmCheckedVoucherHandler}/> : null}
            </div>
        )
    }
});

ConfirmOrder.Product = React.createClass({
    getInitialState: function () {
        return {
            count: this.props.products[0].count
        }
    },
    decreaseHandler: function () {
        let count = this.state.count - 1;
        if (count <= 0) count = 1;
        this.setState({count: count})
    },
    increaseHandler: function () {
        this.setState({count: this.state.count + 1})
    },
    render: function () {
        let p = this.props.products[0];

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
        this.setState({use_bean: !this.state.use_bean})
    },
    render: function () {
        let checked_coupon_length = 3;

        let selectedVoucher = checked_coupon_length ?
            <div className="coupons-r">{data.couponsList[0].name} &times; {checked_coupon_length}</div> : null;

        let score_used = this.props.product_count * this.props.product_score;
        let total_price = this.props.product_count * this.props.product_price;
        if (this.state.use_bean) total_price -= this.props.user_bean;
        if (total_price < 0) total_price = 0;

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
                        <div className="bean2">&yen;{this.props.user_bean}</div>
                        <div className="bean3">
                            <div className={this.state.use_bean ? "btn-circle-box on" : "btn-circle-box"}>
                                <div className="btn-circle" onClick={this.toggleBeanHandler}>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="score">
                        <div className="score1">工分账户</div>
                        <div className={ 1 < 0 ? "score2 red" : "score2"}>{this.props.user_score}</div>
                        <div className="score3">{score_used ? score_used : null}</div>
                    </div>
                </div>
                <div className="balance-box">
                    <div className="balance1">当前余额</div>
                    <div className={"balance2 red"}>&yen;{this.props.user_charge}</div>
                    <div className="balance3">&yen;{total_price}</div>
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
            //$FW.Ajax({
            //    url: "",
            //    method: 'post',
            //    success: function () {
            //    }
            //})
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

        let voucher = function (data) {
            let checkImg = _this.state.checked_voucher[data.couponId] ? 'red-right' : 'gray-block';

            return (
                <div className="li"
                     onClick={function(){_this.ToggleCoupons(data.couponId) }}>
                    <div className="chose"
                         style={{background:"url("+STATIC_PATH+"images/"+checkImg+".png) no-repeat 0 center"}}></div>
                    <div className="name">{data.name}</div>
                    <div className="date">{data.dated}</div>
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
                                { window.data.couponsList.map(voucher)}
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

const NewAddr = React.createClass({
    render: function () {
        return (
            <div className="new-adress">
                <a href="#">收货地址
                    <div className="btn-new-adress"
                         style={{background:"url(../images/ico-add.png) no-repeat center"}}></div>
                </a>
            </div>
        )
    }
});

const Address = React.createClass({
    render: function () {
        return (
            <div className="goods-adress">
                <div className="goods-adress-h">收货地址</div>
                <div className="goods-adress-cnt"
                     style={{background:"#fff url("+STATIC_PATH+"images/ico-blue-location.png) no-repeat 30px 30px"}}>
                    <a href="#"
                       style={{background:"url("+STATIC_PATH+"images/ico-gray-right.png) no-repeat 671px center"}}>
                        <div className="inf">
                            <div className="receiver"><span>收货人：</span><span>{this.props.username}</span></div>
                            <div className="phone">{this.props.phone}</div>
                        </div>
                        <div className="detail">收货地址：{this.props.detail}</div>
                    </a>
                </div>
            </div>
        )
    }
});
window.data = {
    addr: {
        username: "兰玉玉",
        phone: 13512345678,
        detail: "收货地址：北京市西城区金融街街道宣武门西大街129号金隅大厦1201室"
    },
    list: {
        img: "../images/pro-img1.jpg",
        proId: "1223",
        title: "Apple / 苹果   iPad Air2  128G   WIFI64g 金色",
        mark: ["vip1", "限购一件", "限购二件", "限购三件", "限购四件"],
        price: 19999,
        score: 200,
        num: 4
    },
    accountBean: 10.00,
    accountScore: 100,
    balance: 1000,
    couponsList: [
        {
            couponId: "1",
            name: "中秋节中秋节中秋节券",
            dated: "2015-05-03"
        },
        {
            couponId: "2",
            name: "中秋节中秋节中秋节券",
            dated: "2015-05-03"
        },
        {
            couponId: "3",
            name: "中秋节中秋节中秋节券",
            dated: "2015-05-03"
        }
    ]
};

$FW.DOMReady(function () {
    $FW.Ajax({
        url: API_PATH + 'mall/api/v1/order_detail.json',
        success: function (data) {
            var user = {
                score: 100,
                bean: 99,
                charge: 9999
            };
            ReactDOM.render(<ConfirmOrder data={data} user={user}/>, document.getElementById('cnt'));
        }
    });
});
