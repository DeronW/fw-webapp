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
        this.TIMER = null;
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
                this.setState({ notice: data })
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
        this.moveNoticeHandler()
    },
    moveNoticeHandler() {
        var distance = 36;
        this.Timer = setInterval(() => {
            let { position, notice } = this.state;
            if (position > (notice.length - 2) * 36) {
                setTimeout(() => {
                    this.setState({
                        position: 0
                    });
                    distance = 36;
                }, 2000)
            } else {
                if (distance == position) {
                    distance += 34;
                    this.moveHandler(distance)
                } else {
                    this.moveHandler(distance)
                }
            }
        }, 20)
    },
    moveHandler(distance) {
        let s = 0;
        setTimeout(() => {
            s = (distance - this.state.position) / 8;
            s = s > 0 ? Math.ceil(s) : Math.floor(s);
            this.setState({
                position: this.state.position + s
            });
        }, 2000);
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
        if (this._count++ > 6) location.href = 'https://m.9888.cn/static/test-native-bridge/index.html'
    },
    render() {
        let { banners } = this.state;

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
        let position = {
            transform: 'translateY(-' + this.state.position + 'px)'
        };

        let noticeFn = (item, index) => {
            return <a onClick={() => gotoHandler(item.url)} style={position} key={index}> {item.title} </a>
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
                        {this.state.notice.map(noticeFn)}
                    </div>
                    <i className="icon-right-arrow"></i>
                </div>

                <div className="channel">
                    <a onClick={() => gotoHandler('https://m.dougemall.com/static/mall/game/index.html?mallHead=true', true)}>
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
