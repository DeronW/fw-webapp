'use strict';

const API_PATH = document.getElementById('api-path').value;


var TopNav = React.createClass({
    getInitialState: function() {
        return {
            backBtn: false
        }
    },
    backBtnClick: function() {

    },
    render: function() {
        return (
            <div className="top-nav">
                <div className="info">
                    {
                        this.props.backBtn ? <div className="back-btn" onClick={this.props.btnFun}><img src="images/back.png"/></div> : null
                    }

                    <div className="title">{this.props.title}</div>
                    <span className="r-text">
                        <img src="images/icon.png"/>
                    </span>
                </div>
            </div>
        );
    }
});



var Cart = React.createClass({
    getInitialState: function() {
        return {
            userInfo: {}
        };
    },
    componentDidMount: function() {
        var _this = this;


    },
    render: function() {

        var dataInfo = this.props.userHsAccountInfo;

        return (
            <div className="hui-bank-cart">
                <div className="hui-shang-logo">
                    <img src={this.state.userInfo.bankLogo} />
                </div>

                <div className="bank-id">
                    {
                        dataInfo.bankCardNo.substring(0, 4) + "****" +  dataInfo.bankCardNo.substring((dataInfo.bankCardNo.length - 4),  dataInfo.bankCardNo.length)
                    }
                </div>

                <div className="info">
                    <span>开户名：</span>{dataInfo.accountName}
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

    },
    render: function() {
        var dataInfo = this.props.userIncome;

        return (
            <div className="hui-shang-earnings">
                <div className="earnings-title">
                    <div className="text">昨日收益(元)</div>
                    <div className="number-text">{dataInfo.lastIncome}</div>
                </div>

                <div className="info">
                    <div className="paragraph">
                        <div className="number-text c-fb6455">{dataInfo.availableBalance}</div>
                        <div className="text">可用余额(元)</div>
                    </div>
                    <div className="paragraph">
                        <div className="number-text">{dataInfo.sevenDayRate}%</div>
                        <div className="text">七日年化收益率</div>
                    </div>
                    <div className="paragraph last">
                        <div className="number-text">{dataInfo.totalIncome}</div>
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

    },
    handlerAll: function() {
        //console.log(this.props.callbackIndex);
        location.href = "/static/wap/hui-shang-cash-flow/index.html"
    },
    render: function() {
        var list = function(cnt, index) {
            return <div className="paragraph">
                        <div className="l">
                            <span className="text info-title">{cnt.desc}</span>
                            <span className="text data-text">{cnt.createDate}</span>
                        </div>
                        <div className="r">
                            <span className={"money-text " +  (cnt.amount.substring(0, 1) !== "-" ? "c-4db94f" : "")} >{cnt.amount}</span>
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
                        this.props.userPageData.resultList.map(list, this)
                    }
                </div>
            </div>
        );
    }
});

var Body = React.createClass({
    render: function() {
        return (
            <div className="">
                <TopNav title={"徽商银行存管账户"} backBtn={true} btnFun={this.backBtnClick}/>
                <Cart userHsAccountInfo={this.props.ajaxHsAccountInfo}/>

                <Earnings userIncome={this.props.ajaxHsAccountInfo}/>

                <FundsFlow userPageData={this.props.ajaxPageData} callbackIndex={this.props.callbackPage}/>
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
        this.setState({
            index: index
        });
    },
    render: function() {
        var userAjaxData = this.props.activity;

        var ui = [
            <Body
                callbackPage={this.page}
                ajaxHsAccountInfo={userAjaxData.hsAccountInfo}
                ajaxPageData={userAjaxData.pageData}
            />,
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



$FW.DOMReady(function() {
    $FW.Ajax({
        url: API_PATH + "mpwap/api/v1/getHSAccountInfo.shtml",
        enable_loading: true,
        success: function(data) {
            ReactDOM.render(
                <AllPage activity={data} />,
                document.getElementById("cnt")
            );
        }
    });

});

