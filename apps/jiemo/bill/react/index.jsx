const Bill = React.createClass({
    getInitialState: function () {
        var token;
        $FW.Ajax({
                url: `${API_PATH}api/userBase/v1/login.json`,
                method: "post",
                data: {mobile:"13811518528", password:"123456",sourceType:3}
            }).then((data) => console.log(data), (error) => console.log(error))
        return {
            token: token
        }
    },
    componentDidMount: function () {

    },
    render: function () {
        let bill_item = (item, index) => {
            return (
                <div className="bill-item" key={index}>
                    <div className="bill-detail">
                        <div className="bill-detail-wrap">
                            <span className="bill-money">90000.00</span>
                            <span className="bill-status"></span>
                        </div>
                        <span className="bill-deadline">2016-12-16到期</span>
                    </div>
                    <div className="pay-back-btn-wrap">
                        <div className="pay-back-btn">还款</div>
                    </div>
                </div>
            )
        };


        return (
            <div>
                <div className="header">
                    <div className="arrow-left"></div>
                    <div className="title">账单</div>
                    <div className="history-bill">历史账单</div>
                </div>
                <div className="data-box">
                    <div className="transfer-box">
                        <div className="transfer-title">当前账单(元)</div>
                        <div className="transfer-money">100000.00</div>
                        <div className="loan-info">
                            <div className="transfer-lines">
                                <div className="return-money">
                                    <span className="return-money-title">信用额度(元)</span>
                                    <span className="return-money-num">100000.00</span>
                                </div>
                                <div className="return-date">
                                    <span className="return-date-title">剩余可借(元)</span>
                                    <span className="return-date-day">100000.00</span>
                                </div>
                            </div>
                            <span className="vertical-line"></span>
                        </div>
                    </div>
                    {bill_item}
                </div>
                <div className="no-data-box">
                    <img className="no-data-img" src="images/no-data.png"/>
                </div>
            </div>
        )
    }
});

$FW.DOMReady(function () {
    ReactDOM.render(<Bill/>, document.getElementById('cnt'));
    ReactDOM.render(<BottomNavBar index={2}/>, document.getElementById('bottom-nav-bar'));
});
