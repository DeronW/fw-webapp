// import LazyLoad from 'react-lazyload';
 


function gotoHandler(link) {
    if (link.indexOf('://') < 0) {
        link = location.protocol + '//' + location.hostname + link;
        // if(link.indexOf('%')!=-1){
        //     link=link.slice(0,link.indexOf('%'))
        // }
    }

    location.href = encodeURI(link);
}

function productLink(bizNo) {
    return `/static/mall/product-detail/index.html?bizNo=${bizNo}`
}

// function isVisible($node){
//     var winH = $(window).height(),
//         scrollTop = $(window).scrollTop(),
//         offSetTop = $(window).offSet().top;
//     if (offSetTop < winH + scrollTop) {
//         return true;
//     } else {
//         return false;
//     }
// }

// var hasShowed = false;
// $(window).on("sroll",function{
//     if (hasShowed) {
//         return;
//     } else {
//         if (isVisible($node)) {
//             console.log(true);
//         }
//     }
// })


const Mall = React.createClass({
    getInitialState: function() {
        return {
        //     var sourceType;

        // if ($FW.Browser.inApp()) {
        //     if ($FW.Browser.inAndroid()) {
        //         sourceType = 4
        //     }
        //     else {
        //         sourceType = 3
        //     }
        // }
        // else {
        //     sourceType = 2
        // }
            // background: "transparent",
            logoImage: "images/logo_3.png",
            avatarImage: "images/avatar_3.png",
            borderBottom: "none"
        }
    },

    getHeadImages: function() {
        var images = [];
        var bs = this.props.banners;
        for (var i = 0; i < bs.length; i++) {
            images.push(bs[i].img)
        }
        return images;
    },
    onImageClickHandler: function(index) {
        var link = null;
        var bs = this.props.banners;
        for (var i = 0; i < bs.length; i++) {
            if (i == index) link = bs[i].link;
        }
        link && gotoHandler(link)
    },
    componentDidMount: function() {
    },
    render: function () {
        let banner;
        var bs = this.props.banners;
        let iOSApp = $FW.Browser.inApp() && $FW.Browser.inIOS();

        if (bs.length) {
            banner = <BannerGroup className={iOSApp ? "head-images head-images-ios" : "head-images"}
                images={this.getHeadImages()}
                onImageClick={this.onImageClickHandler} />
        } else {
            banner = <div className="no-banner"></div>
        }


        let Charge_Nav = <div className="charge-nav">
            <div className="charge-bill"><img src="images/charge-bill.png" /></div>
            <div className="charge-flow"><img src="images/charge-flow.png" /></div>
        </div>

        return (
             // if ($FW.Browser.inIOSApp()) document.querySelector('.head_nav_wrap').style.top = "22px";
            <div className="head-wrap">

            <div className={iOSApp ? "head-items head-images-ios" : "head-items"}>
                    <div className={iOSApp ? "head_nav_wrap head_ios" : "head_nav_wrap"}>
                        <img className="m-logo" src={this.state.logoImage} />
                        <a href="/static/mall/product-list/index.html?searchSourceType=2"
                            className="search-bar-a">
                            <img className="search-icon" src="images/icon_search.png" />
                            <div className="search-bar">请您输入关键字</div>
                        </a>
                        <a className="index-avatar" href="/static/mall/user/index.html">
                            <img src={this.state.avatarImage} /></a>
                    </div>
                </div>
                {banner}
                
                <div className="head-nav">
                    <a href="/static/mall/product-vip-zone/index.html">
                        <img src="images/vip.png" /><span>VIP专区</span></a>
                    <a href="/static/mall/product-list/index.html?searchSourceType=0&category=fantasy&title=2">
                        <img src="images/douge_hood.png" /><span>豆哥周边</span></a>
                        <a href="/static/mall/product-list/index.html?searchSourceType=0&category=qualityLife&title=品质生活">
                        <img src="images/global_shopping.png" /><span>全球购</span></a>
                    <a href="/static/mall/product-list/index.html?searchSourceType=0&category=workshop&title=3">
                        <img src="images/vouchers.png" /><span>工场神券</span></a>
                    {/*<a href="/static/mall/product-hot-activity/index.html">
                        <img src="images/nav-4.png" /><span>热门活动</span></a>*/}

                        <a href="/static/mall/product-list/index.html?searchSourceType=1">
                        <img src="images/exchange.png" /><span>我可兑换</span></a>
                    <a href="/static/mall/product-recharge/index.html?tab=1">
                        <img src="images/Prepaid_ calls.png" /><span>话费充值</span></a>
                    <a href="/static/mall/product-recharge/index.html?tab=2">
                        <img src="images/flow_recharge.png" /><span>流量充值</span></a>

                        <a href="/static/mall/order-list/index.html">
                        <img src="images/query_order.png" /><span>订单查询</span></a>
                        <a href="/static/mall/game-zhuanpan20161230/index.html">v
                        <img src="images/span.png" /><span>大转盘</span></a>
                    <a href="/static/mall/game/index.html?mallHead=true">{/*static/mall/waiting/index.html*/}
                        <img src="images/game_center.png" /><span>游戏中心</span></a>
                </div>

{/*<LazyLoad height={200} offset={100}>*/}
                <HotProducts bizNo={'TJ0000022'} count={10} />
                <NewProducts bizNo={'TJ0000060'} count={10} />
                <Grid_1 bizNo={'TJ0000042'} count={10} />
                <Grid_2 bizNo={'TJ0000044'} count={10} />
                <Grid_3 bizNo={'TJ0000046'} count={10} />
                <Grid_7 bizNo={'TJ0000054'} count={10} />
                <Grid_6 bizNo={'TJ0000052'} count={10} />
                <Grid_5 bizNo={'TJ0000050'} count={10} />
                <Grid_4 bizNo={'TJ0000048'} count={10} />
                <Grid_8 bizNo={'TJ0000056'} count={10} />

                <HotSales />
            {/*</LazyLoad>*/}
            </div>
        )
    }
});

$FW.DOMReady(function() {
            ReactDOM.render( < BottomNavBar / > , BOTTOM_NAV_NODE);
            $FW.Ajax(`${API_PATH}/mall/api/index/v1/banners.json`)
                .then(data => ReactDOM.render(<Mall banners={data.banners} />, CONTENT_NODE));
});