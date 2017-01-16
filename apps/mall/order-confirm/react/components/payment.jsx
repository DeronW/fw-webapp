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
            voucher_list: this.state.voucher_list
        });
    },
    toggleVoucherModal: function () {
        this.setState({show_voucher_modal: !this.state.show_voucher_modal})
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
        let prd = query.prd||[];
        let buyNum = query.buyNum || 0;
        let userTicketList = [];
        for (var i = 0; i < cc; i++) {
            userTicketList.push($FW.Utils.jsonFilter(new_voucher_list, (i) => i.checked)[i].id)
        };
        $FW.Ajax({
            url: `${API_PATH}mall/api/order/v1/pre_pay_order.json?cartFlag=` + cartFlag + `&prd=` + prd + `&buyNum=` + buyNum + `&userTickets=` + userTicketList,
            enable_loading: true
        }).then(data => {
            let jia=(data.payableRmbAmt==0||data.payablePointAmt==0) ?"0":"+";
            let RmbAmt= data.payableRmbAmt==0 ?"": '¥' + data.payableRmbAmt + '+'; let PointAmt= data.payablePointAmt==0  ?"":data.payablePointAmt + '工分';

            let jia1=((data.totalPrice-data.payableRmbAmt)==0||(data.totalPoints-data.payablePointAmt)==0) ?"":"+";
            let RmbAmt1= (data.totalPrice-data.payableRmbAmt)==0 ?"-": '¥' + (data.totalPrice-data.payableRmbAmt) + '+'; let PointAmt1= (data.totalPoints-data.payablePointAmt)==0  ?"":(data.totalPoints-data.payablePointAmt) + '工分';

            document.querySelectorAll('.item-detail')[1].innerHTML  = RmbAmt1+jia1+PointAmt1;
            document.querySelector('.total-item-detail').innerHTML = RmbAmt+jia+PointAmt
            this.props.changeTicketPoints(PointAmt);
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
