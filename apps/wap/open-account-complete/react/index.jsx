var Nav = React.createClass({
    render: function () {
        return (
            <div className="nav-block">
                <img src={this.props.imgUrl} />
            </div>
        );
    }
});

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
                        this.props.backBtn ? <div className="back-btn" onClick={this.props.btnFun}><img src="images/back.png" /></div> : null
                    }

                    <div className="title">{this.props.title}</div>
                    <span className="r-text">{this.props.btnText}</span>
                </div>
            </div>
        );
    }
});

var Btn = React.createClass({
    render: function () {
        return (
            <div className="btn-area">
                <div className="ui-btn ui-red-btn" onClick={this.props.Fun}>{this.props.btnText}</div>
            </div>
        );
    }
});

var PromptBlock = React.createClass({
    render: function () {
        return (
            <div className="ui-prompt">
                <div className="img">
                    <img src={this.props.imgUrl} />
                </div>

                <div className="title">
                    {this.props.title}
                </div>

                <div className="ui-prompt-text">
                    {this.props.text}
                </div>
            </div>
        );
    }
});

//开户成功
var AccountSucceedBody = React.createClass({
    render: function () {
        return (
            <div className="">
                <TopNav title={"开户成功"} btnText={"关闭"} />

                <Nav imgUrl={"images/nav-2.png"} />

                <PromptBlock imgUrl={"images/account-succeed.png"} title={"成功开通徽商银行存管账户"} text={"交易密码用于投标、提现等操作，为了您的 账户安全，资金操作前请先设置交易密码。"} />

                <Btn btnText={"设置交易密码"} Fun={this.btnHandler} />
            </div>
        );
    }
});

$FW.DOMReady(() => {
    ReactDOM.render(<AccountSucceedBody />, CONTENT_NODE);
})
