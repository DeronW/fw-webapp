
const VoucherModal = React.createClass({
    getInitialState: function () {
        return {voucher_list: this.props.voucher_list}
    },

    toggleVoucher: function (index) {
        let list = this.state.voucher_list;
        list[index].checked = !list[index].checked;

        if ($FW.Utils.length(list, (i) => i.checked) > this.props.product_count) {
            $FW.Component.Alert('兑换券数量不能大于购买商品数量');
            list[index].checked = !list[index].checked;
        } else {
            this.setState({voucher_list: list});
        }
    },

    confirmVoucherHandler: function(){
        this.props.confirm_voucher_handler(this.state.voucher_list)
    },

    render: function () {

        let voucher = (data, index) => {
            let checkImg = data.checked ? 'red-right' : 'gray-block';
            let date = new Date(parseInt(data.endTime));
            date = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
            return (
                <div className="li" key={index}
                     onClick={() => this.toggleVoucher(index) }>
                    <div className="choose"
                         style={{backgroundImage:"url("+STATIC_PATH+"images/"+checkImg+".png)"}}></div>
                    <div className="name">{data.productName}</div>
                    <div className="date">{date}</div>
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
                                {this.state.voucher_list.map(voucher)}
                            </div>
                        </div>
                    </div>
                    <div className="btn">
                        <div className="btn-cancel" onClick={this.props.cancel_voucher_handler}>取消</div>
                        <div className="btn-confirm" onClick={this.confirmVoucherHandler} >确认</div>
                    </div>
                </div>
            </div>
        )
    }
});
