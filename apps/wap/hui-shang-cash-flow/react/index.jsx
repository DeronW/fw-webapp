var TopNav = React.createClass({
    getInitialState: function () {
        return {
            backBtn: false
        }
    },
    backBtnClick: function () {

    },
    render: function () {
        return (
            <div className="top-nav">
                <div className="info">
                    {
                        this.props.backBtn ?
                            <div className="back-btn" onClick={this.props.btnFun}><img src="images/back.png" />
                            </div> : null
                    }

                    <div className="title">{this.props.title}</div>

                </div>
            </div>
        );
    }
});

var AllJournal = React.createClass({
    getInitialState: function () {
        return {
            resultList: this.props.getAjaxResultList
        };
    },
    componentDidMount: function () {

    },
    render: function () {
        var list = function (cnt, index) {
            return <div className="paragraph">
                <div className="l">
                    <span className="text info-title">{cnt.desc}</span>
                    <span className="text data-text">{cnt.createDate}</span>
                </div>
                <div className="r">
                    <span
                        className={"money-text " + (cnt.amount.substring(0, 1) !== "-" ? "" : "c-4db94f")}>{cnt.amount}</span>
                </div>
            </div>;
        };

        return (
            <div className="pop-account">
                <div className="funds-flow">
                    <div className="info">
                        {
                            this.state.resultList.pageData.result.map(list, this)
                        }
                    </div>
                </div>

            </div>
        );
    }
});

var Body = React.createClass({
    backBtnClick: function () {
        window.history.back();
    },
    render: function () {

        return (
            <div className="">
                <TopNav title={"徽商银行存管账户"} backBtn={true} btnFun={this.backBtnClick} />

                <AllJournal getAjaxResultList={this.props.activity}
                />
            </div>
        );
    }
});


$FW.DOMReady(function () {
    $FW.Ajax({
        url: API_PATH + "/mpwap/api/v1/getHSAccountInfoBill.shtml?page=1&pageSize=100",
        enable_loading: true,
        success: function (data) {
            ReactDOM.render(<Body activity={data} />, CONTENT_NODE);
        }
    });

});
