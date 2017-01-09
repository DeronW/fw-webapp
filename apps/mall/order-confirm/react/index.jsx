const ConfirmOrder = React.createClass({

    getInitialState: function () {
        var query = $FW.Format.urlQuery();

        window._form_data = this.FormData = {
            cartFlag: query.cartFlag,
            prds: query.productBizNo ||query.prds|| [],
            buyNum: query.buyNum || 0,
            tickets: [],
            msgCode: null,
            addressId: this.props.data.addressId,
            tokenStr: '',
            sourceType: $FW.Browser.inApp() ? ($FW.Browser.inAndroid() ? 4 : 3) : 2
        };

        return {
            isVirtualProduct: this.props.isVirtualProduct
        }
    },
    componentDidMount: function () {
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

        let submit = function submit() {
            console.log(this.FormData);
            $FW.Ajax({
                url: `${API_PATH}mall/api/order/v1/commit_pay_order.json`,
                //url: `./commit_pay_order.json`,
                //method: 'POST',
                enable_loading: true,
                data: this.FormData,
                success: (result) => {
                    /*
                     if (data.errMsg) {
                     $FW.Component.Alert(data.errMsg);
                     this.refreshTokenStr()
                     } else {
                     */
                    console.log(result);
                    if (result.status == 1) {
                        location.href =
                            '/static/mall/payment/index.html?productName='+ result.productName+'&productInfo='+ result.productInfo+'&merchantNo=' + result.merchantNo+
                            '&amount='+ result.amount +'&orderTime='+ result.orderTime+'&orderBizNo='+ result.orderBizNo +'&orderGroupBizNo='+ result.orderGroupBizNo
                    }
                    else {
                        location.href = '/static/mall/order-complete/index.html'
                    }
                    /* } */
                }
            })
        }.bind(this);

        if (this.state.isVirtualProduct) {
            if (!this.FormData.msgCode) return $FW.Component.Alert('请填写手机验证码');

            $FW.Ajax({
                url: `${API_PATH}mall/api/order/v1/validatePaySmsCode.json`,
                //url: `./validatePaySmsCode.json`,
                enable_loading: true,
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


        if (typeof(options.used_bean_count) == 'number')
        //this.FormData.payBeanPrice = options.used_bean_count;
            if (typeof(options.voucher_list) == 'object') {
                this.FormData.tickets = [];
                for (var i = 0; i < options.voucher_list.length; i++) {
                    var e = options.voucher_list[i];
                    if (e.selected) this.FormData.tickets.push(e.id)
                }
                //this.FormData.useTicket = !!this.FormData.tickets.length;
            }
    },
    validateBeforeSMSCodeHandler: function () {
        let data = this.props.data;
        let product = this.props.product;
        let should_pay_count = parseInt(this.FormData.buyNum) - this.FormData.tickets.length;

        if (!this.FormData.addressId || this.FormData.addressId == 'undefined')
            return $FW.Component.Alert('请添加收货地址');

        if (data.payablePointAmt > data.avaliablePoints)
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
                <AddressPanel address={address}
                              product_biz_no={this.FormData.productBizNo}
                              product_count={this.state.product_count}/>
                <ProductPanel product={this.props.product}
                              product_count={this.state.product_count}/>
                <div className="custom-note">
                    <span className="note">备注</span><input type="text" value="" placeholder="您可以输入买家留言"
                                                           value={this.state.note} onChange={this.changeValueHandler}/>
                </div>
                <PaymentPanel product={this.props.product}
                              ordersTicketNum={this.props.data.ordersTicketNum}
                              avaliablePoints={this.props.data.avaliablePoints}
                              voucher_list={this.props.ticket_list}
                              user={this.props.user}
                              update_payment_handler={this.updatePaymentHandler}
                />
                <div className="total-price">
                    <div className="price-item">
                        <span className="item-name">商品金额</span><span
                        className="item-detail">￥{this.props.data.totalPrice}+{this.props.data.totalPoints}工分</span>
                    </div>
                    <div className="price-item">
                        <span className="item-name">兑换券</span><span
                        className="item-detail">-{this.props.data.ordersTicketPoints}工分-{this.props.data.ordersTicketPrice}金额</span>
                    </div>
                    <div className="price-item">
                        <span className="item-name">运费</span><span
                        className="item-detail">+￥{this.props.data.totalFreightPrice}</span>
                    </div>
                </div>

                <SMSCode validate_before_sms_handler={this.validateBeforeSMSCodeHandler}
                         update_sms_code_handler={this.updateSMSCodeHandler}/>
                <div className="confirm-order-foot">
                    <span className="total-item-name">实付:</span>
                    <span className="total-item-detail">¥{this.props.data.payableRmbAmt}+{this.props.data.payablePointAmt}工分</span>
                    <a onClick={this.makeOrderHandler}
                       className={this.props.data.canBuy ? "btn-red" : "btn-red btn-gray"}>提交订单</a>
                </div>

            </div>
        )
    }
});

$FW.DOMReady(function () {
    NativeBridge.setTitle('确认订单');

    var query = $FW.Format.urlQuery();
    let cartFlag = query.cartFlag;
    let prds = query.productBizNo || query.prds;
    console.log(prds);
    /*let prds1=[];
    if(prds.indexOf(',')!=(-1)){
        prds.split(",").map((p, index) => prds1.push(p));
        prds = prds1;
    }
    console.log(prds1);*/
    let buyNum = query.buyNum || 0;
    let userTicketList = [];
    //if (!query.productBizNo) $FW.Component.Alert('product bizNo not in url query');

    //var requestUrl = query.cartFlag ? (API_PATH + 'mall/api/order/v1/pre_pay_order.json?cartFlag=true&productBizNo=null&buyNum=null' ) :
    //(API_PATH + 'mall/api/order/v1/pre_pay_order.json?cartFlag=false&productBizNo=' + query.productBizNo + '&buyNum=' + (query.count || 1));

    $FW.Ajax({
        //url: requestUrl,
        url: `${API_PATH}mall/api/order/v1/pre_pay_order.json`,
        data: {
            cartFlag:cartFlag,
            prds: prds,
            buyNum:buyNum,
            userTicketList:userTicketList
        },
        enable_loading: true
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

    if ($FW.Utils.shouldShowHeader()) {
        ReactDOM.render(<Header title={"确认订单"}/>, document.getElementById('header'));
    }

    //$FW.setLoginRedirect('/static/mall/product-detail/index.html?bizNo=' + query.productBizNo);
});

//window.onNativeMessageReceive = function (msg) {
//    if (msg == 'history:back') history.back();
//};
