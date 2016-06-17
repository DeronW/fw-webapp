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
                        我的贡献值
                    </div>
                </div>
            </div>
        );
    }
});

const Contribute = React.createClass({
    render: function() {
        return (
            <div>
                <div className="top-info">
                    <div className="top-info-l">
                        <div className="sum-block">
                             <span className="text">总贡献值</span>
                        </div>

                        <div className="money-block">
                            <span className="text">5000</span>
                        </div>

                        <div className="text-block">
                            <p className="text">投资贡献值40000+邀友贡献值1000</p> 
                        </div>
                    </div>

                    <div className="top-info-r">
                        <div className="vip-block">
                            <span className="img">
                                vip1
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
        return (
            <div className="invest-block">
                <div className="cont-block">
                    <div className="top-block">
                        <span className="fl">投资利随享2345</span>
                        <span className="rl">贡献值: <em className="mark-c">5000</em></span>
                    </div>

                    <div className="cont-info">
                        <div className="fl">
                            <span className="text">本金: 5,000.00</span>
                            <span className="text">投资日期2016-1-1</span>
                        </div>
                        <div className="rl">
                            <span className="text">年化投资额度: 8,000.00</span>
                            <span className="text">回款日期2014-03-21</span>
                        </div>
                    </div>
                </div>
            </div>
        );         
    }
});

const InviteTab = React.createClass({
    render: function() {
        return (
            <div className="invite-block">
                <div className="cont-block">
                    <div className="top-block">
                        <span className="fl">好友136***1244首投</span>
                        <span className="rl">贡献值: <em className="mark-c">5000</em></span>
                    </div>

                    <div className="cont-info">
                        <div className="fl">
                            <span className="text">投资日期2016-03-21</span>
                        </div>
                        <div className="rl">
                            <span className="text">回款日期2016-03-21</span>
                        </div>
                    </div>
                </div>
            </div>
           
        );   
    }
});

const ContributeTab = React.createClass({
    getInitialState: function() {
        return {
            index: 0,
            value: ['投资贡献值', '邀友贡献值']
        };   
    },
    clickHandler: function(index) {
        this.setState({
            index: index
        });
    },
    render: function() {
        var tabValue = this.state.value;
        var _this = this;

        var liTab = tabValue.map(function(value, index) {
                return  <li key={index} className={index == _this.state.index ? "select-li": ""} 
                            onClick={function() {_this.clickHandler(index)}}>
                                <span className="text" >{value}</span>
                        </li>;
            });
       
        return (
            <div className="contribute-cnt">
                <div className="contribute-tab">
                    <ul>
                        {
                            liTab
                        }
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
    render: function() {
        return (
            <div>
                <Contribute/>
                <ContributeTab/>
            </div>
        );
    }
});


ReactDOM.render(
    <Header />,
    document.getElementById("header")
);

ReactDOM.render(
    <HomePage/>,
    document.getElementById("cnt")
);
