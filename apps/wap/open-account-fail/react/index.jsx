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
                    <div className="back-btn" onClick={this.props.btnFun}>
                        <img src="images/back.png"/>
                    </div>
                    <div className="title">{this.props.title}</div>
                    <span className="r-text" onClick={this.skipHandler}>{this.props.btnText}</span>
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

var Body = React.createClass({
    backBtnClick: function() {
        window.history.back();
    },
    btnHandler: function() {
        window.history.back();
    },
    render: function() {
        var text = function() {
            return <span>
                        请确认各项信息填写正确后，重新提交， 或联系客服：<span className="c">400-0322-988</span>
                   </span>

        };

        return (
            <div >
                <TopNav title={"开户失败"} backBtn={true} btnFun={this.backBtnClick}/>

                <PromptBlock imgUrl={"images/fail-img.png"} title={"开户失败"} text={text()} />

                <Btn btnText={"返回修改"} Fun={this.btnHandler} />
            </div>
        );
    }
});

ReactDOM.render(
    <Body />,
    document.getElementById("cnt")
);