let More = React.createClass({
    getInitialState:function(){
        return {
            popShow:false
        }
    },
    logoutHandler:function() {
        $FW.Store.clear();
        location.href = '/static/loan/user-entry/index.html';
    },
    popShow:function(){
        this.setState({popShow:true});
    },
    popHide:function(){
        this.setState({popShow:false});
    },
    render:function() {
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
                    </div>
                </div>


                <div className="more-btn">
                    <div className="ui-btn" onClick={this.popShow}>退出登录</div>
                </div>

                <div className={this.state.popShow?"mask":"mask dis"} style={{zIndex:100}}>
                    <div className="pop">
                        <div className="pop-title">退出登录</div>
                        <div className="pop-close" onClick={this.popHide}></div>
                        <div className="pop-content">确定退出登录当前账号？</div>
                        <div className="pop-btnlist">
                            <span className="pop-cancel" onClick={this.popHide}>取消</span>
                            <span className="pop-confirm" onClick={this.logoutHandler}>确认</span>
                        </div>
                    </div>
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

