function gotoHandler(link, need_login) {
    if (link.indexOf('://') < 0) {
        link = location.protocol + '//' + location.hostname + link;
    }
    if ($FW.Browser.inApp()) {
        NativeBridge.goto(link, need_login)
    } else {
        location.href = encodeURI(link);
    }
}

const Content = React.createClass({
    getInitialState() {
        this._count = 0;

        return {
            notice: [],
            banners: [],
            topics: [],
            position: 0
        }
    },
    componentDidMount() {
        $FW.Ajax({
            url: "https://fore.9888.cn/cms/api/appbanner.php",
            data: {
                key: '0ca175b9c0f726a831d895e',
                id: '33'//'33'
            },
            fail: () => true,
            complete: data => {
                this.setState({ notice: data }, this.startMovingNotice);
            }
        });
        let q = $FW.Format.urlQuery();

        $FW.Ajax({
            url: 'https://fore.9888.cn/cms/api/appbanner.php',
            data: {
                key: '0ca175b9c0f726a831d895e',
                id: q.banner_id || '30'//'30'
            },
            fail: () => true,
            complete: data => this.setState({
                banners: data.map(i => ({ url: i.url, img: i.thumb }))
            })
        });

        $FW.Ajax({
            url: 'https://fore.9888.cn/cms/api/appbanner.php',
            data: {
                key: '0ca175b9c0f726a831d895e',
                id: q.topic_id || '31'//'31'
            },
            fail: () => true,
            complete: data => this.setState({
                topics: data.map(i => ({ url: i.url, img: i.thumb }))
            })
        })

    },
    startMovingNotice() {
        setInterval(this.moveNoticeHandler, 3000)
    },
    moveNoticeHandler() {
        let singleH = 36, step = 2;
        let p, { notice } = this.state, old_position = parseInt('' + this.state.position);

        this._notice_timer = setInterval(() => {
            p = this.state.position - step;
            if (p <= old_position - singleH) clearInterval(this._notice_timer);
            if (p <= -singleH * notice.length) {
                clearInterval(this._notice_timer);
                p = 0;
            }
            this.setState({ position: p });
        }, 30)
    },
    onImageClickHandler(index) {
        let link = null;
        let bs = this.state.banners;
        for (let i = 0; i < bs.length; i++) {
            if (i == index) link = bs[i].url;
        }
        if (link) gotoHandler(link);
    },
    bdHandler() {
        if (this._count++ > 6)
            gotoHandler('https://m.9888.cn/static/test-native-bridge/index.html')
    },
    render() {
        let { banners, notice, position } = this.state;

        let topic = (t, index) => {
            return <a className="event" key={index} onClick={() => gotoHandler(t.url)}>
                <img src={t.img} />
            </a>
        };

        let banner_group;
        if (banners.length > 0)
            banner_group = <BannerGroup className="banners"
                onImageClick={this.onImageClickHandler}
                images={banners.map(i => i.img)} />;

        let noticeFn = (item, index) => {
            return <a onClick={() => gotoHandler(item.url)} key={index}> {item.title} </a>
        };

        return (
            <div>
                <div className="findBanner">
                    {banner_group}
                </div>
                <div className="notice">
                    <img className="notice-icon" src="images/1.png" />

                    <div className="sp-line"></div>
                    <div className="text">
                        <div className="text-scroll-panel" style={{ top: `${position}px` }}>
                            {notice.map(noticeFn)}
                            {notice[0] && noticeFn(notice[0])}
                        </div>
                    </div>
                    <i className="icon-right-arrow"></i>
                </div>

                <div className="channel">
                    <a onClick={() => gotoHandler('https://m.dougemall.com/static/mall/game/index.html', true)}>
                        <i className="icon-game"></i>游戏中心 </a>
                    <a onClick={() => gotoHandler("https://bbs.9888.cn/", true)}>
                        <i className="icon-bbs"></i>工友之家 </a>
                    <a onClick={() => gotoHandler("https://m.9888.cn/static/wap/faq/index.html")}>
                        <i className="icon-faq"></i>帮助中心</a>
                    <a onClick={() => gotoHandler("http://m.9888.cn/static/wap/topic-invest-school/index.html")}>
                        <i className="icon-waiting"></i>投资学堂</a>
                </div>
                <div className="title-recommended" onClick={this.bdHandler}> 内容推荐</div>
                <div className="events">
                    {this.state.topics.map(topic)}
                </div>
                <div className="contact-us">
                    <a className="service" href="tel:400-0322-988">
                        <i className="icon-service"></i><span>联系客服</span></a>
                    <a className="about-us">
                        <i className="icon-about-us icon-about-us-grey"></i>
                        <span className="about-us-grey">关于我们</span>
                    </a>
                </div>
            </div>
        )
    }
});

$FW.DOMReady(function () {
    ReactDOM.render(<Content />, CONTENT_NODE);
});
