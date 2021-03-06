
const Neg = React.createClass({
    getDefaultProps: function () {
        return {
            countSeconds: 60,
            verify_code: null
        }
    },

    getInitialState: function () {
        return {
            seconds: 0,
            note: false
        }
    },

    changeHandler: function (e) {
        this.setState({ verify_code: e.target.value });

    },

    handlerCodeClick: function () {
        if (this.state.seconds != 0) return;

        if (this.props.accountAmout === 0) {
            return false;
        }

        this.setState({ seconds: this.props.countSeconds });

        this.setState({ note: true });

        this.timer = setInterval(() => {
            this.setState({ seconds: this.state.seconds - 1 });
            if (this.state.seconds < 1) {
                clearInterval(this.timer)
            }
        }, 1000)

        $FW.Ajax({
            url: API_PATH + "/mpwap/api/v1/sendCode.shtml?isVms=SMS&type=1",
            success: function (data) {
            }
        })

    },

    render: function () {
        return (
            <div>
                <div className="slip clearfix"><a href="http://www.lianhanghao.com/index.php"
                    className="peno">忘记开户行？</a></div>
                <div className="qing clearfix">
                    <div className="shyan">
                        <div className="mzysq">
                            <input className="odec" type="text"
                                value={this.state.verify_code}
                                onChange={this.changeHandler} placeholder="请输入手机验证码" />
                        </div>
                    </div>
                    <div className="miaoh" style={{ background: '#d4d4d4' }}>
                        {this.state.seconds ? this.state.seconds + "秒后重新获取" :
                            <span className="zmy" onClick={this.handlerCodeClick}>获取验证码</span>}
                    </div>
                </div>
                {this.state.note ? <div className="songfa">已向您输入的手机号码 139****0234 发送短信验证码</div> : null}
            </div>
        )
    }
})
