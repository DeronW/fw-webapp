var TopNav = React.createClass({
    getInitialState: function () {
        return {
            backBtn: false
        }
    },
    backBtnClick: function () {

    },
    render: function () {
        return (
            <div className="top-nav" style={{zIndex: 10000000}}>
                <div className="info">
                    {
                        this.props.backBtn ?
                            <div className="back-btn" onClick={this.props.callbackBackBtn}><img src="images/back.png"/>
                            </div> : null
                    }

                    <div className="title">{this.props.title}</div>
                    <span className="r-text"></span>
                </div>
            </div>
        );
    }
});

const SelectBankList = React.createClass({
    getInitialState: function () {
        return {
            find: true,
            entry: false,
            show_bank_list: false,
            bankList: [],
            value: '',
            bankIndex: null,
            promptBankNoShow: false
        }
    },
    componentDidMount: function () {
        //$FW.Event.touchBottom(this.refreshBankList);
    },

    refreshBankList: function (value) {
        let fn = () => {
            $FW.Ajax({
                url: API_PATH + "mpwap/api/v1/getBankList.shtml",
                data: {
                    index: "1",
                    keyword: value,
                    size: "20"
                },
                success: (data) => {
                    this.setState({bankList: data.bankList})

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
        if (value)  this._timer = setTimeout(fn, 500);
    },

    focusHandler: function () {
        this.setState({find: false})
    },

    inputHandler: function () {
        this.setState({entry: true, show_bank_list: true});
    },

    handleChange: function (e) {
        var val = e.target.value;
        this.setState({value: val});
        this.refreshBankList(val);
    },

    handleClear: function () {
        this.setState({value: '', show_bank_list: false});
    },

    bankHandler: function (index) {
        //this.props.callback
        this.props.callbackSelectBankHide(false);
        this.props.callbackBankName(this.state.bankList[index]);
    },
    getBackBtn: function () {
        this.props.callbackSelectBankHide(false);
    },
    render: function () {
        let list = ()=> {
            var li = (d, index) => <li key={index} onClick={this.bankHandler.bind(this, index)}>
                <span>{d.bankName}</span><img src="images/card-c.png"/></li>;
            return <ul className="list">{this.state.bankList.map(li)}</ul>;
        }

        return (
            <div className="select-bank" style={{zIndex: 100000}}>
                <TopNav
                    title={"开户支行"}
                    backBtn={true}
                    btnText=""
                    callbackBackBtn={this.getBackBtn}
                    />

                <div className="search">
                    {this.state.find ? <img className="suo" src="images/search.png"/> : null}
                    <input type="text"
                           className="hunt"
                           onClear={this.state.handleClear}
                           find={this.state.find}
                           onFocus={this.focusHandler}
                           entry={this.state.entry}
                           show_bank_list={this.state.show_bank_list}
                           onInput={this.inputHandler}
                           onChange={this.handleChange}
                           value={this.state.value}
                           placeholder="请输入开户支行的关键词"/>
                    {this.state.entry ?
                        <img className="false" onClick={this.handleClear} src="images/false.jpg"/> : null}
                </div>
                {this.state.show_bank_list ? list() : null}

                {
                    this.state.promptBankNoShow ?
                        <div className="promptBankNo">请尝试更换搜索关键词或拨打客服电话<span className="number-text">400-0322-988</span>寻求帮助
                        </div> : null
                }

            </div>
        )
    }
})
