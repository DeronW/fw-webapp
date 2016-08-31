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

var Body = React.createClass({
    backBtnClick: function() {
        window.history.back();
    },
    render: function() {
        return (
            <div >
                <TopNav title={"开户失败"} backBtn={true} btnFun={this.backBtnClick}/>
                <div className="open-account-fail">
                    开户失败
                </div>
            </div>
        );
    }
});

ReactDOM.render(
    <Body />,
    document.getElementById("cnt")
);