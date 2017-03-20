

var BankAccount = React.createClass({
    getInitialState: function () {
        return {
            typing: false,
            entry: false,
            fruit: false,
            bankList: [],
            value: '',
            bankIndex: null,
            jump: false,
            promptBankNoShow: false
        }
    },

    refreshBankList: function (value) {
        let fn = () => {
            // 首山的接口不能添加 API_PATH 参数, 它的域名是独立的: assets-api.9888.cn
            $FW.Ajax({
                url: "/api/sspay/withdraw/v1/getBankList.shtml",
                data: {
                    index: "0",
                    keyword: value,
                    size: "10000"
                },
                success: (data) => {
                    this.setState({ bankList: data.bankList })

                    if (data.bankList.length === 0) {
                        this.setState({
                            promptBankNoShow: true
                        });
                    } else {
                        this.setState({
                            promptBankNoShow: false
                        });
                    }
                }
            })
        }

        clearTimeout(this._timer);
        if (value) this._timer = setTimeout(fn, 500);
    },

    inputHandler: function () {
        this.setState({ entry: true });
    },

    handleChange: function (e) {
        var val = e.target.value;
        this.setState({ value: val });
        this.refreshBankList(val);
    },

    handleClear: function () {
        this.setState({
            value: '',
            bankList: [],
            fruit: false
        });
    },

    typingHandler: function () {
        this.setState({ typing: true })
    },

    bankHandler: function (index) {
        this.props.callbackSelectBankInfo(false, this.state.bankList[index]);
    },

    callbackOpenBankBtn: function () {
        this.props.callbackOpenBank(false);
    },


    render: function () {

        let list = () => {
            var li = (d, index) => <li key={index} onClick={this.bankHandler.bind(this, index)}><span
                className="">{d.bankName}</span> <img src="images/card-c.png" /></li>;

            return <ul className="list">{this.state.bankList.map(li)}</ul>;
        };

        let icon = <img className="suo" src="images/search.png" />;
        if (this.state.typing) icon = null;

        return (
            <div className="pop-open-bank">
                <TopNav title={"开户支行"} backBtn={true} btnFun={this.callbackOpenBankBtn} />

                <div className="select-bank">
                    <div className="search">
                        {icon}

                        <input type="text"
                            className="hunt"
                            onFocus={this.typingHandler}
                            onInput={this.inputHandler}
                            onChange={this.handleChange}
                            value={this.state.value}
                            placeholder="请输入开户支行的关键词"
                            ref="bank"
                        />

                        <img className="false" onClick={this.handleClear} src="images/false.jpg" />
                    </div>


                    {(this.state.bankList.length == 0 ? null : this.state.bankList.length) && list()}

                    {
                        this.state.promptBankNoShow ?
                            <div className="promptBankNo">
                                请尝试更换搜索关键词或拨打客服电话
                            <span className="number-text">400-0322-988</span>寻求帮助</div> : null
                    }

                </div>
            </div>
        )
    }
})
