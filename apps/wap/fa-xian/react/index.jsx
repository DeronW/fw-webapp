const Content = React.createClass({
    getInitialState() {
        return {
            notice: ''
        }
    },
    componentDidMount() {
        $.Ajax(`${API_PATH}mpwap/new/userLogin/showNotice.shtml`).then(data => {
            this.setState({ notice: data.siteNotice })
        })
    },
    render() {
        return (
            <div>
                <BannerGroup className="banners" images={[
                    'http://placehold.it/360x113',
                    'http://placehold.it/360x113',
                    'http://placehold.it/360x113'
                ]} />
                <a className="notice">
                    <img className="notice-icon" src="images/1.png" />
                    <div className="sp-line"></div>
                    <div className="text"> {this.state.notice} </div>
                    <i className="icon-right-arrow"></i>
                </a>
                <div className="channel">
                    <a href="http://mmall.9888.cn/static/mall/game/index.html?mallHead=true"> <i className="icon-game"></i>游戏中心 </a>
                    <a href="https://bbs.9888.cn/"> <i className="icon-bbs"></i>工友之家 </a>
                    <a href="https://m.9888.cn/static/wap/faq/index.html"> <i className="icon-faq"></i>帮助中心</a>
                    <a> <i className="icon-waiting"></i>敬请期待</a>
                </div>
                <div className="title-recommended"> 内容推荐 </div>
                <div className="events">
                    <a className="event">
                        <img src="http://placehold.it/660x150" />
                    </a>
                    <a className="event">
                        <img src="http://placehold.it/660x150" />
                    </a>
                    <a className="event">
                        <img src="http://placehold.it/660x150" />
                    </a>
                </div>
                <div className="contact-us">
                    <a className="service"><i className="icon-service"></i>联系客服</a>
                    <a className="about-us"><i className="icon-about-us"></i>关于我们</a>
                </div>
            </div>
        )
    }
})

$FW.DOMReady(function () {
    ReactDOM.render(<Header title={'发现'} show_back_btn={false} />, HEADER_NODE);
    ReactDOM.render(<Content />, CONTENT_NODE);
});
