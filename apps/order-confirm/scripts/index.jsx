'use strict';

const STATIC_PATH = document.getElementById('static-path').value;
const API_PATH = document.getElementById('api-path').value;

const ConfirmOrder = React.createClass({

    getInitialState: function () {
        var query = $FW.Format.urlQuery();
        let product_count = this.can_buy_count(this.props.product.count);

        window._form_data = this.FormData = {
            sourceType: $FW.Browser.inApp() ? ($FW.Browser.inAndroid() ? 4 : 3) : 2,
            buyNum: product_count,
            useBean: null,
            payBeanPrice: null,
            payRmbPrice: null,
            productBizNo: query.productBizNo,
            useTicket: null,
            ticket: [],
            tokenStr: query.tokenStr,
            sms_code: null,
            addressId: this.props.default_address_id
        };

        return {product_count: product_count}
    },
    componentDidMount: function () {
    },
    componentDidUpdate: function () {
        this.can_buy(true)
    },
    can_buy: function (with_warning) {
        return this.can_buy_count(this.state.product_count, with_warning) // == this.state.product_count;
    },
    can_buy_count: function (count, with_warning) {
        let cnd = this.props.pay_condiation;
        // let origin_count = count;
        let voucher_count = this.props.ticket_list.length;

        // 同商品判断最大购买数量
        let product_remain = cnd.product_limit - cnd.product_bought;
        if (product_remain < 0) product_remain = 0;
        product_remain += voucher_count;
        if (cnd.product_limit && count > product_remain) {
            if (with_warning) $FW.Component.Alert('该商品限购' + cnd.product_limit + '件');
            count = product_remain;
        }

        // 同标签最大购买数量
        let label_remain = cnd.label_limit - cnd.label_bought;
        if (label_remain < 0) label_remain = 0;
        label_remain += voucher_count;
        if (cnd.label_limit && count > label_remain) {
            if (with_warning) $FW.Component.Alert('该标签下商品限购' + label_remain + '件');
            count = label_remain;
        }

        return count
    },
    makeOrderHandler: function () {
        if (!this.can_buy(true)) return; // $FW.Component.Alert('您现在不能购买这件商品');
        if (!this.FormData.sms_code) return $FW.Component.Alert('请填写手机验证码');

        $FW.Ajax({
            url: API_PATH + '/mall/api/order/v1/validatePaySmsCode.json',
            enable_loading: true,
            method: 'post',
            data: {smsCode: this.FormData.sms_code},
            success: submit
        });

        let _this = this;

        function submit() {
            $FW.Ajax({
                url: API_PATH + '/mall/api/order/v1/commit_pay_order.json',
                enable_loading: true,
                data: _this.FormData,
                success: function (data) {
                    if (data.errMsg) {
                        $FW.Component.Alert(data.errMsg)
                    } else {
                        location.href = '/order/complete?id=' + data.orderId
                    }
                }
            })
        }
    },
    updateSMSCodeHandler: function (code) {
        this.FormData.sms_code = code;
    },
    updatePaymentHandler: function (options) {
        if (typeof(options.use_bean) == 'boolean')
            this.FormData.useBean = options.use_bean;
        if (typeof(options.used_bean_count) == 'number')
            this.FormData.payBeanPrice = options.used_bean_count;
        if (typeof(options.voucher_list) == 'object') {
            this.FormData.ticket = [];
            for (var i = 0; i < options.voucher_list.length; i++) {
                var e = options.voucher_list[i];
                if (e.checked) this.FormData.ticket.push(e.id)
            }
            this.FormData.useTicket = !!this.FormData.ticket.length;
        }
        if (typeof(options.total_price) == 'number')
            this.FormData.payRmbPrice = options.total_price;
    },
    updateProductCountHandler: function (c) {
        this.setState({product_count: c});
        this.FormData.buyNum = c;
    },
    validateBeforeSMSCodeHandler: function () {
        let product = this.props.product;

        if (!this.FormData.addressId || this.FormData.addressId == 'undefined')
            return $FW.Component.Alert('请选择收货地址');

        if (product.score * parseInt(this.FormData.buyNum) > this.props.user.score)
            return $FW.Component.Alert('工分不足, 不能购买');

        if (product.price * parseInt(this.FormData.buyNum) > this.props.user.charge)
            return $FW.Component.Alert('余额不足, 不能购买');
        return true
    },
    render: function () {
        let address = null;

        if (this.props.default_address_id) {
            this.props.address_list.forEach((i) => {
                if (i.id == this.props.default_address_id) address = i
            });
        }

        return (
            <div className="confirm-order">
                <AddressPanel address={address} product_biz_no={this.FormData.productBizNo}
                              product_count={this.state.product_count}/>
                <ProductPanel product={this.props.product}
                              product_count={this.state.product_count}
                              update_product_count_handler={this.updateProductCountHandler}/>
                <PaymentPanel product={this.props.product}
                              product_count={this.state.product_count}
                              voucher_list={this.props.ticket_list}
                              user={this.props.user}
                              update_payment_handler={this.updatePaymentHandler}
                />
                <SMSCode validate_before_sms_handler={this.validateBeforeSMSCodeHandler}
                         update_sms_code_handler={this.updateSMSCodeHandler}/>
                <div className="confirm-order-foot">
                    <a onClick={this.makeOrderHandler}
                       className={this.can_buy() ? "btn-red" : "btn-red btn-gray"}>确认购买</a>
                </div>

            </div>
        )
    }
});

$FW.DOMReady(function () {
    NativeBridge.setTitle('确认订单');

    var query = $FW.Format.urlQuery();

    if (!query.productBizNo) $FW.Component.Alert('product bizNo not in url query');

    $FW.Ajax({
        url: API_PATH + 'mall/api/order/v1/pre_pay_order.json?productBizNo=' + query.productBizNo + '&buyNum=' + (query.count || 1),
        //url: 'http://localhost/pre_pay_order.json',
        enable_loading: true,
        success: function (data) {

            var user = {
                score: data.avaliablePoints || 0,
                bean: data.avaliableBean,
                use_bean: true,
                charge: data.availableCashBalance || 0
            };
            var product = {
                biz_no: query.productBizNo,
                img: data.previewTitleImage,
                title: data.productName,
                price: data.singleRmb,
                score: data.singlePoint,
                tags: data.tags || [],
                count: parseInt(query.count) || 1
            };
            var pay_condiation = {
                product_bought: data.persionProductLimit,
                product_limit: data.productLimit,
                label_bought: data.labelLimit,
                label_limit: data.persionLabelLimit
            };

            ReactDOM.render(<ConfirmOrder product={product} ticket_list={data.ticketList}
                                          user={user} address_list={data.addressList}
                                          pay_condiation={pay_condiation}
                                          default_address_id={query.address_id || data.addressId}
                />,
                document.getElementById('cnt'));
        }
    });

    if (!$FW.Browser.inApp()) {
        ReactDOM.render(<Header title={"确认订单"}/>, document.getElementById('header'));
    }
});

window.onNativeMessageReceive = function (msg) {
    if (msg == 'history:back') history.back();
};
