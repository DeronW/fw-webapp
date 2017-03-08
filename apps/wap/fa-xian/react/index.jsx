const Content = React.createClass({
    getInitialState() {
        return {
            notice: '',
            banners: [],
            topics: []
        }
    },
    componentDidMount() {
        $FW.Ajax(`${API_PATH}mpwap/new/userLogin/showNotice.shtml`).then(data => {
            this.setState({ notice: data.siteNotice })
        });

        let q = $FW.Format.urlQuery();

        $FW.Ajax({
            url: 'https://fore.9888.cn/cms/api/appbanner.php',
            data: {
                key: '0ca175b9c0f726a831d895e',
                id: q.banner_id || '33'
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
                id: q.topic_id || '34'
            },
            fail: () => true,
            complete: data => this.setState({
                topics: data.map(i => ({ url: i.url, img: i.thumb }))
            })
        })
    },
    onImageClickHandler(index) {
        let link = null;
        let bs = this.state.banners;
        for (let i = 0; i < bs.length; i++) {
            if (i == index) link = bs[i].url;
        }
        if (link) window.location.href = link;
    },
    render() {
        let { banners } = this.state;

        let topic = (t, index) => {
            return <a className="event" key={index} href={t.url}>
                <img src={t.img} />
            </a>
        }

        let banner_group;
        if (banners.length > 0)
            banner_group = <BannerGroup className="banners"
                onImageClick={this.onImageClickHandler}
                images={banners.map(i => i.img)} />;

        return (
            <div>
                {banner_group}
                <a className="notice">
                    <img className="notice-icon" src="images/1.png" />
                    <div className="sp-line"></div>
                    <div className="text"> {this.state.notice} </div>
                    <i className="icon-right-arrow"></i>
                </a>
                <div className="channel">
                    <a href="https://m.dougemall.com/static/mall/game/index.html?mallHead=true"> <i className="icon-game"></i>游戏中心 </a>
                    <a href="https://bbs.9888.cn/"> <i className="icon-bbs"></i>工友之家 </a>
                    <a href="https://m.9888.cn/static/wap/faq/index.html"> <i className="icon-faq"></i>帮助中心</a>
                    <a> <i className="icon-waiting"></i>敬请期待</a>
                </div>
                <div className="title-recommended"> 内容推荐 </div>
                <div className="events">
                    {this.state.topics.map(topic)}
                </div>
                <div className="contact-us">
                    <a className="service" href="tel:400-0322-988">
                        <i className="icon-service"></i><span>联系客服</span></a>
                    <a className="about-us" href="#">
                        <i className="icon-about-us icon-about-us-grey"></i>
                        <span className="about-us-grey">关于我们</span>
                    </a>
                </div>
            </div>
        )
    }
});

$FW.DOMReady(function () {
    ReactDOM.render(<Header title={'发现'} show_back_btn={false} />, HEADER_NODE);
    ReactDOM.render(<Content />, CONTENT_NODE);
});
