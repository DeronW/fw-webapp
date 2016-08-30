'use strict';

const API_PATH = document.getElementById('api-path').value;

var TopNav = React.createClass({
    skipHandler: function () {
        location.href = '/'
    },

    render: function () {
        return (
            <div className="top-nav">
                <div className="info">
                    <div className="title">{this.props.title}</div>
                    <span className="r-text" onClick={this.skipHandler}>{this.props.btnText}</span>
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
                    <img src={this.props.imgUrl}/>
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
    clickHandler: function () {
        location.href = '/static/wap/open-bank/index.html'
    },
    render: function () {
        return (
            <div className="">
                <TopNav title={"注册成功"} btnText={"跳过"}/>
                <div className="nav-block">
                    <img src="images/process.png"/>
                </div>
                <PromptBlock imgUrl={"images/succeed-1.png"} title={"注册成功"}
                             text={"建议您立即开通徽商银行存管账户为金融工场资金保驾护航"}/>
                <Btn btnText={"马上开通"} Fun={this.clickHandler}/>
            </div>
        );
    }
});


$FW.DOMReady(() => {
    ReactDOM.render(<AccountSucceedBody />, document.getElementById("cnt"));
});


