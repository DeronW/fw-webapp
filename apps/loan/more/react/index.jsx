class ExitBtn extends React.Component {
    constructor() {
        super();
        this.state = { showPop: false };
    }

    logoutHandler() {
        $FW.Store.clear();
        location.href = '/static/loan/user-entry/index.html';
    }

    render() {
        return (
            <div>
                <div className="more-btn">
                    <div className="ui-btn" onClick={() => { this.setState({ showPop: true }) }}>退出登录</div>
                </div>
                {this.state.showPop &&
                    <div className="mask" style={{ zIndex: 100 }}>
                        <div className="pop">
                            <div className="pop-title">退出登录</div>
                            <div className="pop-close" onClick={() => { this.setState({ showPop: false }) }}></div>
                            <div className="pop-content">确定退出登录当前账号？</div>
                            <div className="pop-btnlist">
                                <span className="pop-cancel" onClick={() => { this.setState({ showPop: false }) }}>取消</span>
                                <span className="pop-confirm" onClick={this.logoutHandler}>确认</span>
                            </div>
                        </div>
                    </div>
                }
            </div>
        )
    }
}


class More extends React.Component{
    constructor(props){
        super(props)
        this.state={
            popShow: false,
            contact: false
        }
        this.logoutHandler = this.logoutHandler.bind(this);
        this.popShow = this.popShow.bind(this);
        this.popHide = this.popHide.bind(this);
        this.contactShow = this.contactShow.bind(this);
        this.contactHide = this.contactHide.bind(this);
    }
    logoutHandler() {
    $FW.Store.clear();
    location.href = '/static/loan/user-entry/index.html';
}
    popShow() {
    this.setState({ popShow: true });
}
    popHide() {
    this.setState({ popShow: false });
}
    contactShow(){
    this.setState({ contact: true });
}
    contactHide(){
    this.setState({ contact: false });
}
    render() {
    return (
        <div>
            <div className="header">放心花</div>
            <img src="images/hotline.jpg" onClick={this.contactShow}/>
            <div className="more-cnt">
                <div className="more-list">
                    <div className="list">
                        <div className="list-cnt">
                            <a onClick={this.contactShow}>
                                <span className="icon contact-icon"></span>
                                <span className="text">联系我们</span>
                                <span className="arrow-icon"></span>
                            </a>
                        </div>
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

                <ExitBtn />

                <div className={this.state.contact ? "mask" : "mask dis"} style={{ zIndex: 100 }}>
                    <div className="pop">
                        <div className="pop-title">联系客服</div>
                        <div className="pop-close" onClick={this.contactHide}></div>
                        <div className="pop-content">400-102-0066</div>
                        <div className="pop-btnlist">
                            <span className="pop-cancel" onClick={this.contactHide}>取消</span>
                            <a className="pop-tel" href="tel:400-102-0066">马上拨打</a>
                        </div>
                    </div>
                </div>

            </div>
        </div>

    )
}
}

$FW.DOMReady(() => {
    ReactDOM.render(<More />, CONTENT_NODE);
    ReactDOM.render(<BottomNavBar/>, BOTTOM_NAV_NODE);
})
