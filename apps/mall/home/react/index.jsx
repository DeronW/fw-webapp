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

const Mall = React.createClass({
    getInitialState: function () {
        return {
            user_score: '--',
            popularRecommendData: []
        }
    },
    componentDidMount: function () {
        $FW.Ajax({
            url: `${API_PATH}/api/v1/user-state.json`,//登录状态及工分
            success: (data) => {
                if (data.is_login) {
                    this.setState({user_score: data.score || '--'});
                }
            }
        });
        $FW.Ajax({
            url: `${API_PATH}/mall/api/index/v1/recommendProducts.json`,//人气推荐列表
            data: {recommendBizNo: "TJ0000022", totalCount: 5},
            success: (data) => {
                this.setState({popularRecommendData: data.products || []});
            }
        });
    },
    getHeadImages: function () {
        var images = [];
        var bs = this.props.banners;
        for (var i = 0; i < bs.length; i++) {
            images.push(bs[i].img)
        }
        return images;
    },
    backNativeHandler: function () {
        NativeBridge.toNative('app_back_native')
    },

    onImageClickHandler: function (index) {
        var link = null;
        var bs = this.props.banners;
        for (var i = 0; i < bs.length; i++) {
            if (i == index) link = bs[i].link;
        }
        link ? gotoHandler(link) : console.log('no link set');
    },
    render: function () {
        let activity = (i, index) => {
            return <ActivityProduct title={i.title} img={i.img} bizNo={i.bizNo}
                                    activity_id={i.activity_id} products={i.products} key={index}/>;
        };
        let backFactory = ()=> {
            return $FW.Browser.inApp()?<a className="back-factory" onClick={this.backNativeHandler}><img src="images/wap_shop_gong_logo.png"/></a> :
                <a className="back-factory" href="http://m.9888.cn/mpwap/"><img src="images/wap_shop_gong_logo.png"/></a>
        };

        let iOSApp = $FW.Browser.inApp() && $FW.Browser.inIOS();

        let banner;
        if (this.props.banners.length) {
            banner = <BannerGroup className={iOSApp ? "head-images head-images-ios" : "head-images"}
                                  images={this.getHeadImages()}
                                  onImageClick={this.onImageClickHandler}/>
        } else {
            banner = <div className="no-banner"></div>
        }

        let recommended;
        if (this.state.popularRecommendData.length > 0) {
            recommended = <Recommended products={this.state.popularRecommendData}/>;
        }

        return (
            <div className="head-wrap">
                {banner}
                <div className={iOSApp ? "head-items head-images-ios" : "head-items"}>
                    {backFactory()}
                    <a onClick={ ()=> gotoHandler("/static/mall/product-list/index.html?searchSourceType=2", false) }
                       className="search-bar-a">
                        <img className="search-icon" src="images/search-icon.png"/>
                        <div className="search-bar">搜索</div>
                    </a>
                    <a className="index-avatar" onClick={ ()=> gotoHandler("/static/mall/user/index.html", true) }>
                        <img src="images/profile-icon.png"/></a>
                </div>
                <div className="head-user-info">
                    <div className="my-score">我的工分:<span
                        className="score-num">{this.state.user_score}工分</span></div>
                    <a className="my-exchange"
                       onClick={ () => gotoHandler("/static/mall/product-list/index.html?searchSourceType=1", true) }>我可兑换</a>
                    <a className="my-mall" onClick={ () => gotoHandler("/static/mall/user/index.html", true) }>我的商城</a>
                    <span className="vertical-gray-line"></span>
                </div>
                <div className="header-nav">
                    <a className="recharge"
                       onClick={() => gotoHandler("/static/mall/product-recharge/index.html", true) }>充值中心</a>
                    <a className="vip" onClick={()=> gotoHandler("/static/mall/product-vip-zone/index.html") }>VIP专区</a>
                    <a className="goods"
                       onClick={() => gotoHandler("/static/mall/game/index.html?mallHead=true", true) }>游戏中心</a>
                    <a className="mine" onClick={ () => gotoHandler("/static/mall/product-category/index.html", true) }>品类</a>
                </div>
                {recommended}
                <div className="index-actList-wrap">
                    { this.props.activities.map(activity) }
                    {this.props.activities.length ? null : <div className="empty">暂无活动</div>}
                </div>
                <div className="auth-info only-in-ios-app">以上活动由金融工场主办 与Apple Inc.无关</div>
            </div>
        )
    }
});

$FW.DOMReady(function () {
    $FW.BatchGet([
        `${API_PATH}mall/api/index/v1/banners.json`, // banner轮播图数据
        `${API_PATH}mall/api/index/v1/activities.json` // 明前活动的数据
    ], function (data) {
        var banners = data[0].banners, activities = data[1].activities;
        if (typeof(banners) == 'undefined' || typeof(activities) == 'undefined')
            $FW.Component.Alert('error: empty data received');

        ReactDOM.render(<Mall banners={banners} activities={activities}/>, document.getElementById('cnt'));
    }, true);
});
