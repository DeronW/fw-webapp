function isMobilePhone(phone) {
    return /^1(3|4|5|7|8)\d{9}$/.test(phone)
}


function verificationNum(val) {
    var reg = new RegExp("^[0-9]*$");
    return reg.test(val)
}

const Register = React.createClass({
    getInitialState() {
        return {
            phone: '',
            deleteShow: false
        }
    },
    changeHandler(e) {

        let v = e.target.value;

        if (e.target.value.length > 11) {
            this.setState({
                phone: this.state.phone,
                deleteShow: true
            });
        } else if (verificationNum(v)) {
            this.setState({
                phone: v,
                deleteShow: true
            })
        }
    },

    clearHandler() {
        this.setState({ phone: '' })
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
            sourceType: SOURCE_TYPE
        }).then(data => {
            $FW.Store.set('phone', phone);
            if(data.codeType == 1){
                location.href = `/static/loan/user-set-password/index.html?codeToken=${data.codeToken}&phone=${phone}`;
            }else if(data.codeType == 2){
                location.href = `/static/loan/user-reset-password/index.html?codeToken=${data.codeToken}&phone=${phone}`;
            }
        }, res => {
            if (res.code === 201003) {
                $FW.Store.set('phone', phone);
                location.href = `/static/loan/user-login/index.html?phone=${phone}`;
            } else {
                $FW.Component.Toast(res.message)
            }
        })
    },

    keyUpHandler(e) {
        if (e.keyCode === 13) this.handleGetCode()
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
                                <input type="text" value={this.state.phone}
                                    onChange={this.changeHandler} onKeyUp={this.keyUpHandler}
                                    placeholder="请输入手机号进行注册登录" />
                                {this.state.deleteShow &&
                                    <span className="clear-num" onClick={this.clearHandler}></span>}
                            </div>
                            <div className="pwd-icon"> </div>
                        </div>
                        <div className="form-border"></div>
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
