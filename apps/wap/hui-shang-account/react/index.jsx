var TopNav = React.createClass({
    getInitialState: function() {
        return {
            backBtn: false
        }
    },
    backBtnClick: function() {

    },
    showHandler:function(){
        this.props.callbackPopShow(true);
    },
    render: function() {
        return (
            <div className="top-nav">
                <div className="info">
                    {
                        this.props.backBtn ? <div className="back-btn" onClick={this.props.btnFun}><img src="images/back.png"/></div> : null
                    }

                    <div className="title">{this.props.title}</div>
                    <span className="r-text" onClick={this.showHandler}>
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
                    <img src="images/hui-shang-logo.png" />
                </div>

                <div className="bank-id">
                    {
                        dataInfo.bankCardNo
                    }
                </div>

                <div className="info">
                    <span>开户名：</span>{dataInfo.accountName}
                </div>

                <div className="info">
                    <span>开户行：</span>{dataInfo.bankBranch}
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
                    <div className="text">累计余额收益(元)</div>
                    <div className="number-text">
                        {dataInfo.totalIncome}
                    </div>
                </div>

                <div className="info">
                    <div className="paragraph">
                        <div className="number-text c-fb6455">{dataInfo.availableBalance}</div>
                        <div className="text">可用余额(元)</div>
                    </div>
                    <div className="paragraph last">
                        <div className="number-text">{dataInfo.frozenBalance}</div>
                        <div className="text">冻结金额(元)</div>
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
                            <span className={"money-text " +  (cnt.amount.substring(0, 1) !== "-" ? "" : "c-4db94f")} >{cnt.amount}</span>
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
                        this.props.userPageData.result.map(list, this)
                    }
                </div>
            </div>
        );
    }
});

var Body = React.createClass({
    getInitialState: function() {
        return {
            popShow: false
        };
    },
    backBtnClick: function() {
        window.history.back();
    },
    getPopShow: function(booleanVal) {
        console.log(booleanVal);
        this.setState({
            popShow: booleanVal
        });
    },
    render: function() {
        return (
            <div className="">
                <TopNav title={"徽商银行存管账户"} backBtn={true}
                        btnFun={this.backBtnClick}
                    callbackPopShow={this.getPopShow}
                />
                <Cart userHsAccountInfo={this.props.ajaxHsAccountInfo}/>

                <Earnings userIncome={this.props.ajaxHsAccountInfo}/>

                <FundsFlow userPageData={this.props.ajaxPageData} callbackIndex={this.props.callbackPage}/>

                {
                    !this.state.popShow ? null : <Pop callbackPopShow={this.getPopShow}/>
                }
            </div>
        );
    }
});

var Pop = React.createClass({
    closeHandler: function() {
        this.props.callbackPopShow(false);
    },
    render: function() {
        return (
            <div className="mask">
                <div className="close-btn" onClick={this.closeHandler}></div>
                <div className="instruction-title">说明</div>
                <div className="instruction-item">• 充值后，您的资金将会转入您的徽商银行电子账户，全程监管，安全无忧；</div>
                <div className="instruction-item">• 充值后，您在徽商账户内的可用资金，每天按照银行的靠档计息规则计息，当资金变动日终时，进行收益结算；</div>
                <div className="instruction-item">• 仅可查看3个月的资金流水；</div>
                <div className="instruction-item">• 如遇问题，请联系客服400-0322-988</div>
            </div>
        )
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
    closeHandler:function(){

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

