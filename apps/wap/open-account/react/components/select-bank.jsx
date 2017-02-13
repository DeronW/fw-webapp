
var SelectBank = React.createClass({
    getInitialState: function () {
        return {
            bankListData: null,
            impede: false,
            notSupportQuickPayList: null
        };
    },
    componentDidMount: function () {
        var _this = this;

        $FW.Ajax({
            url: API_PATH + "mpwap/api/v1/getBankListInfo.shtml",
            enable_loading: true,
            success: function (data) {
                _this.setState({
                    bankListData: data
                });
            }
        });
    },
    componentWillReceiveProps: function (nextPorps) {
        if (nextPorps.callbackPopBtnBank) {
            this.setState({
                impede: nextPorps.callbackPopBtnBank
            }, this.notSupportQuickPayClick);
        }
    },
    backBtnClick: function () {
        this.props.callbackBtnVal();
    },
    supportQuickPayClick: function (index) {
        this.props.callbackAlreadyBank(this.state.bankListData.quickBankList[index]);
        this.props.callbackBtn(false);
    },
    notSupportQuickPayClick: function (index) {
        this.props.callbackAlreadyBank(this.state.notSupportQuickPayList);
        this.props.callbackBtn(false);
    },
    notSupportQuickPayList: function (index) {
        this.props.callbackLeapfrogBtn(2);

        this.setState({
            notSupportQuickPayList: this.state.bankListData.bankList[index]
        })
    },
    render: function () {
        var _this = this;

        var style = {
            zIndex: "100000"
        };

        var quickPayli = function (comment, index) {

            return <li key={index} onClick={_this.supportQuickPayClick.bind(this, index)} ref={"item" + index}>
                <img src={comment.logoUrl} className="logo-img" />

                <div className="info-block">
                    <span className="text">{comment.bankName}</span>
                </div>
                <img src="images/fash-bank.png" className="quick-pay-icon" />
            </li>
        };

        var notQuickPayli = function (comment, index) {
            return <li key={index} onClick={_this.notSupportQuickPayList.bind(this, index)} ref={"item" + index}>
                <img src={comment.logoUrl} className="logo-img" />

                <div className="info-block">
                    <span className="text">{comment.bankName}</span>
                </div>
            </li>
        };

        return (
            <div className="select-bank-area" style={style}>
                <TopNav title={"选择开户行"} backBtn={true} btnFun={this.backBtnClick} />

                <div className="select-bank-content-block">
                    <div className="select-list">
                        <div className="title-text">
                            支持快捷支付
                        </div>
                        <ul className="list">
                            {
                                this.state.bankListData !== null ? this.state.bankListData.quickBankList.map(quickPayli, this) : null
                            }

                        </ul>
                    </div>

                    <div className="select-list">
                        <div className="title-text">
                            不支持快捷支付
                        </div>
                        <ul className="list">
                            {
                                this.state.bankListData !== null ? this.state.bankListData.bankList.map(notQuickPayli, this) : null
                            }
                        </ul>
                    </div>
                </div>

                <div className="prompt-block">
                    <div className="text">
                        <span className="circular"></span>

                        <div className="prompt-text">添加支持快捷支付的银行卡，可在金融工场对您的资金实现充值、提现操作；</div>
                    </div>
                    <div className="text">
                        <span className="circular"></span>

                        <div className="prompt-text">不支持的快捷支付的银行卡仅能提现，不能充值；</div>
                    </div>
                </div>
            </div>
        );
    }
});

