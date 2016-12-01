const PaymentPanel = React.createClass({
    getInitialState: function () {
        let voucher_list = this.props.voucher_list;
        let cc = $FW.Utils.length(voucher_list, (i) => i.checked);

        this.used_bean_count = 0;
        return {
            voucher_list: voucher_list,
            show_voucher_modal: false,
            use_bean: this.props.user.use_bean,
            checked_voucher_count: cc,
            score_used: (this.props.product_count - cc) * this.props.product.score
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

        let score_used = (this.props.product_count - cc) * this.props.product.score;

        this.setState({
            voucher_list: new_voucher_list,
            checked_voucher_count: cc,
            score_used: score_used,
            show_voucher_modal: false
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

        let user_score = (
            <div className="score">
                <div className="score1">可用工分</div>
                <div className="score2">{this.props.user.score}</div>
                <div className="score3">支付: {this.state.score_used > 0 ? this.state.score_used : 0}</div>
            </div>
        );

        return (
            <div className="balance-wrap">
                <div className="account-box">

                    <div className="coupons" onClick={this.toggleVoucherModal}>
                        <div className="coupons-l">兑换券<span className="avail-coupon">11张可用</span></div>
                        <div className="coupons-r">未使用</div>
                        {checked_voucher()}
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
                    product_count={this.props.product_count}
                    cancel_voucher_handler={this.cancelVoucherModalHandler}
                    confirm_voucher_handler={this.confirmCheckedVoucherHandler}
                /> : null}
            </div>
        )
    }
});