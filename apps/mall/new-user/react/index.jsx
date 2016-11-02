'use strict';
const API_PATH = document.getElementById('api-path').value;

const User = React.createClass({
    render:function(){
        return (
           <div>
               <div className="header">
                   <a className="user-back-arrow"></a>
                   <span className="user-title">我的商城</span>
               </div>
               <div className="user-info">
                   <img className="profile-img" src="images/boy.jpg"/>
                   <div className="user-name">蓝月蓝月<span className="user-level"><img src="images/usercenter_vip1_icon.png"/></span></div>
                   <div className="available-score">可用工分<span className="gongfeng">998544448</span></div>
                   <a className="account-setting">账户设置</a>
               </div>
               <div className="product-status">
                   <a className="product-status-item">
                       <img src="images/icon1.jpg"/>
                       <span className="status-name">待付款</span>
                       <span className="remind-circle">2</span>
                   </a>
                   <a className="product-status-item">
                       <img src="images/icon2.jpg"/>
                       <span className="status-name">待发货</span>
                       <span className="remind-circle">2</span>
                   </a>
                   <a className="product-status-item">
                       <img src="images/icon3.jpg"/>
                       <span className="status-name">待收货</span>
                       <span className="remind-circle">2</span>
                   </a>
                   <a className="product-status-item">
                       <img src="images/icon4.jpg"/>
                       <span className="status-name">已完成</span>
                   </a>
                   <a className="all-orders">
                       <img src="images/icon5.jpg"/>
                       <span className="status-name">全部订单</span>
                   </a>
                   <div className="seperate-line"></div>
               </div>
               <div className="user-personal-items">
                   <a className="personal-item">
                       <span className="item-name item-icon6">收货地址</span>
                       <span className="jump-arrow"></span>
                   </a>
                   <a className="personal-item">
                       <span className="item-name item-icon7">兑换券</span>
                       <span className="jump-arrow"></span>
                   </a>
                   <a className="personal-item">
                       <span className="item-name item-icon8">银行卡</span>
                       <span className="jump-arrow"></span>
                       <span className="bank-card-status">已绑定</span>
                   </a>
               </div>
               <div className="icon-list">
                   <a className="list-box">
                       <img src="images/icon9.jpg"/>
                       <span className="box-title1">抽奖记录</span>
                   </a>
                   <a className="list-box">
                       <img src="images/icon11.jpg"/>
                       <span className="box-title2">我的足迹</span>
                   </a>
                   <a className="list-box">
                       <img src="images/icon13.jpg"/>
                       <span className="box-title3">客服热线</span>
                   </a>
                   <a className="list-box">
                       <img src="images/icon14.jpg"/>
                       <span className="box-title4">帮助中心</span>
                   </a>
               </div>
               <div className="hot-sales">
                   <div className="hot-sales-title"><img src="images/hot-sale.png"/></div>
                   <div className="product-list">
                       <HotProduct/>
                       <HotProduct/>
                       <HotProduct/>
                       <HotProduct/>
                   </div>
               </div>
           </div>
        )
    }
});

const HotProduct = React.createClass({
    render:function(){
        return (
            <a className="product-wrap">
                 <img src="images/product.jpg"/>
                 <span className="product-name">豆哥限量玩偶公仔豆哥限量玩偶公仔豆哥限量玩偶公仔</span>
                 <span className="product-price">12267工分</span>
            </a>
        )
    }
});

$FW.DOMReady(function() {
    NativeBridge.setTitle('我的商城');
    ReactDOM.render(<User/>, document.getElementById('cnt'));
});

function backward() {
    $FW.Browser.inApp() ? NativeBridge.close() : location.href = '';
}