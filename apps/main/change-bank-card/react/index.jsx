const API_PATH = document.getElementById("api-path").value;

const ReportBox = React.createClass({
    getInitialState: function () {
        var ui = this.props.data.userInfo;
        return {
            note: false,
            find: true,
            entry: false,
            fruit: false,
            jump: false,
            bankLogo: ui.bankLogo,
            bankName: ui.bankName,
            bankId: null,
            bankCardNum: null,
            validateCode: null
        }
    },
    noneHandle: function () {
        this.setState({note: true})
    },

    focusHandler: function () {
        this.setState({find: false})
    },

    inputHandler: function () {
        this.setState({entry: true, fruit: true});
    },

    handleJump: function () {
        this.setState({jump: true})
    },

    submitHandle: function () {
        var _this = this;
        if (!_this.props.bankCard) {
            $FW.Component.Alert("请输入银行卡号")
        } else if (!_this.props.verify_code) {
            $FW.Component.Alert("请输入验证码")
        }
        $FW.Ajax({
            url: API_PATH + "mpwap/api/v1/changeBankCard.shtml",
            data: {
                bankCard: this.state.bankCardNum,
                bankId: this.state.bankId,
                validateCode: this.state.validateCode
            },
            success: function (data) {
console.log(data)
            }
        });
    },
    getBankIndex: function (data) {
        this.setState({
            bankName: data.bankName,
            bankId: data.bankNo,
            jump: false
        });
    },
    setBankCard: function (v) {
        this.setState({bankCardNum: v})
    },
    setParentStateHandler: function(obj){
        console.log(obj)
        this.setState(obj)
    },
    render: function () {

        var user = this.props.data.userInfo;

        return (
            <div>
                {this.state.jump ? <ReportBox.SelectBankList
                    find={this.state.find}
                    entry={this.state.entry}
                    fruit={this.state.fruit}
                    focusHandler={this.focusHandler}
                    inputHandler={this.inputHandler}
                    callbackBankIndex={this.getBankIndex}
                    handlerClear={this.handlerClear}/> : null}

                <Input note={this.noneHandle}
                       username={user.realName}
                       cardNumber={user.idCardNo}
                       bankBranch={this.state.bankName}
                       bankLogo={this.state.bankLogo}
                       handleJump={this.handleJump}
                       setParentState={this.setParentStateHandler}
                />
                {this.state.note ? <Note cardNumber={user.bankCard} handler={this.noneHandle}/> : null}
                <div className="refer" onClick={this.submitHandle}>提交</div>
            </div>
        )
    }
});


const Input = React.createClass({
    getDefaultProps: function () {
        return {
            countSeconds: 60,
            bankCard: null,
            verify_code: null
        }
    },
    bankChangeHandler: function (e) {
        this.setState({bankCard: e.target.value});
        this.props.setParentState({bankCardNum: e.target.value});
    },

    changeHandler: function (e) {
        this.setState({verify_code: e.target.value});
        console.log(e.target.value)
        this.props.setParentState({
            validateCode: e.target.value
        });
    },
    getInitialState: function () {
        return {
            seconds: 0
        }
    },

    handlerTestClick: function () {
        if (this.state.seconds != 0) return;

        this.setState({seconds: this.props.countSeconds});

        this.props.note();//触发

        this.timer = setInterval(()=> {
            this.setState({seconds: this.state.seconds - 1});
            if (this.state.seconds < 1) {
                clearInterval(this.timer)
            }
        }, 1000)

        $FW.Ajax({
            url: API_PATH + 'mpwap/api/v1/sendCode.shtml',
            data: {
                isVms: 'SMS',
                type: 3
            },
            success: function (data) {
            }
        })

    },

    render: function () {
        return (
            <div className="wrap">
                <div className="name clearfix">
                    <img src="images/bf-a.png"/>
                    <div className="knight">{this.props.username}</div>
                </div>

                <div className="wire"></div>

                <div className="name clearfix">
                    <img src="images/bf-b.png"/>
                    <div className="knight">{this.props.cardNumber}</div>
                </div>

                <div className="wire"></div>

                <div className="name clearfix">
                    <img src="images/bf-c.png"/>
                    <div className="knight sr">
                        <input type="text" value={this.state.bankCard}
                               onChange={this.bankChangeHandler} className="textbox"
                               placeholder="请输入银行卡号"/></div>
                </div>

                <div className="wire"></div>

                <div className="name clearfix" onClick={this.props.handleJump}>
                    <div className="khy">开户银行</div>
                    <img className="bank-arrow" src="images/card-c.png"/>
                    <div className="yzt">
                        <span className="shang">{this.props.bankBranch}</span>
                        <img className="bf-d" src={this.props.bankLogo}/>
                    </div>
                </div>

                <div className="wire"></div>

                <div className="name clearfix">
                    <div className="khy">
                        <input type="text" className="yzm" placeholder="请输入验证码"
                               value={this.state.verify_code} onChange={this.changeHandler}/></div>
                    <div className="yzt">
                        <span className="gry">|</span>
                        {this.state.seconds ? this.state.seconds + "s后重新获取" :
                            <span className="zmy" onClick={this.handlerTestClick}>获取验证码</span>}
                    </div>
                </div>
            </div>
        )
    }
})

const Note = React.createClass({
    render: function () {
        return (
            <div className="phone">
                已向手机
                <span className="">{this.props.cardNumber}</span>发送短信验证码，若收不到，请<a className="dot">点击这里</a>获取语音验证码。
            </div>
        )
    }
})

ReportBox.SelectBankList = React.createClass({
    getInitialState: function () {
        return {
            find: true,
            entry: false,
            fruit: false,
            bankList: [],
            value: '',
            bankIndex: null,
        }
    },

    refreshBankList: function (value) {
        let fn = () => {
            $FW.Ajax({
                url: API_PATH + "mpwap/api/v1/getBankList.shtml",
                data: {
                    index: "10",
                    keyword: value,
                    size: "10"
                },
                success: (data) => {
                    this.setState({bankList: data.bankList})
                }
            })
        }
        clearTimeout(this._timer);
        if (value)  this._timer = setTimeout(fn, 500);
    },

    focusHandler: function () {
        this.setState({find: false})
    },

    inputHandler: function () {
        this.setState({entry: true, fruit: true});
    },

    handleChange: function (e) {
        var val = e.target.value;
        this.setState({value: val});
        this.refreshBankList(val);
    },

    handleClear: function () {
        this.setState({value: '', fruit: false});
    },

    bankHandler: function (index) {
        this.props.callbackBankIndex(this.state.bankList[index]);
    },

    render: function () {
        let list = ()=> {
            var li = (d, index) => <li key={index} onClick={this.bankHandler.bind(this, index)}>
                <span>{d.bankName}</span><img src="images/card-c.png"/></li>;
            return <ul className="list">{this.state.bankList.map(li)}</ul>;
        }

        return (
            <div className="select-bank">
                <div className="search">
                    {this.state.find ? <img className="suo" src="images/search.png"/> : null}
                    <input type="text"
                           className="hunt"
                           onClear={this.state.handleClear}
                           find={this.state.find}
                           onFocus={this.focusHandler}
                           entry={this.state.entry}
                           fruit={this.state.fruit}
                           onInput={this.inputHandler}
                           onChange={this.handleChange}
                           value={this.state.value}
                           placeholder="请输入开户支行的关键词"/>
                    {this.state.entry ?
                        <img className="false" onClick={this.handleClear} src="images/false.jpg"/> : null}
                </div>
                {this.state.fruit ? list() : null}
            </div>
        )
    }
})

$FW.DOMReady(function () {
    ReactDOM.render(<Header title={"绑定银行卡"}/>, document.getElementById('header'));

    $FW.Ajax({
        url: API_PATH + "mpwap/api/v1/getOpenAccountInfo.shtml",
        success: function (data) {
            ReactDOM.render(<ReportBox data={data}/>, document.getElementById("cnt"))
        }
    });
});