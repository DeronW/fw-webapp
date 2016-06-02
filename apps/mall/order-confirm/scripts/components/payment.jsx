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

        let user_score = null;
        if (this.props.user.score > 0) {
            user_score = (
                <div className="score">
                    <div className="score1">工分账户</div>
                    <div className="score2">{this.props.user.score}</div>
                    <div className="score3">{this.state.score_used > 0 ? this.state.score_used : 0}</div>
                </div>
            )
        }

        return (
            <div className="balance-wrap">
                <div className="account-box">

                    <div className="coupons" onClick={this.toggleVoucherModal}
                         style={{background:"url("+STATIC_PATH+"images/ico-gray-right.jpg) no-repeat 660px 50%"}}>
                        <div className="coupons-l">兑换券支付</div>
                        {checked_voucher()}
                    </div>

                    <div className="bean">
                        <div className="bean1">工豆账户</div>
                        <div className="bean2">&yen;{$FW.Format.currency(this.props.user.bean / 100.0)}</div>
                        <div className="bean3">
                            <div className={this.state.use_bean ? "btn-circle-box on" : "btn-circle-box"}>
                                <div className="btn-circle" onClick={this.toggleBeanHandler}>
                                </div>
                            </div>
                        </div>
                    </div>
                    {user_score}
                </div>
                <div className="balance-box">
                    <div className="balance1">可用余额</div>
                    <div className={"balance2 red"}>&yen;{$FW.Format.currency(this.props.user.charge)}</div>
                    <div className="balance3">&yen;{$FW.Format.currency(this.computeTotalPrice())}</div>
                    <div className="balance4">余额支付：</div>
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
