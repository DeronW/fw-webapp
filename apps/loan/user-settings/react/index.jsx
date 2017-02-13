let More = React.createClass({
    logoutHandler() {
        window.localStorage.clear();
        location.href = '/static/loan/user-entry/index.html';
    },
    render() {
        return (
            <div className="more-cnt">
                <div className="more-list">
                    <div className="list">
                        <div className="list-cnt">
                            <a href="/static/loan/about-us/index.html">
                                <span className="icon about-icon"></span>
                                <span className="text">关于我们</span>
                                <span className="arrow-icon"></span>
                            </a>
                        </div>
                        <div className="list-cnt">
                            <a href="/static/loan/faq/index.html">
                                <span className="icon faq-icon"></span>
                                <span className="text">常见问题</span>
                                <span className="arrow-icon"></span>
                            </a>
                        </div>
                        <div className="list-cnt">
                            <a>
                                <span className="icon version-icon"></span>
                                <span className="text">当前版本</span>
                                <span className="arrow-icon"></span>
                                <span className="version">V1.0.0</span>
                            </a>
                        </div>
                    </div>
                </div>


                <div className="more-btn">
                    <div className="ui-btn" onClick={this.logoutHandler}>退出登录</div>
                </div>
            </div>
        )
    }
});


ReactDOM.render(<Header title={"更多"} />, HEADER_NODE);

ReactDOM.render(
    <More />,
    CONTENT_NODE
);

