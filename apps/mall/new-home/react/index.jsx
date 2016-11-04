'use strict';

const API_PATH = document.getElementById('api-path').value;

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
     render: function(){
         let banner;
         if (this.props.banners.length) {
             banner = <BannerGroup className={iOSApp ? "head-images head-images-ios" : "head-images"}
                                   images={this.getHeadImages()}
                                   onImageClick={this.onImageClickHandler}/>
         } else {
             banner = <div className="no-banner"></div>
         }

         let backFactory = ()=> {
             return $FW.Browser.inApp() ? <img className="m-logo" src="images/m-logo.png"/> :
                 <a className="back-factory" href="http://m.9888.cn/mpwap/"><img
                     src="images/wap_shop_gong_logo.png"/></a>
         };

         let iOSApp = $FW.Browser.inApp() && $FW.Browser.inIOS();

         //let hot_product_item = (name, index) => {
         //    return (
         //        <a className="hot-product-item">
         //                <img src="images/hot-img.png"/>
         //                <span className="hot-img-title">儿童体温计</span>
         //                <span className="hot-img-price">1280元起</span>
         //        </a>
         //    )
         //};

         let hot_product_item =
                 <a className="hot-product-item hot-product-item-bg-1">
                         <img className="hot-img" src="images/hot-img.png"/>
                         <span className="hot-img-title hot-img-title-color-1">儿童体温计</span>
                         <span className="hot-img-price">1280元起</span>
                 </a>;

         let theme_product_item =
             <a className="theme-product-item">
                 <img src="images/product-img1.png"/>
                 <span className="theme-product-item-name">随手泡</span>
             </a>;
         
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
                         <img src="images/list-icon.png"/></a>
                 </div>
                 <div className="head-nav">
                     <a className=""><img src="images/nav-1.png"/><span>VIP专区</span></a>
                     <a className=""><img src="images/nav-2.png"/><span>豆哥周边</span></a>
                     <a className=""><img src="images/nav-3.png"/><span>工场券</span></a>
                     <a className=""><img src="images/nav-4.png"/><span>热门活动</span></a>
                     <a className=""><img src="images/nav-5.png"/><span>生活服务</span></a>
                     <a className=""><img src="images/nav-6.png"/><span>充值中心</span></a>
                     <a className=""><img src="images/nav-7.png"/><span>玩玩乐</span></a>
                     <a className=""><img src="images/nav-8.png"/><span>我可兑换</span></a>
                 </div>
                 <div className="new-product-list">
                     <div className="new-title"><img className="new-title-img" src="images/new-title.png"/></div>
                     <div className="new-product-wrap">
                         <div className="new-left-product">
                             <a href="" className="new-bg-1">
                                 <img className="new-img1" src="images/new-img1.png"/>
                                 <span className="new-img1-title">IPHONE6S</span>
                                 <span className="new-img1-price">￥128</span>
                             </a>
                         </div>
                         <div className="new-right-product">
                             <div className="new-right-top-product">
                                 <a href="" className="new-bg-2">
                                     <div className="new-right-top-wrap">
                                         <img className="new-img2" src="images/new-img2.png"/>
                                         <div className="new-right-top-product-info">
                                             <span className="new-img2-title">乐视TV</span>
                                             <span className="new-img2-price">1280元起</span>
                                         </div>
                                     </div>
                                 </a>
                                 <a href="" className="new-bg-3">
                                     <div className="new-right-top-wrap">
                                         <img className="new-img2" src="images/new-img2.png"/>
                                         <div className="new-right-top-product-info">
                                             <span className="new-img2-title">乐视TV</span>
                                             <span className="new-img2-price">1280元起</span>
                                         </div>
                                     </div>
                                 </a>
                             </div>
                             <div className="new-right-btm-product">
                                 <a href="" className="new-bg-4">
                                     <img className="new-img2" src="images/new-img2.png"/>
                                     <span className="new-img2-title">乐视TV</span>
                                     <span className="new-img2-price">1280元起</span>
                                 </a>
                                 <a href="" className="new-bg-5">
                                     <img className="new-img2" src="images/new-img2.png"/>
                                     <span className="new-img2-title">乐视TV</span>
                                     <span className="new-img2-price">1280元起</span>
                                 </a>
                                 <a href="" className="new-bg-6">
                                     <img className="new-img2" src="images/new-img2.png"/>
                                     <span className="new-img2-title">乐视TV</span>
                                     <span className="new-img2-price">1280元起</span>
                                 </a>
                             </div>
                         </div>
                     </div>
                 </div>
                 <div className="hot-product-list">
                     <div className="hot-title"><img className="hot-title-img" src="images/hot-title.png"/></div>
                     <div className="hot-product-wrap">
                         {hot_product_item}
                         {hot_product_item}
                         {hot_product_item}
                         {hot_product_item}
                         {hot_product_item}
                         {hot_product_item}
                         {hot_product_item}
                         {hot_product_item}
                     </div>
                 </div>
                 <div className="theme-1">
                     <a href="" className="activity-theme"><img src="images/food-theme-img.png"/></a>
                     {theme_product_item}
                     {theme_product_item}
                     {theme_product_item}
                     {theme_product_item}
                     {theme_product_item}
                     {theme_product_item}
                     {theme_product_item}
                     {theme_product_item}
                 </div>
                 <div className="auth-info only-in-ios-app">以上活动由金融工场主办 与Apple Inc.无关</div>
             </div>
         )
     }
});

$FW.DOMReady(function () {
    $FW.BatchGet([
        //`${API_PATH}mall/api/index/v1/banners.json`, // banner轮播图数据
        //`${API_PATH}mall/api/index/v1/activities.json` // 明前活动的数据
        'http://localhost/nginx-1.9.12/html/banners.json',
        'http://localhost/nginx-1.9.12/html/activities.json'
    ], function (data) {
        var banners = data[0].banners, activities = data[1].activities;
        if (typeof(banners) == 'undefined' || typeof(activities) == 'undefined')
            $FW.Component.Alert('error: empty data received');
        ReactDOM.render(<Mall banners={banners} activities={activities}/>, document.getElementById('cnt'));
    }, true);
});