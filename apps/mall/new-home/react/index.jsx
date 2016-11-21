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
    getInitialState:function(){
        return {
            background:"transparent"
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
         var head_nav_wrap = {
             background:this.state.background,
             width:"100%",
             height:"56px",
             paddingTop:"20px",
             paddingBottom:"20px",
             transition:"1s"
         };
         var _this = this;
         window.onscroll = function(){
             var scrollTop = document.documentElement.scrollTop + document.body.scrollTop;
             if(scrollTop > 100) {
                 return false;
             }
             if(scrollTop > 0){
                _this.setState({
                    background:"rgba(255,255,255,.7)"
                })
             }else{
                 _this.setState({
                     background:"transparent"
                 })
             }
         }
         return (
             <div className="head-wrap">
                 {banner}
                 <div className={iOSApp ? "head-items head-images-ios" : "head-items"}>
                     <div style={head_nav_wrap}>
                         {backFactory()}
                         <a onClick={ ()=> gotoHandler("/static/mall/product-list/index.html?searchSourceType=2", false) }
                            className="search-bar-a">
                             <img className="search-icon" src="images/search-icon.png"/>
                             <div className="search-bar">搜索</div>
                         </a>
                         <a className="index-avatar" onClick={ ()=> gotoHandler("/static/mall/user/index.html", true) }>
                             <img src="images/list-icon.png"/></a>
                     </div>
                 </div>
                 <div className="head-nav">
                     <a onClick={()=> gotoHandler("/static/mall/product-vip-zone/index.html")}><img src="images/nav-1.png"/><span>VIP专区</span></a>
                     <a className=""><img src="images/nav-2.png"/><span>豆哥周边</span></a>
                     <a className=""><img src="images/nav-3.png"/><span>工场券</span></a>
                     <a className=""><img src="images/nav-4.png"/><span>热门活动</span></a>
                     <a className=""><img src="images/nav-5.png"/><span>生活服务</span></a>
                     <a onClick={() => gotoHandler("/static/mall/product-recharge/index.html", true)}><img src="images/nav-6.png"/><span>充值中心</span><span className="hot-tag"></span></a>
                     <a onClick={() => gotoHandler("/static/mall/zhuanpan20161024/index.html?" + (+new Date()), true)}><img src="images/nav-7.png"/><span>玩玩乐</span></a>
                     <a onClick={() => gotoHandler("/static/mall/product-list/index.html?searchSourceType=1", true)}><img src="images/nav-8.png"/><span>我可兑换</span></a>
                 </div>
                 <NewProduct/>
                 <HotProduct/>
                 <ThemeFirstProduct/>
                 <ThemeSecondProduct/>
                 <ThemeThirdProduct/>
                 <ThemeForthProduct/>
                 <HotSale/>
                 <div className="fixed-nav">
                     <a className="fixed-nav-link fixed-nav-link1 active"></a>
                     <a className="fixed-nav-link fixed-nav-link2"></a>
                     <a className="backToIndex"></a>
                     <a className="fixed-nav-link fixed-nav-link3"></a>
                     <a className="fixed-nav-link fixed-nav-link4"></a>
                 </div>
             </div>
         )
     }
});

const NewProduct = React.createClass({
    getInitialState:function(){
        return {
            productFirstImage:'',
            productFirstTitle:'',
            productFirstPrice:''
        }
    },
    componentDidMount:function(){
        $FW.Ajax({
            url: `${API_PATH}/mall/api/index/v1/recommendProducts.json`,//人气推荐列表
            data: {recommendBizNo: "TJ0000022", totalCount: 6},
            success: (data) => {
                console.log(data)
                this.setState({
                    productFirstImage:data.products[0].img,
                    productFirstTitle:data.products[0].title
                });
                console.log(this.state.productFirstImage)
            }
        });
    },
    render: function(){
        return (
            <div className="new-product-list">
                <div className="new-title"><img className="new-title-img" src="images/new-title.png"/></div>
                <div className="new-product-wrap">
                    <div className="new-left-product">
                        <a href="" className="new-bg-1">
                            <img className="new-img1" src={this.state.productFirstImage}/>
                            <span className="new-img1-title">{this.state.productFirstTitle}</span>
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
        )
    }
});

const HotProduct = React.createClass({
    render: function(){
        let hot_product_item =
            <a className="hot-product-item hot-product-item-bg-1">
                <img className="hot-img" src="images/hot-img.png"/>
                <span className="hot-img-title hot-img-title-color-1">儿童体温计</span>
                <span className="hot-img-price">1280元起</span>
            </a>;
        return (
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
        )
    }
});

const ThemeFirstProduct = React.createClass({
    render:function(){
        let theme_product_item =
            <a className="theme-product-item">
                <img className="theme-1-img" src="images/product-img1.png"/>
                <span className="theme-product-item-name">随手泡</span>
            </a>;
        return (
            <div className="theme-1">
                <a href="" className="activity-theme"><img src="images/food-theme-img.png"/></a>
                <div className="theme-product-wrap">
                    {theme_product_item}
                    {theme_product_item}
                    {theme_product_item}
                    {theme_product_item}
                    {theme_product_item}
                    {theme_product_item}
                    {theme_product_item}
                    {theme_product_item}
                </div>
            </div>
        )
    }
});

const ThemeSecondProduct = React.createClass({
    render:function(){
        let theme2_top_product_item = <a className="theme2-top-product-item">
            <div className="theme2-top-product-title theme2-top-product-title-color1">家有宝贝</div>
            <div className="theme2-top-product-price">￥30234+2111100工分</div>
            <img className="product-img2" src="images/product-img2.png"/>
        </a>;

        let theme2_btm_product_item = <a className="theme2-btm-product-item">
            <div className="theme2-btm-product-wrap">
                <img className ="theme2-product-img" src="images/product-img1.png"/>
                <div className="theme2-btm-product-info">
                    <span className="theme2-btm-product-title">随手泡</span>
                    <span className="theme2-btm-product-price">￥666+39999工分</span>
                </div>
            </div>
        </a>;
        return (
            <div className="theme-2">
                <a href="" className="activity-theme"><img src="images/education-theme-img.png"/></a>
                <div className="theme2-product-wrap">
                    <div className="theme2-top-product-list">
                        {theme2_top_product_item}
                        {theme2_top_product_item}
                        {theme2_top_product_item}
                    </div>
                    <div className="theme2-btm-product-list">
                        {theme2_btm_product_item}
                        {theme2_btm_product_item}
                        {theme2_btm_product_item}
                        {theme2_btm_product_item}
                        {theme2_btm_product_item}
                        {theme2_btm_product_item}
                    </div>
                </div>
            </div>
        )
    }
});

const ThemeThirdProduct = React.createClass({
    render:function(){
        let theme3_top_product_item = <a className="theme3-top-product-item">
            <div className="theme3-top-product-wrap">
                <div className="theme3-top-product-info">
                    <span className="theme3-top-product-title">随手泡</span>
                    <span className="theme3-top-product-price">￥666+39999工分</span>
                    <span className="product-purchase">点击抢购<span className="tri"></span></span>
                </div>
                <img className ="theme3-product-img" src="images/product-img2.png"/>
            </div>
        </a>;

        let theme3_btm_product_item = <a className="theme3-btm-product-item">
            <img className="theme3-btm-product-img" src="images/product-img2.png"/>
            <span className="theme3-btm-product-title">宝宝体温计</span>
        </a>;
        return (
            <div className="theme-3">
                <a href="" className="activity-theme"><img src="images/life-theme-img.png"/></a>
                <div className="theme3-product-wrap">
                    <div className="theme3-top-product-list">
                        {theme3_top_product_item}
                        {theme3_top_product_item}
                        {theme3_top_product_item}
                        {theme3_top_product_item}
                        {theme3_top_product_item}
                        {theme3_top_product_item}
                    </div>
                    <div className="theme3-btm-product-list">
                        {theme3_btm_product_item}
                        {theme3_btm_product_item}
                        {theme3_btm_product_item}
                        {theme3_btm_product_item}
                    </div>
                </div>
            </div>
        )
    }
});

const ThemeForthProduct = React.createClass({
    render:function(){
        let theme4_top_product_item = <a className="theme4-top-product-item">
            <span className="theme4-top-product-title">潮妈必备</span>
            <span className="theme4-top-product-price">￥2000+20工分</span>
            <span className="horizon-line"></span>
            <img className="theme4-top-product-img" src="images/product-img2.png"/>
        </a>;
        return (
            <div className="theme-4">
                <a href="" className="activity-theme"><img src="images/outdoor-theme-img.png"/></a>
                <div className="theme4-product-wrap">
                    <div className="theme4-top-product-list">
                        {theme4_top_product_item}
                        {theme4_top_product_item}
                        {theme4_top_product_item}
                        {theme4_top_product_item}
                    </div>
                    <div className="theme4-btm-product-list">
                        <div className="theme4-btm-left-product-item">
                            <a className="theme4-btm-left-product-wrap">
                                <img className="theme4-btm-product-img" src="images/product-img2.png"/>
                                <span className="theme4-btm-product-title">潮人装备</span>
                                <span className="theme4-btm-product-price">￥5060+540工分</span>
                                <span className="product-purchase">点击抢购<span className="tri"></span></span>
                            </a>
                        </div>
                        <div className="theme4-btm-middle-product-wrap">
                            <a className="theme4-btm-middle-product-item">
                                <div className="theme4-btm-middle-top-product-wrap">
                                    <div className="theme4-btm-img-wrap">
                                        <img className="theme4-btm-product-img" src="images/product-img2.png"/>
                                    </div>
                                    <div className="theme4-btm-middle-top-info">
                                        <span className="theme4-btm-product-title">潮人装备</span>
                                        <span className="theme4-btm-product-price">￥5060+540工分</span>
                                        <span className="product-purchase">点击抢购<span className="tri"></span></span>
                                    </div>
                                </div>
                            </a>
                            <a className="theme4-btm-middle-product-item">
                                <div className="theme4-btm-middle-top-product-wrap">
                                    <div className="theme4-btm-img-wrap">
                                        <img className="theme4-btm-product-img" src="images/product-img2.png"/>
                                    </div>
                                    <div className="theme4-btm-middle-top-info">
                                        <span className="theme4-btm-product-title">潮人装备</span>
                                        <span className="theme4-btm-product-price">￥5060+540工分</span>
                                        <span className="product-purchase">点击抢购<span className="tri"></span></span>
                                    </div>
                                </div>
                            </a>
                        </div>
                        <div className="theme4-btm-right-product-wrap">
                            <a>
                                <img className="theme4-btm-product-img" src="images/product-img2.png"/>
                            </a>
                            <a>
                                <img className="theme4-btm-product-img" src="images/product-img2.png"/>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
});

const HotSale = React.createClass({
    render:function(){
        let hotProduct = <a className="product-wrap">
            <img src="images/product-img3.png"/>
            <span className="product-name">豆哥限量玩偶公仔豆哥限量玩偶公仔豆哥限量玩偶公仔</span>
            <span className="product-price">12267工分</span>
        </a>;

        return (
            <div className="hot-sales">
                <div className="hot-sales-title"><img src="images/hot-sale.png"/></div>
                <div className="product-list">
                    {hotProduct}
                    {hotProduct}
                    {hotProduct}
                    {hotProduct}
                </div>
            </div>
        )
    }
});


$FW.DOMReady(function () {
    $FW.BatchGet([
        //`${API_PATH}mall/api/index/v1/banners.json`, // banner轮播图数据
        //`${API_PATH}mall/api/index/v1/activities.json` // 明前活动的数据
        'http://localhost/nginx-1.9.12/html/banners.json'
    ], function (data) {
        var banners = data[0].banners;
        if (typeof(banners) == 'undefined')
            $FW.Component.Alert('error: empty data received');
        ReactDOM.render(<Mall banners={banners}/>, document.getElementById('cnt'));
    }, true);

});