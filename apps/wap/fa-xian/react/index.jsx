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
        this._time_gap = 0;

        return {
            notice: [],
            banners: [],
            topics: [],
            position_index: 0,
            position: 0,
            coupon_count:""
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
        //领券中心张数接口
        $FW.Ajax({
            url: 'https://m.9888.cn/mpwap/api/v2/getCouponNum.shtml',
            method: 'post',
            data: {
            },
            fail: () => true,
            success: data => {
                console.log(data)
                this.setState({coupon_count:data.availableNum})
            }
        });
    },
    startMovingNotice() {
        let delay = 30, duration = 3000, step = 2, singleH = 36, p, position_index;
        let { notice } = this.state;

        let t = setInterval(() => {
            this._time_gap += delay;
            if (this._time_gap >= duration) {
                p = this.state.position - step, position_index = this.state.position_index;
                if (p <= -singleH * (this.state.position_index + 1)) {
                    this._time_gap = 0
                    p = Math.round(p / singleH) * singleH
                    position_index += 1
                }

                if (p <= -singleH * notice.length) {
                    this._time_gap = 0
                    p = 0
                    position_index = 0
                }

                this.setState({
                    position: p,
                    position_index: position_index
                })
            }
        }, delay)

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
        let { banners, notice, position,coupon_count } = this.state;

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
                    <a onClick={() => gotoHandler('https://m.9888.cn/static/wap/coupon-center/index.html', true)}>
                        <i className="icon-game"></i>
                        领券中心
                        {coupon_count=="0"?null:<span className="coupon-count">{coupon_count}</span>}
                    </a>
                    <a onClick={() => gotoHandler("https://m.dougemall.com", true)}>
                        <i className="icon-bbs"></i>豆哥商城 </a>
                    <a onClick={() => gotoHandler("https://m.9888.cn/static/wap/faq/index.html")}>
                        <i className="icon-faq"></i>帮助中心</a>
                    <a onClick={() => gotoHandler("http://m.9888.cn/static/wap/topic-invest-school/index.html")}>
                        <i className="icon-waiting"></i>网贷学堂</a>
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
