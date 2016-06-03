'use strict';

const API_PATH = document.getElementById('api-path').value;

const Fail = React.createClass({
    render: function () {
        let failText = "";
        let fail = this.props.failText;
        switch (fail) {
            case 1:
                failText = "库存不足（包含售罄、修改库存）";
                break;
            case 2:
                failText = "下单失败, 余额不足";
                break;
            case 3:
                failText = "下单失败, 该兑换券已被使用";
                break;
            case 4:
                failText = "下单失败, 超过限购数量";
                break;
            case 5:
                failText = "下单失败, 商品价格不符，请重新下单";
                break;
            case 6:
                failText = "下单失败, 商品已下架";
                break;
            case 7:
                failText = "下单失败, 仅限兑换券购买";
                break;
            case 8:
                failText = "账户已冻结";
                break;
            case 9:
                failText = "下单失败, 兑换券不存在（后台删除）";
                break;
            case 10:
                failText = "下单失败, 该商品仅限VIP2及以上等级购买";
                break;
            case 11:
                failText = "下单失败, 工分不足";
                break;
            default:
                failText = "交易失败";
        }
        return (
            <div>
                <div className="fail-img"><img src="images/ico-fail.png"/></div>
                <div className="fail-text">
                    { failText }
                </div>
            </div>
        )
    }
});

let failTextData = 10;

$FW.DOMReady(function () {
    ReactDOM.render(<Fail failText={failTextData}/>, document.getElementById('cnt'));
    NativeBridge.setTitle('交易失败');
});