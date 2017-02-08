var numberFormat = {
    val: "",
    format: function (val) {
        if (!isNaN(val.replace(/[0-9]/g, ""))) {
            this.val = val.replace(/\s/g, '').replace(/(\d{4})(?=\d)/g, "$1 ");//四位数字一组，以空格分割
        }
        return this.val;
    }
};

function removeAllSpace(str) {
    return str.replace(/\s+/g, "");
}

const AddBankCard = React.createClass({
    getInitialState: function () {
        return {
            info: "",
            val: "",
            active: false
        };
    },
    changeVal: function (e) {
        var val = e.target.value;
        var length = removeAllSpace(val).length;
        var reg = /^\d{16}|\d{19}$/;
        if (isNaN(removeAllSpace(val))) {
            this.setState({"info": "只能输入数字!"});
            this.setState({active: false});
        }
        else if (length == 16 || length == 19) {
            this.setState({"info": ""});
            this.setState({active: true});
        }
        else {
            this.setState({"info": "请输入正确的银行卡号!"});
            this.setState({active: false});
        }
        this.setState({val: numberFormat.format(val)});
    },
    nextStep: function () {
        if (!this.state.active) return;
        var query = $FW.Format.urlQuery();
        var bizNo = query.bizNo;
        $FW.Ajax({
            url: `${API_PATH}/mall/api/payment/v1/bank_card_info.json?accountNo=` + removeAllSpace(this.state.val),
            enable_loading: true
        }).then((data)=> {
            if (data.bankInfo) {
                var data = data.bankInfo;
                location.href = location.protocol + '//' + location.hostname +
                    "/static/mall/pay-verify-bank/index.html?accountNo=" + data.accountNo + "&bankCardName=" + data.bankCardName + "&bankName=" + data.bankName + "&bankId=" + data.bankId + "&bizNo=" + bizNo
            }
        });
    },
    render: function () {
        return (
            <div className="add-bank-card">
                <div className="add-bank-card-tip">请绑定账户本人的银行卡</div>
                <div className="input-box">
                    <span className="card-icon"></span>
                    <input type="text" placeholder="请输入银行卡号" name="title" defaultValue="" onChange={this.changeVal} value={this.state.val}/>
                </div>
                <label htmlFor="title" className="card-info">{this.state.info}</label>
                <a className={this.state.active ? "next-step active":"next-step"} onClick={this.nextStep}>下一步</a>
            </div>
        )
    }
});

$FW.DOMReady(function () {
    ReactDOM.render(<Header title={"添加银行卡"}/>, HEADER_NODE);
    ReactDOM.render(<AddBankCard/>, CONTENT_NODE);
});

