const ConfirmOrder = React.createClass({

    getInitialState: function () {
        var query = $FW.Format.urlQuery();
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

        window._form_data = this.FormData = {
            cartFlag: query.cartFlag,
            prd: query.prd || [],
            buyNum: query.buyNum || 0,
            userTickets: [],
            msgCode: null,
            addressId: this.props.data.addressId,
            tokenStr: '',
            sourceType: sourceType
        };

        return {
            isVirtualProduct: this.props.isVirtualProduct,
            avaliablePoints: this.props.data.avaliablePoints,
            payablePointAmt: this.props.data.payablePointAmt

        }
    },
    componentWillMount: function () {
        this.refreshTokenStr()
    },
    refreshTokenStr: function () {
        $FW.Ajax({
            url: `${API_PATH}mall/api/order/v1/getTokenStr.json`
            //url: `./getTokenStr.json`
        }).then(data => {
            this.FormData.tokenStr = data.tokenStr;
        })
    },
    makeOrderHandler: function () {
        if (!this.props.data.canBuy) return; // $FW.Component.Alert('您现在不能购买这件商品');

        if (this.state.payablePointAmt > this.state.avaliablePoints) {
            $FW.Component.Alert('工分不足，不能购买');
            return;
        }

        let submit = function submit() {
            $FW.Ajax({
                url: `${API_PATH}mall/api/order/v1/commit_pay_order.json`,
                //url: `./commit_pay_order.json`,
                //method: 'POST',
                enable_loading: 'mini',
                data: this.FormData,
                success: (result) => {
                    /*
                     if (data.errMsg) {
                     $FW.Component.Alert(data.errMsg);
                     this.refreshTokenStr()
                     } else {
                     */
                    if (result.status == 1) {
                        location.href =
                            '/static/mall/payment/index.html?productName=' + result.productName + '&productInfo=' + result.productInfo + '&merchantNo=' + result.merchantNo +
                            '&amount=' + result.amount +'&payableRmbAmt=' + result.totalShouldPayPrice + '&orderTime=' + result.orderTime + '&orderBizNo=' + result.orderBizNo + '&orderGroupBizNo=' + result.orderGroupBizNo
                    }
                    else {
                        location.href = '/static/mall/order-complete/index.html?status=S'
                    }
                    /* } */
                }
            })
        }.bind(this);

        if (!this.state.isVirtualProduct) {
            if (!this.FormData.msgCode) return $FW.Component.Alert('请填写手机验证码');

            $FW.Ajax({
                url: `${API_PATH}mall/api/order/v1/validatePaySmsCode.json`,
                //url: `./validatePaySmsCode.json`,
                enable_loading: 'mini',
                method: 'post',
                data: {smsCode: this.FormData.msgCode},
                success: submit
            });
        } else {
            submit()
        }

    },
    updateSMSCodeHandler: function (code) {
        this.FormData.msgCode = code;
    },
    updatePaymentHandler: function (options) {
        //this.FormData.payBeanPrice = options.used_bean_count;
        if (typeof(options.voucher_list) == 'object') {
            this.FormData.userTickets = [];
            for (var i = 0; i < options.voucher_list.length; i++) {
                var e = options.voucher_list[i];

                if (e.selected) this.FormData.userTickets.push(e.id);
            }
            //this.FormData.useTicket = !!this.FormData.tickets.length;
        }

    },
    changeTicketPoints(payablePointAmt) {
        this.setState({
            payablePointAmt
        });
    },

    validateBeforeSMSCodeHandler: function () {
        //let data = this.props.data;
        //let product = this.props.product;
        //let should_pay_count = parseInt(this.FormData.buyNum) - this.FormData.userTickets.length;

        if (!this.FormData.addressId || this.FormData.addressId == 'undefined')
            return $FW.Component.Alert('请添加收货地址');

        // if (document.querySelector('.paidPoint').innerHTML> data.avaliablePoints)
        if (this.state.payablePointAmt > this.state.avaliablePoints)
            return $FW.Component.Alert('工分不足，不能购买');

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
                {this.props.data.showAddressOK ?
                    <AddressPanel address={address}
                                  cartFlag={this.FormData.cartFlag}
                                  prd={this.FormData.prd}
                                  buyNum={this.FormData.buyNum}/> : null
                }
                <ProductPanel product={this.props.product}
                              product_count={this.state.product_count}/>
                {/*<div className="custom-note">
                 <span className="note">备注</span><input type="text" value="" placeholder="您可以输入买家留言"
                 value={this.state.note} onChange={this.changeValueHandler}/>
                 </div>*/}
                <PaymentPanel product={this.props.product}
                              ordersTicketNum={this.props.data.ordersTicketNum}
                              avaliablePoints={this.props.data.avaliablePoints}
                              voucher_list={this.props.ticket_list}
                              user={this.props.user}
                              update_payment_handler={this.updatePaymentHandler}
                              changeTicketPoints={payablePointAmt => this.changeTicketPoints(payablePointAmt)}
                />
                <div className="total-price">
                    <div className="price-item">
                        <span className="item-name">商品金额</span><span
                        className="item-detail">
                        {this.props.data.totalPrice == 0 ? "" : "¥" + this.props.data.totalPrice}
                        {this.props.data.totalPrice == 0 || this.props.data.totalPoints == 0 ? "" : "+"}
                        {this.props.data.totalPoints == 0 ? "" : this.props.data.totalPoints + "工分"}</span>
                    </div>
                    <div className="price-item">
                        <span className="item-name">兑换券</span><span className="item-detail">0
                        {/*this.props.data.ordersTicketPoints==0?"":"-"+this.props.data.ordersTicketPoints+"工分"+
                         this.props.data.ordersTicketPrice?"":"-"+this.props.data.ordersTicketPrice+"金额"*/}</span>
                    </div>
                    <div className="price-item">
                        <span className="item-name">运费</span><span
                        className="item-detail"> ¥ {this.props.data.totalFreightPrice}</span>
                    </div>
                </div>
                {this.props.data.showAddressOK ?
                    <SMSCode validate_before_sms_handler={this.validateBeforeSMSCodeHandler}
                             update_sms_code_handler={this.updateSMSCodeHandler}/>
                    : null}
                <div className="confirm-order-foot">
                    <span className="total-item-name">实付:</span>
                    <span
                        className="total-item-detail">
                        {this.props.data.payableRmbAmt == 0 ? "" : "¥" + this.props.data.payableRmbAmt.toFixed(2)}
                        {this.props.data.payableRmbAmt == 0 || this.props.data.payablePointAmt == 0 ? "" : "+"}
                        {this.props.data.payablePointAmt == 0 ? "" : this.props.data.payablePointAmt + "工分"}
                        {/*¥{this.props.data.payableRmbAmt}+{this.props.data.payablePointAmt}工分*/}
                    </span>
                    <a onClick={this.makeOrderHandler}
                       className={this.props.data.canBuy ? "btn-red" : "btn-red btn-gray"}>提交订单</a>
                </div>
            </div>
        )
    }
});

$FW.DOMReady(function () {

    var query = $FW.Format.urlQuery();
    let cartFlag = query.cartFlag;
    let prd = query.prd || [];
    let buyNum = query.buyNum || 0;
    let userTicketList = [];
    //if (!query.productBizNo) $FW.Component.Alert('product bizNo not in url query');

    $FW.Ajax({
        url: `${API_PATH}mall/api/order/v1/pre_pay_order.json`,
        //url: `./pre_pay_order.json`,
        data: {
            cartFlag: cartFlag,
            prd: prd,
            buyNum: buyNum,
            userTickets: userTicketList
        },
        enable_loading: 'mini'
    }).then(data => {
        var user = {
            score: data.avaliablePoints || 0,
            score_server_error: data.avaliablePoints === ''
        };
        var close_score_func = !data.isOpenJiFenLevel;
        let is_virtual_product = true;
        data.productDetails.map((p, index) => {
            if (p.virtual == false) is_virtual_product = false
        });
        ReactDOM.render(<ConfirmOrder data={data} product={data.productDetails} ticket_list={data.tickets || []}
                                      user={user} address_list={data.addressList}
                                      close_score_func={close_score_func}
                                      default_address_id={query.address_id || data.addressId}
                                      isVirtualProduct={is_virtual_product}
        />, CONTENT_NODE);
    })

    ReactDOM.render(<Header title={"确认订单"}/>, HEADER_NODE);
});



