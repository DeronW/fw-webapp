var Cart = React.createClass({
    render: function() {
        return (
            <div className="hui-bank-cart">
                <div className="hui-shang-logo">
                    <img src="images/hui-shang-logo.png" />
                </div>

                <div className="bank-id">
                    6225********1726
                </div>

                <div className="info">
                    <span>开户名：</span>李文飞
                </div>

                <div className="info">
                    <span>开户行：</span>徽商银行股份有限公司合肥花园街支行
                </div>
            </div>
        );
    }
});

var Earnings = React.createClass({
    render: function() {
        return (
            <div className="hui-shang-earnings">
                <div className="earnings-title">
                    <div className="text">昨日收益(元)</div>
                    <div className="number-text">2.97</div>
                </div>

                <div className="info">
                    <div className="paragraph">
                        <div className="number-text c-fb6455">3,269,800.00</div>
                        <div className="text">可用余额(元)</div>
                    </div>
                    <div className="paragraph">
                        <div className="number-text">10.25%</div>
                        <div className="text">七日年化收益率</div>
                    </div>
                    <div className="paragraph last">
                        <div className="number-text">9,800.68</div>
                        <div className="text">累计收益(元)</div>
                    </div>
                </div>
            </div>
        );
    }
});

var FundsFlow = React.createClass({
    render: function() {
        return (
            <div className="funds-flow">
                <div className="title">
                    3个月内银行资金流水
                </div>

                <div className="info">
                    <div className="paragraph">
                        <div className="l">
                            <span className="text info-title">基金分红</span>
                            <span className="text data-text">2015-04-11 17:35:31</span>
                        </div>
                        <div className="r">
                            <span className="money-text c-4db94f">￥9,000.00</span>
                        </div>
                    </div>

                    <div className="paragraph">
                        <div className="l">
                            <span className="text info-title">提现至银行卡</span>
                            <span className="text data-text">2015-04-11 17:35:31</span>
                        </div>
                        <div className="r">
                            <span className="money-text">￥9,000.00</span>
                        </div>
                    </div>

                    <div className="paragraph">
                        <div className="l">
                            <span className="text info-title">基金分红</span>
                            <span className="text data-text">2015-04-11 17:35:31</span>
                        </div>
                        <div className="r">
                            <span className="money-text">￥9,000.00</span>
                        </div>
                    </div>

                    <div className="paragraph">
                        <div className="l">
                            <span className="text info-title">基金分红</span>
                            <span className="text data-text">2015-04-11 17:35:31</span>
                        </div>
                        <div className="r">
                            <span className="money-text">￥9,000.00</span>
                        </div>
                    </div>

                    <div className="paragraph">
                        <div className="l">
                            <span className="text info-title">基金分红</span>
                            <span className="text data-text">2015-04-11 17:35:31</span>
                        </div>
                        <div className="r">
                            <span className="money-text">￥9,000.00</span>
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

                <FundsFlow />
            </div>
        );
    }
});

ReactDOM.render(
    <Body />,
    document.getElementById("cnt")
);