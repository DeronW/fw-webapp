const Help = React.createClass({
    render: function () {
        //var data = $FW.Format.urlQuery();
        return (
            <div>
                <div className="help-wrap">
                    <div className="help-item">
                        <div className="item-title ask">问：豆哥商城的商品都是正品吗？</div>
                    </div>
                    <div className="help-item">
                        <div className="ans">答：</div>
                        <div className="item-title">豆哥商城销售商品均为正品。</div>
                    </div>
                </div>
                <div className="help-wrap">
                    <div className="help-item">
                        <div className="item-title ask">问：豆哥商城用什么快递？可以指定快递吗？</div>
                    </div>
                    <div className="help-item">
                        <div className="ans">答：</div>
                        <div className="item-title">根据供应商发货渠道不同采用不同快递，暂不支持指定快递。</div>
                    </div>
                </div>
                <div className="help-wrap">
                    <div className="help-item">
                        <div className="item-title ask">
                            问：我的包裹多长时间能送到？
                        </div>
                    </div>
                    <div className="help-item">
                        <div className="ans">答：</div>
                        <div className="item-title ask">
                            1、兑换的返现券实时到账；<br/>
                            2、豆哥周边礼品1-7个工作日发货；<br/>
                            3、其余礼品3-7个工作日发货；<br/>
                            4、节假日延期至下个工作日发货。
                        </div>
                    </div>
                </div>
                <div className="help-wrap">
                    <div className="help-item">
                        <div className="item-title ask">问：豆哥商城运费如何计算？</div>
                    </div>
                    <div className="help-item">
                        <div className="ans">答：</div>
                        <div className="item-title">豆哥商城全场免运费。</div>
                    </div>
                </div>
                <div className="help-wrap">
                    <div className="help-item">
                        <div className="item-title ask">问：订单生成后我需要在多长时间内支付货款？</div>
                    </div>
                    <div className="help-item">
                        <div className="ans">答：</div>
                        <div className="item-title">下单后我们会为您保留15分钟，为确保订单的有效性，需要您在15分钟内完成支付。</div>
                    </div>
                </div>
                <div className="help-wrap">
                    <div className="help-item">
                        <div className="item-title ask">问：多久能为我购买的商品索取发票？该怎么索取？</div>
                    </div>
                    <div className="help-item">
                        <div className="ans">答：</div>
                        <div className="item-title">
                            1、工分兑换、兑换券兑换商品不提供发票<br/>2、现金支付商品发票由豆哥商城提供。
                        </div>
                    </div>
                </div>
                <div className="help-wrap">
                    <div className="help-item">
                        <div className="item-title ask">问：豆哥商城商品是否支持退货？</div>
                    </div>
                    <div className="help-item">
                        <div className="ans">答：</div>
                        <div className="item-title">
                            1、工分兑换、兑换券兑换商品不支持退货；<br/>
                            2、虚拟类商品不支持退货；<br/>
                            3、现金支付商品如需退货，请联系工场客服处理。
                        </div>
                    </div>
                </div>
            </div>
        )
    }
});


$FW.DOMReady(function () {
    if ($FW.Utils.shouldShowHeader())
        ReactDOM.render(<Header title={"帮助中心"} back_handler={backward}/>, document.getElementById('header'));

    ReactDOM.render(<Help/>, document.getElementById('cnt'));
});

function backward() {
    $FW.Browser.inApp() ? NativeBridge.close() : location.href = '/static/mall/user/index.html';
}
