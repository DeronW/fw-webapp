const bankName = ['工商银行', '农业银行', '中国银行', '建设银行', '平安银行', '兴业银行', '光大银行', '浦发银行', '华夏银行', '北京银行', '中信银行', '广发银行'];

const BankInfo = React.createClass({
    getInitialState: function () {
        var query = $FW.Format.urlQuery();
        return {
            name: "",
            idNum: "",
            phone: "",
            val1: "",
            val2: "",
            val3: "",
            pass1: 0,
            pass2: 0,
            pass3: 0,
            accountNo: query.accountNo,
            bankName: query.bankName,
            bankCardName: query.bankCardName,
            bankId: query.bankId,
            active: false,
            bankImage: ""
        };
    },
    handleName: function (e) {
        var value = e.target.value;
        if (value == "") {
            this.setState({"name": "不能为空!"});
            this.setState({pass1: 0});
        }
        else {
            this.setState({"name": ""});
            this.setState({pass1: 1});
        }
        this.setState({"val1": value});
        if (value != "" && this.state.pass2 != 0 && this.state.pass3 != 0) {
            this.setState({active: true});
        }
        else {
            this.setState({active: false})
        }
    },
    handleIdNum: function (e) {
        var id = e.target.value;
        //var reg1 = /^(\d{18,18}|\d{15,15}|\d{17,17}x)$/;
        //var reg2 = /^(\d{6})(18|19|20)?(\d{2})([01]\d)([0123]\d)(\d{3})(\d|X)?$/;
        var reg = /^[1-9]{1}[0-9]{14}$|^[1-9]{1}[0-9]{16}([0-9]|[xX])$/;
        if (!reg.test(id)) {
            this.setState({"idNum": "身份证输入不合法"});
            this.setState({pass2: 0});
        }
        else {
            this.setState({"idNum": ""});
            this.setState({pass2: 1});

        }
        this.setState({"val2": id});
        if (this.state.pass1 != 0 && reg.test(id) && this.state.pass3 != 0) {
            this.setState({active: true});
        }
        else {
            this.setState({active: false})
        }
    },
    componentDidMount: function () {
        let r = this.state.bankName;
        var b

        switch (r) {
            case "中国银行":
                b = "images/zg.png"
                break;
            case "工商银行":
                b = "images/gs.png"
                break;
            case "农业银行":
                b = "images/ny.png"
                break;
            case "建设银行":
                b = "images/js.png"
                break;
            case "平安银行":
                b = "images/pa.png"
                break;
            case "兴业银行":
                b = "images/xy.png"
                break;
            case "光大银行":
                b = "images/gd.png"
                break;
            case "浦发银行":
                b = "images/pf.png"
                break;
            case "华兴银行":
                b = "images/hx.png"
                break;
            case "北京银行":
                b = "images/bj.png"
                break;
            case "中信银行":
                b = "images/zx.png"
                break;
            case "广发银行":
                b = "images/gf.png";
                break;
            default:
                b = ""
        }

        this.setState({bankImage: b});
    },
    handlePhone: function (e) {
        var phone = e.target.value;
        var reg = /^1[34578]\d{9}$/;
        if (reg.test(phone) == false) {
            this.setState({"phone": "请输入合法的手机号"});
            this.setState({pass3: 0});
        } else {
            this.setState({"phone": ""});
            this.setState({pass3: 1});
        }
        this.setState({"val3": phone});
        if (this.state.pass1 != 0 && this.state.pass2 != 0 && reg.test(phone)) {
            this.setState({active: true});
        }
        else {
            this.setState({active: false})
        }
    },
    nextStep: function () {
        if (!this.state.active) return;
        var query = $FW.Format.urlQuery();

        let FormData = {
            certificateNo: this.state.val2,
            accountNo: this.state.accountNo,
            bankCardName: this.state.bankCardName,
            bankCardType: 1,
            certificateType: 0,
            accountName: this.state.val1,
            mobileNo: this.state.val3,
            bankId: this.state.bankId,
            bankName: this.state.bankName,
            source:query.source
        };
        setTimeout(function () {
            location.href = location.protocol + '//' + location.hostname +
                "/static/mall/pay-msg-bind/index.html?mobileNo=" + FormData.mobileNo + "&certificateNo=" + FormData.certificateNo + "&accountNo=" + FormData.accountNo + "&bankId=" + FormData.bankId + "&bankName=" + FormData.bankName + "&bankCardName=" + FormData.bankCardName + "&accountName=" + FormData.accountName
                + "&source=" + FormData.source
        })
    },
    render: function () {
        return (
            <div className="bank-info">
                <div className="bank-item">
                    <img className="bank-icon" src={this.state.bankImage}/>
                    <span className="bank-name">{this.state.bankName}</span>
                    <span className="bank-number">{this.state.accountNo}</span>
                </div>
                <div className="verify-wrap">
                    <div className="verify-item">
                        <span className="verify-icon1"></span>
                        <input name="name" type="text" defaultValue="" onChange={this.handleName} placeholder="请输入姓名"/>
                    </div>
                    <label className="card-info" htmlFor="name">{this.state.name}</label>
                    <div className="verify-item">
                        <span className="verify-icon2"></span>
                        <input name="idNum" type="text" defaultValue="" onChange={this.handleIdNum}
                               placeholder="请输入身份证号"/>
                    </div>
                    <label className="card-info" htmlFor="idNum">{this.state.idNum}</label>
                    <div className="verify-item">
                        <span className="verify-icon3"></span>
                        <input name="phone" type="text" defaultValue="" onChange={this.handlePhone}
                               placeholder="请输入手机号"/>
                    </div>
                    <label className="card-info" htmlFor="phone">{this.state.phone}</label>
                </div>
                <a className={this.state.active ? "next-step active":"next-step"} onClick={this.nextStep}>下一步</a>
            </div>
        )
    }
});

$FW.DOMReady(function () {
    ReactDOM.render(<Header title={"验证银行卡信息"}/>, HEADER_NODE);

    ReactDOM.render(<BankInfo/>, CONTENT_NODE);
});

