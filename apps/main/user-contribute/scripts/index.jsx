'use strict';

const API_PATH = document.getElementById("api-path").value;

function inApp() {
    return navigator.userAgent.indexOf('FinancialWorkshop') >= 0;
}

const Header = React.createClass({
    backHandler: function () {
        history.back()
    },
    render: function () {
        return (
            <div className="header">
                <div className="header-cont">
                    <div className="up-btn" onClick={this.backHandler}>
                    </div>

                    <div className="header-title">
                        {this.props.title}
                    </div>
                </div>
            </div>
        );
    }
});

const Contribute = React.createClass({
    render: function () {
        var myInfoData = this.props.myInfoData;

        return (
            <div>
                <div className="top-info">
                    <div className="top-info-l">
                        <div className="sum-block">
                            <span className="text">总贡献值</span>
                        </div>

                        <div className="money-block">
                            <span className="text">{myInfoData.contributeValue}</span>
                        </div>

                        <div className="text-block">
                            <p className="text">
                                投资贡献值{myInfoData.investmentContribution}+邀友贡献值{myInfoData.inviteContributeValue}</p>
                        </div>
                    </div>

                    <div className="top-info-r">
                        <div className="vip-block">
                            <span className="img">
                                <img src={"images/vip" + (myInfoData.userLevel -1) +  "_icon.png"}/>
                            </span>
                            <span className="user-vip-text">
                                会员等级
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

const InvestTab = React.createClass({
    getInitialState: function () {
        return {
            page: 1,
            rows: 10,
            hasMore: false,
            listData: []
        };
    },
    ajaxHandler: function () {
        var _this = this;

        $FW.Ajax({
            url: API_PATH + "/mpwap/api/v1/user/contribute/invest.shtml?page=" + _this.state.page + "&rows=" + _this.state.rows + "&type=0",
            //url: "http://10.105.7.124/xxxxx.json?page=1&rows=10&type=0",
            enable_loading: true,
            success: function (data) {
                _this.setState({
                    listData: _this.state.listData.concat(data.data),
                    page: ++_this.state.page,
                    hasMore: data.data.length >= 10
                });

            }
        });
    },
    componentDidMount: function (list) {
        this.ajaxHandler();
    },
    render: function () {
        var _this = this;

        var data = _this.state.listData;


        var objDiv = (value, index) => (
            <div key={index} className="cont-block">
                <div className="top-block">
                    <span className="fl">{value.title}</span>
                    <span className="rl">贡献值: <em className="mark-c">{value.contributeValue}</em></span>
                </div>

                <div className="cont-info">
                    <div className="fl">
                        <span className="text">本金: ¥{value.money}</span>
                        <span className="text">投资日期{value.apply_date}</span>
                    </div>
                    <div className="rl">
                        <span className="text">年化投资额度: ¥{value.earn_money}</span>
                        <span className="text">计划回款日{value.returned_date}</span>
                    </div>
                </div>
            </div>
        );

        var btnMore = <div className="loading-more" onClick={_this.ajaxHandler}>
            加载更多
        </div>;

        var btnComplete = <div className="complete-btn">已全部加载完毕</div>;

        var wulistImg = <div className="wulist-img"><img src="images/ico-wulist.png"/><span
            className="text">暂无投资贡献值</span></div>;

        return (
            <div className="invest-block">
                { data.map(objDiv) }
                {this.state.hasMore ? btnMore : null}
                {!this.state.hasMore && data.length > 0 ? btnComplete : null}

                {
                    this.state.page == 2 && data.length == 0 ? wulistImg : null
                }
            </div>
        );
    }
});

const InviteTab = React.createClass({
    getInitialState: function () {
        return {
            page: 1,
            rows: 10,
            hasMore: true,
            listData: []
        };
    },
    ajaxHandler: function () {
        var _this = this;

        $FW.Ajax({
            url: API_PATH + "/mpwap/api/v1/user/contribute/invite.shtml?page=" + _this.state.page + "&rows=" + _this.state.rows + "&type=1",
            enable_loading: true,
            success: function (data) {
                _this.setState({
                    listData: _this.state.listData.concat(data.data),
                    page: ++_this.state.page,
                    hasMore: data.data.length >= 10
                });
            }
        });
    },
    componentDidMount: function () {
        this.ajaxHandler()
    },

    render: function () {
        var _this = this;
        var data = _this.state.listData;

        var objDiv = (value, index) => (
            <div key={index} className="cont-block">
                <div className="top-block">
                    <span className="fl">{value.title}</span>
                    <span className="rl">贡献值: <em className="mark-c">{value.contributeValue}</em></span>
                </div>

                <div className="cont-info">
                    <div className="fl">
                        <span className="text">投资日期{value.apply_date}</span>
                    </div>
                    <div className="rl">
                        <span className="text">过期时间{value.returned_date}</span>
                    </div>
                </div>
            </div>
        );

        var btnMore = <div className="loading-more" onClick={_this.ajaxHandler}>
            加载更多
        </div>;

        var btnComplete = <div className="complete-btn">已全部加载完毕</div>;

        var wulistImg = <div className="wulist-img"><img src="images/ico-wulist.png"/><span
            className="text">暂无邀友贡献值</span></div>;

        return (
            <div className="invite-block">
                { data.map(objDiv) }
                {this.state.hasMore ? btnMore : null}
                {!this.state.hasMore && data.length > 0 ? btnComplete : null}

                {
                    this.state.page == 2 && data.length == 0 ? wulistImg : null
                }
            </div>

        );
    }
});

const ContributeTab = React.createClass({
    getInitialState: function () {
        return {
            index: 0
        };
    },
    checkToInvestHandler: function () {
        this.setState({
            index: 0
        });
    },
    checkToInviteHandler: function () {
        this.setState({
            index: 1
        });
    },
    render: function () {
        var tabValue = this.state.value;
        var _this = this;

        return (
            <div className="contribute-cnt">
                <div className="contribute-tab">
                    <ul>
                        <li className={this.state.index == 0 ? "select-li" : ""}>
                            <span className="text" onClick={this.checkToInvestHandler}>投资贡献值</span>
                        </li>
                        <li className={this.state.index == 1 ? "select-li" :  ""}>
                            <span className="text" onClick={this.checkToInviteHandler}>邀友贡献值</span>
                        </li>
                    </ul>
                </div>

                <div className="contribute-tab-cnt">
                    {this.state.index == 0 ? <InvestTab /> : <InviteTab />}
                </div>
            </div>
        );
    }
});

const HomePage = React.createClass({
    render: function () {
        return (
            <div>
                <Contribute myInfoData={this.props.myInfoData}/>
                <ContributeTab />
            </div>
        );
    }
});

$FW.DOMReady(function () {
    $FW.BatchGet([
        API_PATH + "/mpwap/api/v1/user/contribute.shtml?page=1&rows=1&type=0"
        //"http://10.105.7.124/my.json",
    ], function (data) {
        ReactDOM.render(
            <HomePage myInfoData={data[0]}/>,
            document.getElementById("cnt")
        );
    })
});


if (!inApp()) {
    ReactDOM.render(<Header title={"我的贡献值"}/>, document.getElementById("header"));
}
