'use strict';
const API_PATH = document.getElementById('api-path').value;

const ShoppingCart = React.createClass({
    render:function(){
        return (
           <div className="shopping-cart">
               <ShoppingItem/>
               <ShoppingItem/>
               <ShoppingItem/>
               <div className="calculation-bar">
                   <div className="all-chosen"><span className="total-unchecked-circle"></span>全选</div>
                   <div className="all-price">合计：<span className="total-price">¥2.199+22233320工分</span></div>
               </div>
               <div className="pay-bar">
                   <a className="pay-btn">结算</a>
               </div>
           </div>
        )
    }
});

const ShoppingItem = React.createClass({
    render:function(){
        return (
            <div className="shopping-item">
                <div className="checked-icon">
                    <span className="unchecked-circle"></span>
                </div>
                <div className="product-img"><img src="images/product.jpg"/></div>
                <div className="product-item">
                    <div className="product-info">
                        <div className="product-name">Apple / 苹果   iPad Air2 128G  WIFI 64g 金色</div>
                        <div className="product-price">¥2.199+22233320工分</div>
                        <div className="detail-num-change">
                            <div className="minus"></div>
                            <div className="input-num"></div>
                            <div className="plus"></div>
                        </div>
                    </div>
                </div>
                <div className="product-delete"></div>
            </div>
        )
    }
});

$FW.DOMReady(function () {
    NativeBridge.setTitle('购物车');
    if ($FW.Utils.shouldShowHeader())
        ReactDOM.render(<Header title={"购物车"} back_handler={backward}/>, document.getElementById('header'));
    ReactDOM.render(<ShoppingCart/>, document.getElementById('cnt'));
});

function backward() {
    $FW.Browser.inApp() ? NativeBridge.close() : location.href = '';
}