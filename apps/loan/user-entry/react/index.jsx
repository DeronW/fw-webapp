function isMobilePhone(phone) {
    return /^1(3|4|5|7|8)\d{9}$/.test(phone)
}


function verificationNum(val) {
    var reg = new RegExp("^[0-9]*$");
    return reg.test(val)
}

const Register = React.createClass({
    getInitialState() {
        return { phone: '' }
    },
    changeHandler(e) {
        let v = e.target.value;
        //this.setState({ phone: parseInt(v)});
        console.log(v);
        if(e.target.value.length > 11) {
            this.setState({
                phone: this.state.phone
            });
        } else {
            if(verificationNum(v)) {
                this.setState({
                    phone: v
                })
            }
        }
    },

    handleGetCode() {
        let phone = this.state.phone;

        if (!isMobilePhone(phone)) {
            $FW.Component.Toast("手机号格式不对");
            return;
        }

        $FW.Post(`${API_PATH}api/userBase/v1/sendVerifyCode.json`, {
            mobile: phone,
            userOperationType: 3,
            sourceType: 3
        }).then(data => {
            localStorage.phone = phone;
            location.href = `/static/loan/user-register/index.html?codeToken=${data.codeToken}&phone=${phone}`;
        }, res => {
            if (res.code === 1029) {
                localStorage.phone = phone;
                location.href = `/static/loan/user-login/index.html?phone=${phone}`;
            } else {
                $FW.Component.Alert(res.msg)
            }
        })

    },

    render() {
        return (
            <div className="register-login-cnt">
                <div className="top">
                    <span className="title">放心花</span>
                </div>

                <div className="logo"> <img src="images/logo.png" /> </div>

                <div className="register-login-cnt">
                    <div className="from-cnt">
                        <div className="from">
                            <div className="icon"></div>
                            <div className="input">
                                <input type="number" value={this.state.phone}
                                    onChange={this.changeHandler}
                                    placeholder="请输入手机号进行注册登录" />
                            </div>
                            <div className="pwd-icon"> </div>
                        </div>
                    </div>
                </div>

                <div className="register-login-btn">
                    <div className="ui-btn" onClick={this.handleGetCode}>下一步</div>
                </div>

            </div>
        )
    }
});

$FW.DOMReady(() => {
    ReactDOM.render(<Register />, CONTENT_NODE);
})
