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
                <div className="instruction-item">• 为了使您的理财收益最大化，您账户中的剩余金额系统将自动为您购买国寿货币基金。</div>
                <div className="instruction-item">• 您持有的基金总额可直接用于投资任意金融工场理财产品，以此使您的理财收益最大化。</div>
                <div className="instruction-item">• 18岁以下用户无法享受货币基金收益，将按银行活期存款利率计算，在提现第二日发放。</div>
                <div className="instruction-item">• 每日15:00前转入账户的资金会在第二个工作日（节假日顺延）计算收益，建议您在每日15:00前转入；</div>
                <div className="instruction-item">• 计算收益后的第二天会进行收益发放；</div>
                <div className="instruction-item">• 资金转出当日不计算收益；</div>
                <div className="instruction-item">• 如果当天收益不足0.01元，则向后累计；</div>
                <div className="instruction-item">• 为了保证您的收益最大化，建议您在每周四15:00前转入；</div>
                <div className="instruction-item">• 每周四15:00后建议您下周一15:00前再进行转入，可以多获取三天的活期收益哦。</div>
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

