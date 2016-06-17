'use strict';

const Header = React.createClass({
    render: function() {
        return (
            <div className="header">
                <div className="header-cont">
                    <div className="up-btn">
                        <img src="images/ico-blue-back.png"/> 
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
    render: function() {
        var myInfoData = this.props.myInfoData;

        return (
            <div>
                <div className="top-info">
                    <div className="top-info-l">
                        <div className="sum-block">
                             <span className="text">总贡献值</span>
                        </div>

                        <div className="money-block">
                            <span className="text">{myInfoData.data.contributeValue}</span>
                        </div>

                        <div className="text-block">
                            <p className="text">投资贡献值{myInfoData.data.inviteContributeValue}+邀友贡献值1000</p> 
                        </div>
                    </div>

                    <div className="top-info-r">
                        <div className="vip-block">
                            <span className="img">
                                vip{myInfoData.data.userLevel}
                            </span>
                            <span className="user-vip-text">
                                用户等级
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

const InvestTab = React.createClass({
    render: function() {
        var investTabData = this.props.investTabList;
        
        var objDiv = (value, index) => (
                <div key={index} className="cont-block">
                    <div className="top-block">
                        <span className="fl">投资利随享{value.title}</span>
                        <span className="rl">贡献值: <em className="mark-c">{value.contributeValue}</em></span>
                    </div>

                    <div className="cont-info">
                        <div className="fl">
                            <span className="text">本金: {value.money}</span>
                            <span className="text">投资日期{value.apply_date}</span>
                        </div>
                        <div className="rl">
                            <span className="text">年化投资额度: {value.money2}</span>
                            <span className="text">回款日期{value.returned_date}</span>
                        </div>
                    </div>
                </div>
        );

        return (
            <div className="invest-block">
                {
                    investTabData.data.invest_list.map(function(value, index) {
                        return objDiv(value, index);
                    })
                }
            </div>
        );         
    }
});

const InviteTab = React.createClass({
    render: function() {
        var inviteData = this.props.inviteTabList;

        var objDiv = (value, index) => (
                <div key={index} className="cont-block">
                    <div className="top-block">
                        <span className="fl">好友{value.title}首投</span>
                        <span className="rl">贡献值: <em className="mark-c">{value.contributeValue}</em></span>
                    </div>

                    <div className="cont-info">
                        <div className="fl">
                            <span className="text">投资日期{value.apply_date}</span>
                        </div>
                        <div className="rl">
                            <span className="text">回款日期{value.returned_date}</span>
                        </div>
                    </div>
                </div>

        );

        return (
            <div className="invite-block">
                {
                    inviteData.data.invest_list.map(function(value, index) {
                        return objDiv(value, index);
                    })
                }

            </div>
           
        );   
    }
});

const ContributeTab = React.createClass({
    getInitialState: function() {
        return {
            index: 0
        };   
    },
    checkToInvestHandler: function() {
        this.setState({
            index: 0
        }); 
    },
    checkToInviteHandler: function() {
        this.setState({
            index: 1
        });
    },
    render: function() {
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
                    {this.state.index == 0 ? <InvestTab investTabList={this.props.investTabData}/> : <InviteTab inviteTabList={this.props.inviteTabData} />}
               </div>
            </div>
        );
    }
});



const HomePage = React.createClass({
    render: function() {
        return (
            <div>
                <Contribute myInfoData={this.props.myInfoData} />
                <ContributeTab investTabData={this.props.investTabData} inviteTabData={this.props.inviteTabData} />
            </div>
        );
    }
});

var investTabAjax = {
    code: 200,
    message: " ",
    data: {
        invest_list: [
            {
                apply_date: "测试内容yi78",
                contributeValue: 15333,
                money: 87738,
                money2: 75844,
                returned_date: "测试内容h36v",
                title: "测试内容48io"
            }
        ]
    }
};


var inviteTabAjax = {
    code: 200,
    message: " ",
    data: {
        invest_list: [
            {
                apply_date: "测试内容yi78",
                contributeValue: 15333,
                returned_date: "测试内容h36v",
                title: "测试内容48io"
            }
        ]
    }
};

var myInfoAjax = {
    code: 200,
    message: " ",
    data: {
        contributeValue: 14311,
        inviteContributeValue: 14168,
        userLevel: 3
    }
};

ReactDOM.render(
    <Header title={"我的贡献值"}/>,
    document.getElementById("header")
);

ReactDOM.render(
    <HomePage myInfoData= {myInfoAjax} investTabData={investTabAjax} inviteTabData={inviteTabAjax}/>,
    document.getElementById("cnt")
);
