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
            fila: () => true,
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
            fila: () => true,
            complete: data => this.setState({
                topics: data.map(i => ({ url: i.url, img: i.thumb }))
            })
        })
    },
    render() {

        let topic = (t, index) => {
            return <a className="event" key={index} href={t.url}>
                <img src={t.img} />
            </a>
        }

        return (
            <div>
                <BannerGroup className="banners" images={this.state.banners.map(i => i.img)} />
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
                    {this.state.topics.map(topic)}
                </div>
                <div className="contact-us">
                    <a className="service"><i className="icon-service"></i>联系客服</a>
                    <a className="about-us"><i className="icon-about-us"></i>关于我们</a>
                </div>
            </div>
        )
    }
});

$FW.DOMReady(function () {
    ReactDOM.render(<Header title={'发现'} show_back_btn={false} />, HEADER_NODE);
    ReactDOM.render(<Content />, CONTENT_NODE);
});
