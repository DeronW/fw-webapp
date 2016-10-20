'use strict';
const API_PATH = document.getElementById('api-path').value;

const ShoppingItem = React.createClass({
    render:function(){
        return (
            <div className="shopping-item">
                <div className="checked-icon">
                    <span className="unchecked-circle"></span>
                </div>
                <div className="product-item">
                    <div className="product-img"><img src="images/product-img.jpg"/></div>
                    <div className="product-info">
                        <div className="product-name">Apple / 苹果   iPad Air2 128G  WIFI 64g 金色</div>
                        <div className="product-price">¥2.199+22233320工分</div>
                        <div className="detail-num-change">
                            <div className={this.state.value > 1 ? "minus" : "minus gray"} onClick={this.changeMinus}></div>
                            <div className="input-num">
                                {this.state.value}
                            </div>
                            <div className={this.state.value < this.props.stock ? "plus" : "plus gray"}
                                 onClick={this.changePlus}></div>
                        </div>
                        <div className="product-delete"></div>
                    </div>
                </div>
            </div>
        )
    }
});

$FW.DOMReady(function () {
    NativeBridge.setTitle('购物车');
    if ($FW.Utils.shouldShowHeader())
        ReactDOM.render(<Header title={"购物车"} back_handler={backward}/>, document.getElementById('header'));
    $FW.Ajax({
        url: API_PATH + "",
        enable_loading: true,
        success: function (data) {

        }
    });
    ReactDOM.render(<ShoppingItem/>, document.getElementById('cnt'));
});

function backward() {
    $FW.Browser.inApp() ? NativeBridge.close() : location.href = '';
}