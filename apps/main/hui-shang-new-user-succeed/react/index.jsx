'use strict';

const API_PATH = document.getElementById('api-path').value;


var Nav = React.createClass({
    render: function() {
        return (
            <div className="nav-block">
                <img src={this.props.imgUrl} />
            </div>
        );
    }
});

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
                    <span className="r-text">{this.props.btnText}</span>
                </div>
            </div>
        );
    }
});

var Btn = React.createClass({
    render: function() {
        return (
            <div className="btn-area">
                <div className="ui-btn ui-red-btn" onClick={this.props.Fun}>{this.props.btnText}</div>
            </div>
        );
    }
});

var PromptBlock = React.createClass({
    render: function() {
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
    render: function() {
        return (
            <div className="">
                <TopNav title={"注册成功"} btnText={"跳过"} />

                <Nav imgUrl={"images/process.png"}/>

                <PromptBlock imgUrl={"images/succeed-1.png"} title={"注册成功"} text={"建议您立即开通徽商银行存管账户为金融工场资金保驾护航"} />

                <Btn btnText={"马上开通"} Fun={this.btnHandler} />
            </div>
        );
    }
});




ReactDOM.render(
    <AccountSucceedBody />,
    document.getElementById("cnt")
);


