
const Notice = React.createClass({
    clickHandler: function () {
        this.props.callbackNoticeHide(false);
    },
    render: function () {
        return (
            <div className="mask">
                <div className="notice-pop">
                    <div className="notice-close"></div>
                    <div className="notice-title">逾期费用说明</div>
                    <div className="close-icon" onClick={this.clickHandler}></div>
                    <div className="notice-content">
                        {this.props.content}
                    </div>
                    <div className="notice-btn" onClick={this.clickHandler}>知道了</div>
                </div>
            </div>
        )
    }
});
