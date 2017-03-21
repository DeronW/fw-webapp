function removeAllSpace(str) {
    return str.replace(/\s+/g, "");
}

const Login = React.createClass({
    getInitialState: function () {
        this.tabs = ['veri', 'pwd'];
        return {
            tab: 'no_default_tab',
            val1: "",
            val2: "",
            val3: "",
            pass1: 0,
            pass2: 0,
            pass3: 0,
            reSend: true,
            value: "获取验证码",
            active: false,
            code: ""
        }
    },
    componentDidMount: function () {
        var query = $FW.Format.urlQuery();
        var tab = query.tab;
        if (tab == 1) {
            this.switchTabHandler('veri');
        }
        else {
            this.switchTabHandler('pwd');
        }
    },
    //倒计时完成终止
    componentDidUpdate: function () {
        if (this.state.value == 55) {
            this.stopTick();
            this.setState({value: "获取验证码", reSend: true});

        }
    },
    switchTabHandler: function (tab) {
        if (tab == this.state.tab) return;

        this.setState({
            tab: tab,
            phone: ''
        });
    },

    //倒计时递减
    decline: function () {
        this.setState({value: this.state.value - 1});
    },

    //倒计时
    tick: function () {
        this.interval = setInterval(this.decline, 1000);
    },

    stopTick: function () {
        clearInterval(this.interval);
    },

    getSMSCodeHandler: function () {
        if (!this.state.reSend) return;
        let FormData = {
            phone: this.state.val1
        }
        $FW.Ajax({
            url: `http://mld.9888.cn/mall/login/setCode.json`,
            enable_loading: 'mini',
            data: FormData,
            success: function (data) {
                $FW.Component.Alert("原来你在测试那就告诉你验证码：" + data.code)
                this.setState({value: 60, reSend: false});
                this.tick()
                this.setState({reSend: false});
            }.bind(this)
        })
    },
    handlePhone: function (e) {
        var phone = e.target.value;
        var reg = /^1[34578]\d{9}$/;
        if (reg.test(phone) == false) {
            this.setState({"phone": "请输入合法的手机号"});
            this.setState({pass1: 0});
        } else {
            this.setState({"phone": ""});
            this.setState({pass1: 1});
        }
        this.setState({"val1": phone});
        if (reg.test(phone) && this.state.pass2 != 0) {
            this.setState({active: true});
        }
        else {
            this.setState({active: false})
        }
    },
    handleCode: function (e) {
        var value = e.target.value;
        if (value == "") {
            this.setState({"code": "不能为空!"});
            this.setState({pass2: 0});
        }
        else {
            this.setState({"name": ""});
            this.setState({pass2: 1});
        }
        this.setState({"val2": value});
        if (value != "" && this.state.pass1 != 0) {
            this.setState({active: true});
        }
        else {
            this.setState({active: false})
        }
    },
    handlePaw: function (e) {
        var value = e.target.value;
        if (value == "") {
            this.setState({"paw": "不能为空!"});
            this.setState({pass3: 0});
        }
        else {
            this.setState({"paw": ""});
            this.setState({pass3: 1});
        }
        this.setState({"val3": value});
        if (value != "" && this.state.pass1 != 0) {
            this.setState({active: true});
        }
        else {
            this.setState({active: false})
        }
    },
    loginVeri: function () {
        if (!this.state.active) return;
        let FormData = {
            phone: this.state.val1,
            code: this.state.val2
        }
        $FW.Ajax({
            url: `http://mld.9888.cn/mall/login/login.json`,
            enable_loading: 'mini',
            data: FormData,
            success: function (data) {
                $FW.Component.Alert("结果：" + data.code)

            }.bind(this)
        })

    },
    loginPaw: function () {
        if (!this.state.active) return;
        let FormData = {
            phone: this.state.val1,
            pawCode: this.state.val3
        }
        alert(JSON.stringify(FormData));
        //$FW.Ajax({
        //    url: `./1.json`,
        //    enable_loading: 'mini',
        //    data: FormData,
        //    success: function (data) {
        //        $FW.Component.Alert("原来你在测试那就告诉你验证码：" + data.code)
        //        this.setState({value: 60, reSend: false});
        //        this.tick()
        //        this.setState({reSend: false});
        //    }.bind(this)
        //})

    },
    render: function () {
        let tab = (i, index)=> {
            return <div key={index} className={i == this.state.tab ? 'active' : null}
                        onClick={()=> this.switchTabHandler(i)}>
                {i == 'veri' ? '验证码登录' : '普通登录'}
            </div>
        };

        let Pwd = <div>
            <div className="field">
                <span className="ico-password"></span>
                <input type="password" placeholder="请输入验证码" name="code" defaultValue="" onChange={this.handleCode}/>
                <div className="empty" onclick={this.empty}></div>
                <input type="button" className="yzm b-radius" onClick={this.getSMSCodeHandler} id="btnMessageCode"
                       value={!this.state.reSend ? "重新发送("+this.state.value+")":this.state.value}/>
            </div>
            <label className="phone" htmlFor="code">{this.state.code}</label></div>;

        let Pwd1 = <div>
            <div className="field">
                <span className="ico-password"></span>
                <input type="password" placeholder="登录密码" name="pwd" defaultValue="" onChange={this.handlePaw}
                       className="password f-14"/>
                <div className="empty" onclick={this.empty}></div>
            </div>
            <label className="phone" htmlFor="pwd">{this.state.paw}</label></div>;

        return (
            <div>
                <div className="recharge-panel-tab"> {this.tabs.map(tab)} </div>
                <div className="container wrap">
                    <div className="field">
                        <span className="ico-user"></span>
                        <input type="text" placeholder="手机号/邮箱/用户名" defaultValue="" onChange={this.handlePhone}/>
                        <div className="empty" onclick={this.empty}></div>
                    </div>
                    <label className="phone" htmlFor="phone">{this.state.phone}</label>
                    {this.state.tab == 'veri' ? Pwd : null}
                    {this.state.tab == 'pwd' ? Pwd1 : null}

                    <input type="button" onClick={this.state.tab == 'veri' ?this.loginVeri:this.loginPaw}
                           className={this.state.active ? "btn-red active":"btn-red"} value="登录"/>
                    <div className="login-tip clearfix">没有账户？
                        <a href="https://m.9888.cn:443/mpwap/orderuser/toRegister.shtml?source=1" id="res">立即注册</a>
                    </div>
                </div>
            </div>
        )
    }
});

$FW.DOMReady(function () {
    ReactDOM.render(<Header title={'登录'}/>, HEADER_NODE);
    ReactDOM.render(<Login />, CONTENT_NODE);
});
