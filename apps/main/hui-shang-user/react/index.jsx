var Cart = React.createClass({
    getInitialState: function() {
        return {
            userInfo: {}
        };
    },
    componentDidMount: function() {
        var _this = this;

        $FW.Ajax({
            url: "http://xjb.9888.cn/test-json/json-use-info.json",
            success: function(data) {
                _this.setState({
                    userInfo: data
                });
            }
        });
    },
    render: function() {
        return (
            <div className="hui-bank-cart">
                <div className="hui-shang-logo">
                    <img src={this.state.userInfo.bankLogo} />
                </div>

                <div className="bank-id">
                    {
                        this.state.userInfo.bankAccount
                    }
                </div>

                <div className="info">
                    <span>开户名：</span>{this.state.userInfo.userName}
                </div>

                <div className="info">
                    <span>开户行：</span>{this.state.userInfo.bankDeposit}
                </div>
            </div>
        );
    }
});

var Earnings = React.createClass({
    getInitialState: function() {
        return {
            earnings: {}
        };
    },
    componentDidMount: function() {
        var _this = this;

        $FW.Ajax({
            url: "http://xjb.9888.cn/test-json/json-use-earnings.json",
            success: function(data) {
                _this.setState({
                    earnings: data
                });
            }
        });
    },
    render: function() {
        return (
            <div className="hui-shang-earnings">
                <div className="earnings-title">
                    <div className="text">昨日收益(元)</div>
                    <div className="number-text">{this.state.earnings.dayEarnings}</div>
                </div>

                <div className="info">
                    <div className="paragraph">
                        <div className="number-text c-fb6455">{this.state.earnings.availableBalance}</div>
                        <div className="text">可用余额(元)</div>
                    </div>
                    <div className="paragraph">
                        <div className="number-text">{this.state.earnings.accumulateEarnings}%</div>
                        <div className="text">七日年化收益率</div>
                    </div>
                    <div className="paragraph last">
                        <div className="number-text">{this.state.earnings.aWeekAnnualizedReturn}</div>
                        <div className="text">累计收益(元)</div>
                    </div>
                </div>
            </div>
        );
    }
});

var FundsFlow = React.createClass({
    getInitialState: function() {
        return {
            data: []
        };
    },
    componentDidMount: function() {
        var _this = this;

       $FW.Ajax({
            url: "http://xjb.9888.cn/test-json/json-use-journal-account.json",
            success: function(data) {
                _this.setState({
                    data: data
                });
            }
        });
    },
    handlerAll: function() {
        //console.log(this.props.callbackIndex);
        this.props.callbackIndex(1);
    },
    render: function() {
        var list = function(cnt, index) {
            return <div className="paragraph">
                        <div className="l">
                            <span className="text info-title">{cnt.title}</span>
                            <span className="text data-text">{cnt.time}</span>
                        </div>
                        <div className="r">
                            <span className="money-text c-4db94f">￥{cnt.money}</span>
                        </div>
                    </div>;
        };

        return (
            <div className="funds-flow">
                <div className="title">
                    3个月内银行资金流水

                    <span className="see-text" onClick={this.handlerAll}>查看全部</span>
                </div>

                <div className="info">
                    {
                        this.state.data.map(list, this)
                    }
                </div>
            </div>
        );
    }
});

var AllJournal = React.createClass({
    getInitialState: function() {
        return {

        };
    },
    componentDidMount: function() {

    },
    render: function() {
        return (
            <div className="pop-account">
                <div className="funds-flow">
                    <div className="info">

                        <div className="paragraph">
                            <div className="l">
                                <span className="text info-title">sdasfas</span>
                                <span className="text data-text">safasf</span>
                            </div>
                            <div className="r">
                                <span className="money-text c-4db94f">￥afasfas</span>
                            </div>
                        </div>
                        <div className="paragraph">
                            <div className="l">
                                <span className="text info-title">sdasfas</span>
                                <span className="text data-text">safasf</span>
                            </div>
                            <div className="r">
                                <span className="money-text c-4db94f">￥afasfas</span>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
});

var Body = React.createClass({
    render: function() {
        return (
            <div className="">
                <Cart />

                <Earnings />

                <FundsFlow callbackIndex={this.props.callbackPage}/>
            </div>
        );
    }
});

var AllPage = React.createClass({
    getInitialState: function() {
        return {
            index: 0
        };
    },
    page: function(index) {
        console.log(index);
        this.setState({
            index: index
        });
    },
    render: function() {
        var ui = [
            <Body callbackPage={this.page}/>,
            <AllJournal callbackPage={this.page}/>
        ];

        return (
            <div>
                {
                    ui[this.state.index]
                }
            </div>
        );
    }
});

ReactDOM.render(
    <AllPage />,
    document.getElementById("cnt")
);