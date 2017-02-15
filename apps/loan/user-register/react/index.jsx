const Register = React.createClass({
    getInitialState() {
        return {}
    },
    render(){
        return (
            <div className="register-box">
                <div className="logo"><img src="images/logo.png"/></div>
                <div className="register-box-input">
                    <div className="phone-box input-box">
                        <input type="number" placeholder="请输入手机号进行注册登录"/>
                    </div>
                    <div className="code-box input-box">
                        <input type="text" placeholder="输入短信验证码"/>
                        <div className="get-code">获取验证码</div>
                    </div>
                    <div className="password-box input-box">
                        <input type="password" placeholder="密码要求8-16位字母与数字组合"/>
                        <div className="eye"></div>
                    </div>
                    <div className="next-btn">下一步</div>
                </div>
            </div>
        )
    }
});
$FW.DOMReady(() => {
    ReactDOM.render(<Register />, CONTENT_NODE)
})
