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
            background: "transparent",
            logoImage: "images/logo.png",
            avatarImage: "images/list-icon.png",
            borderBottom: "none"
        }
    },
    getHeadImages: function () {
        var images = [];
        var bs = this.props.banners;
        for (var i = 0; i < bs.length; i++) {
            images.push(bs[i].img)
        }
        return images;
    },
    onImageClickHandler: function (index) {
        var link = null;
        var bs = this.props.banners;
        for (var i = 0; i < bs.length; i++) {
            if (i == index) link = bs[i].link;
        }
        link ? gotoHandler(link) : console.log('no link set');
    },
    componentDidMount: function () {
        window.addEventListener('scroll', function () {
            var scrollTop = document.documentElement.scrollTop + document.body.scrollTop;

            //if (scrollTop > 100) return false;

            let style = scrollTop > 100 ? {
                background: "url(images/header-bg.png)",
                logoImage: "images/m-logo.png",
                avatarImage: "images/m-list-icon.png"
            } : {
                background: "transparent",
                logoImage: "images/logo.png",
                avatarImage: "images/list-icon.png"
            }

            this.setState(style);
        }.bind(this),false);
    },
    render: function () {
        let banner;
        let iOSApp = $FW.Browser.inApp() && $FW.Browser.inIOS();

        if (this.props.banners.length) {
            banner = <BannerGroup className={iOSApp ? "head-images head-images-ios" : "head-images"}
                                  images={this.getHeadImages()}
                                  onImageClick={this.onImageClickHandler}/>
        } else {
            banner = <div className="no-banner"></div>
        }

        var head_nav_wrap = {
            background: this.state.background,
            width: "100%",
            height: "71px",
            paddingTop: "20px",
            paddingBottom: "20px",
            transition: "1s all"
        };

        let Charge_Nav = <div className="charge-nav">
            <div className="charge-bill"><img src="images/charge-bill.png"/></div>
            <div className="charge-flow"><img src="images/charge-flow.png"/></div>
        </div>


        return (
            <div className="head-wrap">
                {banner}
                <div className={iOSApp ? "head-items head-images-ios" : "head-items"}>
                    <div style={head_nav_wrap} className="head_nav_wrap">
                        <img className="m-logo" src={this.state.logoImage}/>
                        <a onClick={ () => gotoHandler("/static/mall/product-list/index.html?searchSourceType=2", false) }
                           className="search-bar-a">
                            <img className="search-icon" src="images/search-icon.png"/>
                            <div className="search-bar">请输入关键字</div>
                        </a>
                        <a className="index-avatar"
                           onClick={ () => gotoHandler("/static/mall/user/index.html", true) }>
                            <img src={this.state.avatarImage}/></a>
                    </div>
                </div>
                <div className="head-nav">
                    <a onClick={() => gotoHandler("/static/mall/product-vip-zone/index.html")}><img
                        src="images/nav-1.png"/><span>VIP专区</span></a>
                    <a onClick={() => gotoHandler("/static/mall/product-list/index.html?searchSourceType=0&category=fantasy&title=豆哥周边")}><img
                        src="images/nav-2.png"/><span>豆哥周边</span></a>
                    <a onClick={() => gotoHandler("/static/mall/product-list/index.html?searchSourceType=0&category=workshop&title=工场券")}><img
                        src="images/nav-3.png"/><span>工场券</span></a>
                    <a onClick={() => gotoHandler("/static/mall/hot-activity/index.html", true)}><img
                        src="images/nav-4.png"/><span>热门活动</span></a>
                    <a onClick={() => gotoHandler("/static/mall/product-recharge/index.html?tab=1", true)}><img
                        src="images/nav-5.png"/><span>充话费</span></a>
                    <a onClick={() => gotoHandler("/static/mall/product-recharge/index.html?tab=2", true)}><img
                        src="images/nav-6.png"/><span>充流量</span><span className="hot-tag"></span></a>
                    <a onClick={() => gotoHandler("/static/mall/game/index.html?mallHead=true", true)}><img
                        src="images/nav-7.png"/><span>游戏中心</span></a>
                    <a onClick={() => gotoHandler("/static/mall/product-list/index.html?searchSourceType=1", true)}><img
                        src="images/nav-8.png"/><span>我可兑换</span></a>
                </div>
                {/*Charge_Nav */}
                <div id="NewProducts"></div>
                <div id="HotProducts"></div>
                <div id="Grid_3_6"></div>
                <div id="Grid_4_4"></div>
                <div id="Grid_4_5"></div>
                <div id="Grid_6_4"></div>
                <HotSales/>
            </div>
        )
    }
});

$FW.DOMReady(function () {
    ReactDOM.render(<BottomNavBar/>, document.getElementById('bottom-nav-bar'));

    $FW.Ajax(`${API_PATH}/mall/api/index/v1/banners.json`)
        .then(data => ReactDOM.render(<Mall banners={data.banners}/>, CONTENT_NODE));

    $FW.Ajax(`${API_PATH}/mall/api/index/v1/recommendProducts.json?recommendBizNo=TJ0000022&totalCount=6`)
        .then((data)=> ReactDOM.render(<NewProducts data={data.products}/>, document.getElementById('NewProducts')));

    $FW.Ajax(`${API_PATH}/mall/api/index/v1/recommendProducts.json?recommendBizNo=TJ0000022&totalCount=8`)
        .then((data)=> {
            ReactDOM.render(<HotProducts data={data.products}/>, document.getElementById('HotProducts'));
            ReactDOM.render(<Grid_4_4 data={data.products}/>, document.getElementById('Grid_4_4'))
        });

    $FW.Ajax(`${API_PATH}/mall/api/index/v1/recommendProducts.json?recommendBizNo=TJ0000022&totalCount=9`)
        .then(data => ReactDOM.render(<Grid_3_6 data={data.products}/>, document.getElementById('Grid_3_6')))

    $FW.Ajax(`${API_PATH}/mall/api/index/v1/recommendProducts.json?recommendBizNo=TJ0000022&totalCount=10`)
        .then(data => {
            ReactDOM.render(<Grid_4_5 data={data.products}/>, document.getElementById('Grid_4_5'));
            ReactDOM.render(<Grid_6_4 data={data.products}/>, document.getElementById('Grid_6_4'))
        })

});
