'use strict';

const STATIC_PATH = document.getElementById('static-path').value;
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
                failText = "余额不足";
                break;
            case 3:
                failText = "该兑换券已被使用";
                break;
            case 4:
                failText = "超过限购数量";
                break;
            case 5:
                failText = "商品价格不符，请重新下单";
                break;
            case 6:
                failText = "商品已下架";
                break;
            case 7:
                failText = "仅限兑换券购买";
                break;
            case 8:
                failText = "账户已冻结";
                break;
            case 9:
                failText = "兑换券不存在（后台删除）";
                break;
            case 10:
                failText = "该商品仅限VIP2及以上等级购买";
                break;
            case 11:
                failText = "工分不足";
                break;
            default:
                failText = "交易失败";
        }
        return (
            <div>
                <header className="header"> 交易失败
                    <a href="#" className="btn-back"
                       style={{background:"url("+STATIC_PATH+"images/ico-blue-back.png) no-repeat 30px center"}}> </a>
                </header>
                <div className="fail-img"><img src="../images/ico-fail.png"/></div>
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
    NativeBridge.setTitle('加载失败');
});