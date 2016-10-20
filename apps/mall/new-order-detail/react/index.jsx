'use strict';
const API_PATH = document.getElementById('api-path').value;

const OrderDetail = React.createClass({
    render : function(){
        return (
           <div>
               <div className="order-status">
                   <img src="images/order-cancel.png"/>
               </div>
               <div className="order-address">
                   <div className="goods-address-cnt">
                       <div className="address-wrap">
                           <div className="inf">
                               <div className="receiver">
                                   <span>收货人：兰越</span>
                                   <span></span>
                               </div>
                               <div className="phone">18210081213</div>
                           </div>
                           <div className="detail">收货地址：北京市西城区金融街街道宣武门西大街12 号金隅大厦1201室</div>
                       </div>
                   </div>
               </div>
               <div className="order-products">
                   <div className="pro-order">
                       <div className="list">
                           <img src="http://mmall.9888.cn/images/20161008/A0000002808_title1475895276116_M.jpg" className="list-img"/>
                               <div className="title">泉立方洗衣套装（含20ml去渍精华+泉立方纳米防串染色母片）</div>
                               <div className="mark"></div>
                               <div className="price-box"><span>31000工分</span><span className="num-modifyBox"><span class="num-quantity">×</span>1</span></div>
                       </div>
                       <div className="list">
                           <img src="http://mmall.9888.cn/images/20161008/A0000002808_title1475895276116_M.jpg" className="list-img"/>
                           <div className="title">泉立方洗衣套装（含20ml去渍精华+泉立方纳米防串染色母片）</div>
                           <div className="mark"></div>
                           <div className="price-box"><span>31000工分</span><span className="num-modifyBox"><span class="num-quantity">×</span>1</span></div>
                       </div>
                       <div className="total-box">
                           <div className="total-money"><span>合计：</span><span>31000工分</span></div>
                           <div className="total-text">共1件商品</div>
                       </div>
                   </div>
               </div>
               <div className="order-details">
                   <div className="order-number">
                       <div className="title">订单号：46611362006</div>
                       <div className="sequence">
                           <div className="sequence-text">
                               <span className="text">完成时间：</span>
                               <span className="time-text">2016-10-17 18:25:19</span></div>
                       </div>
                   </div>
               </div>
           </div>
        )
    }
});


$FW.DOMReady(function() {
    NativeBridge.setTitle('订单详情');
    if ($FW.Utils.shouldShowHeader())
        ReactDOM.render(<Header title={"订单详情"} back_handler={backward}/>, document.getElementById('header'));
    ReactDOM.render(<OrderDetail/>, document.getElementById('cnt'));
});

function backward() {
    $FW.Browser.inApp() ? NativeBridge.close() : location.href = '';
}