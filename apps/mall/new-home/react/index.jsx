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
            background:"transparent",
            logoImage:"images/logo.png",
            avatarImage:"images/list-icon.png"
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
             transition:"1s all"
         };
         var _this = this;
         window.onscroll = function(){
             var scrollTop = document.documentElement.scrollTop + document.body.scrollTop;
             if(scrollTop > 100) {
                 return false;
             }
             if(scrollTop > 0){
                _this.setState({
                    background:"rgba(255,255,255,.9)",
                    logoImage:"images/m-logo.png",
                    avatarImage:"images/m-list-icon.png"
                })
             }else{
                 _this.setState({
                     background:"transparent",
                     logoImage:"images/logo.png",
                     avatarImage:"images/list-icon.png"
                 })
             }
         }
         return (
             <div className="head-wrap">
                 {banner}
                 <div className={iOSApp ? "head-items head-images-ios" : "head-items"}>
                     <div style={head_nav_wrap}>
                         <img className="m-logo" src={this.state.logoImage}/>
                         <a onClick={ ()=> gotoHandler("/static/mall/product-list/index.html?searchSourceType=2", false) }
                            className="search-bar-a">
                             <img className="search-icon" src="images/search-icon.png"/>
                             <div className="search-bar">搜索</div>
                         </a>
                         <a className="index-avatar" onClick={ ()=> gotoHandler("/static/mall/user/index.html", true) }>
                             <img src={this.state.avatarImage}/></a>
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
            productFirstBizNo:'',
            productSecondImage:'',
            productSecondTitle:'',
            productSecondBizNo:'',
            productThirdImage:'',
            productThirdTitle:'',
            productThirdBizNo:'',
            productForthImage:'',
            productForthTitle:'',
            productForthBizNo:'',
            productFifthImage:'',
            productFifthTitle:'',
            productFifthBizNo:'',
            productSixthImage:'',
            productSixthTitle:'',
            productSixthBizNo:''
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
                    productFirstTitle:data.products[0].abbreviation,
                    productFirstBizNo:data.products[0].bizNo,
                    productSecondImage:data.products[1].img,
                    productSecondTitle:data.products[1].abbreviation,
                    productSecondBizNo:data.products[1].bizNo,
                    productThirdImage:data.products[2].img,
                    productThirdTitle:data.products[2].abbreviation,
                    productThirdBizNo:data.products[2].bizNo,
                    productForthImage:data.products[3].img,
                    productForthTitle:data.products[3].abbreviation,
                    productForthBizNo:data.products[3].bizNo,
                    productFifthImage:data.products[4].img,
                    productFifthTitle:data.products[4].abbreviation,
                    productFifthBizNo:data.products[4].bizNo,
                    productSixthImage:data.products[5].img,
                    productSixthTitle:data.products[5].abbreviation,
                    productSixthBizNo:data.products[5].bizNo
                });
                console.log(this.state.productSecondTitle);
            }
        });
    },
    render: function(){
        return (
            <div className="new-product-list">
                <div className="new-title"><img className="new-title-img" src="images/new-title.png"/></div>
                <div className="new-product-wrap">
                    <div className="new-left-product">
                        <a className="new-bg-1" onClick={ () => gotoHandler('/static/mall/product-detail/index.html?bizNo=' + this.state.productFirstBizNo)}>
                            <img className="new-img1" src={this.state.productFirstImage}/>
                            <span className="new-img1-title">{this.state.productFirstTitle}</span>
                            {/*<span className="new-img1-price">￥128</span>*/}
                        </a>
                    </div>
                    <div className="new-right-product">
                        <div className="new-right-top-product">
                            <a className="new-bg-2" onClick={ () => gotoHandler('/static/mall/product-detail/index.html?bizNo=' + this.state.productSecondBizNo)}>
                                <div className="new-right-top-wrap">
                                    <img className="new-img2" src={this.state.productSecondImage}/>
                                    <div className="new-right-top-product-info">
                                        <span className="new-img2-title">{this.state.productSecondTitle}</span>
                                        {/*<span className="new-img2-price">1280元起</span>*/}
                                    </div>
                                </div>
                            </a>
                            <a className="new-bg-3" onClick={ () => gotoHandler('/static/mall/product-detail/index.html?bizNo=' + this.state.productThirdBizNo)}>
                                <div className="new-right-top-wrap">
                                    <img className="new-img2" src={this.state.productThirdImage}/>
                                    <div className="new-right-top-product-info">
                                        <span className="new-img2-title">{this.state.productThirdTitle}</span>
                                         {/*<span className="new-img2-price">1280元起</span>*/}
                                    </div>
                                </div>
                            </a>
                        </div>
                        <div className="new-right-btm-product">
                            <a className="new-bg-4" onClick={ () => gotoHandler('/static/mall/product-detail/index.html?bizNo=' + this.state.productForthBizNo)}>
                                <img className="new-img2" src={this.state.productForthImage}/>
                                <span className="new-img2-title">{this.state.productForthTitle}</span>
                                {/*<span className="new-img2-price">1280元起</span>*/}
                            </a>
                            <a className="new-bg-5" onClick={ () => gotoHandler('/static/mall/product-detail/index.html?bizNo=' + this.state.productFifthBizNo)}>
                                <img className="new-img2" src={this.state.productFifthImage}/>
                                <span className="new-img2-title">{this.state.productFifthTitle}</span>
                                {/*<span className="new-img2-price">1280元起</span>*/}
                            </a>
                            <a className="new-bg-6" onClick={ () => gotoHandler('/static/mall/product-detail/index.html?bizNo=' + this.state.productSixthBizNo)}>
                                <img className="new-img2" src={this.state.productSixthImage}/>
                                <span className="new-img2-title">{this.state.productSixthTitle}</span>
                                {/*<span className="new-img2-price">1280元起</span>*/}
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
});

const HotProduct = React.createClass({
    getInitialState:function(){
        return {
            ps:[]
        }
    },
    componentDidMount:function(){
        $FW.Ajax({
            url: `${API_PATH}/mall/api/index/v1/recommendProducts.json`,//人气推荐列表
            data: {recommendBizNo: "TJ0000022", totalCount: 8},
            success: (data) => {
                console.log(data)
                this.setState({ps:data.products});
            }
        });
    },
    render: function(){
        let hot_product_item = (product,index) => {
            return (
                <a className={"hot-product-item hot-product-item-bg-"+parseInt(index+1)} key={index} onClick={ () => gotoHandler('/static/mall/product-detail/index.html?bizNo=' + product.bizNo)}>
                    <img className="hot-img" src={product.img}/>
                    <span className={"hot-img-title hot-img-title-color-"+parseInt(index+1)}>{product.abbreviation}</span>
                    <span className="hot-img-price">&yen;{product.rmbPrice}+{product.score}工分</span>
                </a>
          )
        };
        return (
            <div className="hot-product-list">
                <div className="hot-title"><img className="hot-title-img" src="images/hot-title.png"/></div>
                <div className="hot-product-wrap">
                    {this.state.ps.map(hot_product_item)}
                </div>
            </div>
        )
    }
});

const ThemeFirstProduct = React.createClass({
    getInitialState:function(){
        return {
            ps:[]
        }
    },
    componentDidMount:function(){
        $FW.Ajax({
            url: `${API_PATH}/mall/api/index/v1/recommendProducts.json`,//人气推荐列表
            data: {recommendBizNo: "TJ0000022", totalCount: 8},
            success: (data) => {
                console.log(data)
                this.setState({ps:data.products});
            }
        });
    },
    render:function(){
        let theme_product_item = (product,index) => {
            return (
                <a className="theme-product-item" key={index} onClick={ () => gotoHandler('/static/mall/product-detail/index.html?bizNo=' + product.bizNo)}>
                    <img className="theme-1-img" src={product.img}/>
                    <span className="theme-product-item-name">{product.abbreviation}</span>
                </a>
            )
        };
        return (
            <div className="theme-1">
                <a href="" className="activity-theme"><img src="images/food-theme-img.png"/></a>
                <div className="theme-product-wrap">
                    {this.state.ps.map(theme_product_item)}
                </div>
            </div>
        )
    }
});

const ThemeSecondProduct = React.createClass({
    getInitialState:function(){
        return {
            ps:[]
        }
    },
    componentDidMount:function(){
        $FW.Ajax({
            url: `${API_PATH}/mall/api/index/v1/recommendProducts.json`,//人气推荐列表
            data: {recommendBizNo: "TJ0000022", totalCount: 9},
            success: (data) => {
                console.log(data)
                this.setState({ps:data.products});
            }
        });
    },
    render:function(){
        let theme2_top_product_item = (product,index) => {
            return (
                <a className="theme2-top-product-item" key={index} onClick={ () => gotoHandler('/static/mall/product-detail/index.html?bizNo=' + product.bizNo)}>
                    <div className="theme2-top-product-title theme2-top-product-title-color1">{product.abbreviation}</div>
                    <div className="theme2-top-product-price">&yen;{product.rmbPrice}+{product.score}工分</div>
                    <img className="product-img2" src={product.img}/>
                </a>
            )
        };

        let theme2_btm_product_item = (product,index) => {
            return (
                <a className="theme2-btm-product-item" key={index} onClick={ () => gotoHandler('/static/mall/product-detail/index.html?bizNo=' + product.bizNo)}>
                    <div className="theme2-btm-product-wrap">
                        <img className ="theme2-product-img" src={product.img}/>
                        <div className="theme2-btm-product-info">
                            <span className="theme2-btm-product-title">{product.abbreviation}</span>
                            <span className="theme2-btm-product-price">&yen;{product.rmbPrice}+{product.score}工分</span>
                        </div>
                    </div>
                </a>
            )
        };
        return (
            <div className="theme-2">
                <a href="" className="activity-theme"><img src="images/education-theme-img.png"/></a>
                <div className="theme2-product-wrap">
                    <div className="theme2-top-product-list">
                        {this.state.ps.slice(0,3).map(theme2_top_product_item)}
                    </div>
                    <div className="theme2-btm-product-list">
                        {this.state.ps.slice(3,9).map(theme2_btm_product_item)}
                    </div>
                </div>
            </div>
        )
    }
});

const ThemeThirdProduct = React.createClass({
    getInitialState:function(){
        return {
            ps:[]
        }
    },
    componentDidMount:function(){
        $FW.Ajax({
            url: `${API_PATH}/mall/api/index/v1/recommendProducts.json`,//人气推荐列表
            data: {recommendBizNo: "TJ0000022", totalCount: 10},
            success: (data) => {
                console.log(data)
                this.setState({ps:data.products});
            }
        });
    },
    render:function(){
        let theme3_top_product_item = (product,index) => {
            return (
                <a className="theme3-top-product-item" key={index} onClick={ () => gotoHandler('/static/mall/product-detail/index.html?bizNo=' + product.bizNo)}>
                    <div className="theme3-top-product-wrap">
                        <div className="theme3-top-product-info">
                            <span className="theme3-top-product-title">{product.abbreviation}</span>
                            <span className="theme3-top-product-price">&yen;{product.rmbPrice}+{product.score}工分</span>
                            <span className="product-purchase">点击抢购<span className="tri"></span></span>
                        </div>
                        <img className ="theme3-product-img" src={product.img}/>
                    </div>
                </a>
            )
        };

        let theme3_btm_product_item = (product,index) => {
            return (
                <a className="theme3-btm-product-item" key={index} onClick={ () => gotoHandler('/static/mall/product-detail/index.html?bizNo=' + product.bizNo)}>
                    <img className="theme3-btm-product-img" src={product.img}/>
                    <span className="theme3-btm-product-title">{product.abbreviation}</span>
                </a>
            )
        };

        return (
            <div className="theme-3">
                <a href="" className="activity-theme"><img src="images/life-theme-img.png"/></a>
                <div className="theme3-product-wrap">
                    <div className="theme3-top-product-list">
                        {this.state.ps.slice(0,6).map(theme3_top_product_item)}
                    </div>
                    <div className="theme3-btm-product-list">
                        {this.state.ps.slice(6,10).map(theme3_btm_product_item)}
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