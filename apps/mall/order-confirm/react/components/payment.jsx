const PaymentPanel = React.createClass({
    getInitialState: function () {
        let voucher_list = this.props.voucher_list;
        let cc = $FW.Utils.length(voucher_list, (i) => i.checked);

        this.used_bean_count = 0;
        return {
            voucher_list: voucher_list,
            show_voucher_modal: false,
            use_bean: this.props.user.use_bean,
            checked_voucher_count: cc
        }
    },
    componentDidMount: function () {
        this.updateFormDataHandler()
    },
    componentDidUpdate: function () {
        this.updateFormDataHandler()
    },
    componentWillReceiveProps: function (nextProps) {
        this.setState({checked_voucher: nextProps.checked_voucher})
    },
    updateFormDataHandler: function () {
        this.props.update_payment_handler({
            use_bean: this.state.use_bean,
            used_bean_count: this.state.use_bean ? this.used_bean_count : 0,
            voucher_list: this.state.voucher_list,
            total_price: this.computeTotalPrice()
        });
    },
    computeTotalPrice: function () {

        let total_price = (this.props.product_count - this.state.checked_voucher_count) *
            this.props.product.price;

        if (this.state.use_bean && total_price > 0) {
            if (this.props.user.bean > (total_price * 100)) {
                this.used_bean_count = parseInt(total_price * 100);
                total_price = 0;
            } else {
                // notice: 可能出现浮点数精度问题, 比如 100 - 99.9 = 0.09999999999999432
                total_price = (total_price * 100 - this.props.user.bean) / 100;
                this.used_bean_count = this.props.user.bean;
            }
        }

        return total_price;
    },
    toggleVoucherModal: function () {
        this.setState({show_voucher_modal: !this.state.show_voucher_modal})
    },
    toggleBeanHandler: function () {
        this.setState({use_bean: !this.state.use_bean});
    },
    cancelVoucherModalHandler: function () {
        this.setState({show_voucher_modal: false})
    },
    confirmCheckedVoucherHandler: function (new_voucher_list) {
        let cc = $FW.Utils.length(new_voucher_list, (i) => i.checked);

        this.setState({
            voucher_list: new_voucher_list,
            checked_voucher_count: cc,
            show_voucher_modal: false
        });

        var query = $FW.Format.urlQuery();
        let cartFlag = query.cartFlag;
        let prds = query.productBizNo || [];
        let buyNum = query.buyNum || 0;
        let userTicketList = [];
        for (var i = 0; i < new_voucher_list.length; i++) {
            userTicketList.push(new_voucher_list[i].id)
        };
        $FW.Ajax({
            url: `${API_PATH}mall/api/order/v1/pre_pay_order.json?cartFlag=` + cartFlag + `&prds=` + prds + `&buyNum=` + buyNum + `&userTicketList=` + userTicketList,
            enable_loading: true
        }).then(data => {
            document.querySelectorAll('.item-detail')[1].innerHTML = '-' + data.ordersTicketPoints + '工分-' + data.ordersTicketPrice + '金额'
            document.querySelectorAll('.total-item-detail').innerHTML = '¥' + data.payableRmbAmt + '+' + data.payablePointAmt + '工分';
        })
    },
    render: function () {

        let checked_voucher = () => {
            let voucher_name;
            for (var i = 0; i < this.state.voucher_list.length; i++) {
                if (this.state.voucher_list[i].checked) {
                    voucher_name = this.state.voucher_list[i].productName;
                    break;
                }
            }

            return this.state.checked_voucher_count ?
                (<div className="coupons-r">
                    <span
                        className="coupons-name">{voucher_name}</span><span>&times; {this.state.checked_voucher_count}</span>
                </div>) :
                null;
        };

        return (
            <div className="balance-wrap">
                <div className="account-box">

                    <div className="coupons" onClick={this.toggleVoucherModal}>
                        <div className="coupons-l">兑换券{this.state.checked_voucher_count ? null :
                            <span className="avail-coupon">{this.props.ordersTicketNum}张可用</span>}</div>
                        {this.state.checked_voucher_count ? null : <div className="coupons-r">未使用</div>}
                        {checked_voucher()}
                    </div>
                    <div className="aval-points">
                        <div className="aval-points-l">可用工分</div>
                        <div className="aval-points-r">{this.props.avaliablePoints}</div>
                    </div>

                    {/*<div className="coupons">
                     <div className="coupons-l">立减券<span className="avail-coupon">11张可用</span></div>
                     <div className="coupons-r">－30</div>
                     </div>

                     <div className="coupons">
                     <div className="coupons-l">打折券<span className="avail-coupon">11张可用</span></div>
                     <div className="coupons-r">95%</div>
                     </div>*/}

                </div>
                {this.state.show_voucher_modal ? <VoucherModal
                    voucher_list={JSON.parse(JSON.stringify(this.state.voucher_list))}
                    cancel_voucher_handler={this.cancelVoucherModalHandler}
                    confirm_voucher_handler={this.confirmCheckedVoucherHandler}
                /> : null}
            </div>
        )
    }
});
