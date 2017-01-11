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

const User = React.createClass({
    getInitialState:function(){
        return {
            background:"#ff3a38",
            color:'#fff'
        }
    },
    render:function(){
        let data = this.props.data;
        var header = {
            background:this.state.background,
            color:this.state.color,
            width:"100%",
            height:"100px",
            textAlign:"center",
            transition:"1s",
            position:"fixed",
            top:"0px",
            left:"0px",
            fontSize:"36px",
            lineHeight:"100px",
            zIndex:"1000"
        };
        var _this = this;
        window.onscroll = function(){
            var scrollTop = document.documentElement.scrollTop + document.body.scrollTop;
            if(scrollTop > 100) {
                return false;
            }
            if(scrollTop > 0){
                _this.setState({
                    background:"rgba(255,255,255,.7)",
                    color:"#333"
                })
            }else{
                _this.setState({
                    background:"#ff3a38",
                    color:"#fff"
                })
            }
        }

        return (
            <div className="user-wrap">
                {/*<div style={header}>我的商城</div>*/}
               <div className="user-info" style={{ marginTop: '-70px' }}>
                   <img className="profile-img" src="images/boy.jpg"/>
                   <div className="user-name">{data.username}
                       {data.vip_level==1?null:<span className="user-level"><img src={`images/usercenter_vip${data.vip_level-1}_icon.png`}/></span>}</div>
                   <div className="available-score">可用工分<span className="gongfeng">{data.score}</span></div>
                   <a className="account-setting" href={`/static/mall/user-setting/index.html?username=${data.username}&avatar=${data.avatar}`}>账户设置</a>
               </div>
               <div className="product-status">
                   <a className="product-status-item" href="/static/mall/order-list/index.html#pay">
                       <img src="images/icon1.jpg"/>
                       <span className="status-name">待付款</span>
                       <span className="remind-circle">{data.voucher_count}</span>
                   </a>
                   <a className="product-status-item" href="/static/mall/order-list/index.html#prepare">
                       <img src="images/icon2.jpg"/>
                       <span className="status-name">待发货</span>
                       <span className="remind-circle">{data.prepare_count}</span>
                   </a>
                   <a className="product-status-item" href="/static/mall/order-list/index.html#shipping">
                       <img src="images/icon3.jpg"/>
                       <span className="status-name">待收货</span>
                       <span className="remind-circle">{data.shipping_count}</span>
                   </a>
                   <a className="product-status-item" href="/static/mall/order-list/index.html#complete">
                       <img src="images/icon4.jpg"/>
                       <span className="status-name">已完成</span>
                   </a>
                   <a className="all-orders" href="/static/mall/order-list/index.html#all">
                       <img src="images/icon5.jpg"/>
                       <span className="status-name">全部订单</span>
                   </a>
                   <div className="seperate-line"></div>
               </div>
               <div className="user-personal-items">
                   <a className="personal-item" href="/static/mall/deliver-address/index.html?preview=true">
                       <span className="item-name item-icon6">收货地址</span>
                       <span className="jump-arrow"></span>
                   </a>
                   <a className="personal-item" href="/static/mall/voucher/index.html">
                       <span className="item-name item-icon7">兑换券</span>
                       <span className="jump-arrow"></span>
                   </a>
                   <a className="personal-item" href="/static/mall/my-bank-card/index.html?id=user">
                       <span className="item-name item-icon8">银行卡</span>
                       <span className="jump-arrow"></span>
                       <span className="bank-card-status">已绑定</span>
                   </a>
               </div>
               <div className="icon-list">
                   <a className="list-box" href="/static/mall/user-prize-record/index.html">
                       <img src="images/icon9.jpg"/>
                       <span className="box-title1">抽奖记录</span>
                   </a>
                   <a className="list-box">
                       <img src="images/icon11.jpg"/>
                       <span className="box-title2">我的足迹</span>
                   </a>
                   <a className="list-box" href="tel:400-0322-988">
                       <img src="images/icon10.jpg"/>
                       <span className="box-title3">客服热线</span>
                   </a>
                   <a className="list-box" href="http://m.9888.cn/static/wap/faq/index.html">
                       <img src="images/icon12.jpg"/>
                       <span className="box-title4">帮助中心</span>
                   </a>
               </div>
               <div className="hot-sales">
                   <div className="hot-sales-title"><img src="images/hot-sale.png"/></div>
                   <div className="product-list">
                       <HotSale/>
                   </div>
               </div>
                <div className="fixed-nav">
                    <a className="fixed-nav-link fixed-nav-link1" onClick={ () => gotoHandler("/static/mall/home/index.html") }></a>
                    <a className="fixed-nav-link fixed-nav-link2" onClick={ () => gotoHandler("/static/mall/product-category/index.html") }></a>
                    <a className="backToIndex" onClick={ () => $FW.Browser.inApp() ? NativeBridge.close() : location.href = 'http://m.9888.cn'}></a>
                    <a className="fixed-nav-link fixed-nav-link3" onClick={ () => gotoHandler("/static/mall/shopping-cart/index.html", true) }></a>
                    <a className="fixed-nav-link fixed-nav-link4 active" onClick={ () => gotoHandler("/static/mall/user/index.html", true) }></a>
                </div>
            </div>
        )
    }
});

const HotSale = React.createClass({
    getInitialState:function(){
        return {
            page:1,
            hasData:true,
            column:[]
        }
    },

    componentDidMount:function(){
        $FW.Ajax({
            url: `${API_PATH}/mall/api/index/v1/hotProducts.json`,//人气热卖列表
            data: {count: 6},
            success: (data) => {
                this.setState({column:data.products});
            }
        });
        $FW.Event.touchBottom(this.loadMoreProductHandler);
    },

    loadMoreProductHandler:function(done){
        this.setState({page:this.state.page+1});
        let arr = [];
        this.state.hasData ?
            $FW.Ajax({
                url: `${API_PATH}/mall/api/index/v1/hotProducts.json`,//人气热卖列表
                data: {count:6,page:this.state.page},
                enable_loading: true,
                success: (data) => {
                    if(data.products){
                        console.log(data);
                        data.products.map((item, index) => arr.push(item))
                        this.setState(prevState=>({
                            column : prevState.column.concat(arr)
                        }));
                    }
                    else{
                        this.setState({hasData:false});
                    }
                    done && done()
                }
            }):null
    },

    render: function () {
        let hotProduct = (product,index)=>{
            return(
                <a className="product-wrap" onClick={ () => gotoHandler('/static/mall/product-detail/index.html?bizNo='+product.bizNo)}>
                    <img src={product.img}/>
                    <span className="product-name">{product.title}</span>
                    <span className="product-price">{product.score}工分</span>
                </a>
            )
        }

        return (
            <div>
                    {this.state.column.map(hotProduct)}
            </div>
        )
    }
});

$FW.DOMReady(function() {
    NativeBridge.setTitle('我的商城');
    //ReactDOM.render(<BottomNavBar index={4}/>, document.getElementById('bottom-nav-bar'));
    $FW.Ajax({
        url: `${API_PATH}mall/api/member/v1/user.json`,
        enable_loading: true,
        success: function (data) {
            ReactDOM.render(<User data={data}/>, document.getElementById("cnt"));
        }
    })
});

function backward() {
    $FW.Browser.inApp() ? NativeBridge.close() : location.href = '';
}

