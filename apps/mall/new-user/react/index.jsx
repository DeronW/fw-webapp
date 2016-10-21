'use strict';
const API_PATH = document.getElementById('api-path').value;

const User = React.createClass({
    render:function(){
        return (
           <div>
               <div className="header">
                   <a className="user-back-arrow"></a>
                   <span className="user-title">我的商城</span>
                   <span className="notification"></span>
                   <span className="news-tip"></span>
               </div>
               <div className="user-info">
                   <img className="profile-img" src="images/boy.jpg"/>
                   <div className="user-name">蓝月<span className="user-level"></span></div>
                   <div className="available-score">可用工分<span className="gongfeng">99858</span></div>
                   <a className="account-setting">账户设置</a>
               </div>
               <div className="product-status">
                   <div className="product-status-item">
                       <img src="images/icon-1.jpg"/>
                       <span className="status-name">待付款</span>
                       <span className="remind-circle">2</span>
                   </div>
                   <div className="product-status-item">
                       <img src="images/icon-2.jpg"/>
                       <span className="status-name">待发货</span>
                       <span className="remind-circle">2</span>
                   </div>
                   <div className="product-status-item">
                       <img src="images/icon-3.jpg"/>
                       <span className="status-name">待收货</span>
                       <span className="remind-circle">2</span>
                   </div>
                   <div className="product-status-item">
                       <img src="images/icon-4.jpg"/>
                       <span className="status-name">已完成</span>
                       <span className="remind-circle">2</span>
                   </div>
                   <div className="product-status-item">
                       <img src="images/icon-5.jpg"/>
                       <span className="status-name">全部订单</span>
                   </div>
               </div>
               <div className="user-personal-items">
                   <div className="personal-item">
                       <span className="item-name item-icon6">收货地址</span>
                       <span className="jump-arrow"></span>
                   </div>
                   <div className="personal-item">
                       <span className="item-name item-icon7">兑换券</span>
                       <span className="jump-arrow"></span>
                   </div>
                   <div className="personal-item">
                       <span className="item-name item-icon8">收货地址</span>
                       <span className="jump-arrow">已绑定</span>
                   </div>
               </div>
               <div className="icon-list">
                   <div className="list-box">
                       <img src="images/icon-9.jpg"/>
                       <span>抽奖记录</span>
                   </div>
                   <div className="list-box">
                       <img src="images/icon-10.jpg"/>
                       <span>我的评价</span>
                   </div>
                   <div className="list-box">
                       <img src="images/icon-11.jpg"/>
                       <span>足迹</span>
                   </div>
                   <div className="list-box">
                       <img src="images/icon-12.jpg"/>
                       <span>分享有礼</span>
                   </div>
                   <div className="list-box">
                       <img src="images/icon-13.jpg"/>
                       <span>在线客服</span>
                   </div>
                   <div className="list-box">
                       <img src="images/icon-14.jpg"/>
                       <span>帮助中心</span>
                   </div>
               </div>
           </div>
        )
    }
});



$FW.DOMReady(function() {
    NativeBridge.setTitle('订单详情');
    ReactDOM.render(<User/>, document.getElementById('cnt'));
});

function backward() {
    $FW.Browser.inApp() ? NativeBridge.close() : location.href = '';
}