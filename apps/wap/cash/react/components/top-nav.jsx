
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
                    <span className="r-text" onClick={this.props.callbackInfoBtn}>{this.props.btnText}</span>
                </div>
            </div>
        );
    }
});
