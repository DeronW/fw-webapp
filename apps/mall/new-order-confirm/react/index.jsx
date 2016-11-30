const ConfirmOrder = React.createClass({

    getInitialState: function () {
        var query = $FW.Format.urlQuery();
        let product_count = this.can_buy_count(this.props.product.count);
        let use_bean = product_count > this.props.ticket_list.length;
        this.props.user.use_bean = use_bean;

        window._form_data = this.FormData = {
            sourceType: $FW.Browser.inApp() ? ($FW.Browser.inAndroid() ? 4 : 3) : 2,
            buyNum: product_count,
            useBean: use_bean,
            payBeanPrice: null,
            payRmbPrice: null,
            productBizNo: query.productBizNo,
            useTicket: null,
            ticket: [],
            tokenStr: '',
            sms_code: null,
            addressId: this.props.default_address_id,
            vipLevel: this.props.vipLevel,
            vipConfigUuid: this.props.vipConfigUuid,
            note:''
        };

        return {
            product_count: product_count,
            isVirtualProduct: this.props.isVirtualProduct
        }
    },
    componentDidMount: function () {
        this.refreshTokenStr()
    },
    refreshTokenStr: function () {
        $FW.Ajax({
            url: API_PATH + '/mall/api/order/v1/getTokenStr.json',
            success: function (data) {
                window._form_data.tokenStr = data.tokenStr;
            }
        });
    },
    componentDidUpdate: function () {
        this.can_buy(true)
    },
    can_buy: function (with_warning) {
        return this.can_buy_count(this.state.product_count, with_warning); // == this.state.product_count;
    },
    can_buy_count: function (count, with_warning) {
        let cnd = this.props.pay_condition;
        //let origin_count = count;
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

        if (count == 0) {
            $FW.Component.Alert('您已超过了限购数量');
        }

        return count
    },
    makeOrderHandler: function () {
        if (!this.can_buy(true)) return; // $FW.Component.Alert('您现在不能购买这件商品');

        let submit = function submit() {
            $FW.Ajax({
                url: API_PATH + '/mall/api/order/v1/commit_pay_order.json',
                enable_loading: true,
                data: this.FormData,
                success: (data) => {
                    if (data.errMsg) {
                        $FW.Component.Alert(data.errMsg);
                        this.refreshTokenStr()
                    } else {
                        location.href = '/static/mall/order-complete/index.html?id=' + data.orderId
                    }
                }
            })
        }.bind(this);

        if (!this.state.isVirtualProduct) {
            if (!this.FormData.sms_code) return $FW.Component.Alert('请填写手机验证码');

            $FW.Ajax({
                url: API_PATH + '/mall/api/order/v1/validatePaySmsCode.json',
                enable_loading: true,
                method: 'post',
                data: {smsCode: this.FormData.sms_code},
                success: submit
            });
        } else {
            submit()
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
        let should_pay_count = parseInt(this.FormData.buyNum) - this.FormData.ticket.length;

        if (!this.FormData.addressId || this.FormData.addressId == 'undefined')
            return $FW.Component.Alert('请添加收货地址');

        if (should_pay_count > 0 && product.score && this.props.close_score_func)
            return $FW.Component.Alert('下单失败，工分通道已关闭');

        if (this.props.user.score_server_error && should_pay_count > 0 && product.score) {
            return $FW.Component.Alert('工分通道关闭，暂不能购买');
        }

        if (should_pay_count > 0 && product.score && this.props.user.disable_score)
            return $FW.Component.Alert('账户工分已禁用，暂不能购买');

        if (product.score * should_pay_count > this.props.user.score)
            return $FW.Component.Alert('工分不足，不能购买');

        if (this.FormData.payRmbPrice > this.props.user.charge)
            return $FW.Component.Alert('余额不足, 不能购买');
        return true
    },
    changeValueHandler: function (e) {
        this.setState({note: e.target.value});
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
                    <AddressPanel address={address}
                                  product_biz_no={this.FormData.productBizNo}
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
                <div className="custom-note">
                    <span className="note">备注</span><input type="text" value="" placeholder="您可以输入买家留言" value={this.state.note} onChange={this.changeValueHandler}/>
                </div>
                <div className="total-price">
                    <div className="price-item">
                        <span className="item-name">商品金额</span><span className="item-detail">￥599.00+699工分</span>
                    </div>
                    <div className="price-item">
                        <span className="item-name">兑换券</span><span className="item-detail">-599工分</span>
                    </div>
                    <div className="price-item">
                        <span className="item-name">运费</span><span className="item-detail">+￥20</span>
                    </div>
                </div>
                <div className="total-price-item">
                    <span className="total-item-name">实付款</span><span className="total-item-detail">¥599.00+100工分</span>
                </div>

                    <SMSCode validate_before_sms_handler={this.validateBeforeSMSCodeHandler}
                             update_sms_code_handler={this.updateSMSCodeHandler}/>
                <div className="confirm-order-foot">
                    <a onClick={this.makeOrderHandler}
                       className={this.can_buy() ? "btn-red" : "btn-red btn-gray"}>提交订单</a>
                </div>

            </div>
        )
    }
});

$FW.DOMReady(function () {
    NativeBridge.setTitle('确认订单');

    var query = $FW.Format.urlQuery();

    //if (!query.productBizNo) $FW.Component.Alert('product bizNo not in url query');

    var requestUrl = query.cartFlag ? (API_PATH + 'mall/api/order/v1/pre_pay_order.json?cartFlag=true&productBizNo=null&buyNum=null' ) :
    (API_PATH + 'mall/api/order/v1/pre_pay_order.json?cartFlag=false&productBizNo=' + query.productBizNo + '&buyNum=' + (query.count || 1));

    $FW.Ajax({
        url: requestUrl,
        enable_loading: true,
        success: function (data) {
            console.log(data)
            var user = {
                score: data.avaliablePoints || 0,
                score_server_error: data.avaliablePoints === '',
                bean: data.avaliableBean,
                use_bean: true,
                disable_score: data.isPointForbidden,
                charge: data.availableCashBalance || 0
            };
            var product = {
                biz_no: query.productBizNo || null,
                img: data.previewTitleImage,
                title: data.productName,
                price: data.singleRmb,
                score: data.singlePoint,
                tags: data.tags || [],
                count: (parseInt(query.count) || 1) || null
            };
            var pay_condition = {
                product_bought: data.persionProductLimit,
                product_limit: data.productLimit,
                label_bought: data.persionLabelLimit,
                label_limit: data.labelLimit
            };
            var close_score_func = !data.isOpenJiFenLevel;

            ReactDOM.render(<ConfirmOrder product={product} ticket_list={data.ticketList || []}
                                          user={user} address_list={data.addressList}
                                          pay_condition={pay_condition}
                                          close_score_func={close_score_func}
                                          default_address_id={query.address_id || data.addressId}
                                          vipLevel={data.vipLevel}
                                          vipConfigUuid={data.vipConfigUuid}
                                          isVirtualProduct={data.is_virtual_product}
                />,
                document.getElementById('cnt'));
        }
    });

    if ($FW.Utils.shouldShowHeader()) {
        ReactDOM.render(<Header title={"确认订单"}/>, document.getElementById('header'));
    }

    //$FW.setLoginRedirect('/static/mall/product-detail/index.html?bizNo=' + query.productBizNo);
});

//window.onNativeMessageReceive = function (msg) {
//    if (msg == 'history:back') history.back();
//};
