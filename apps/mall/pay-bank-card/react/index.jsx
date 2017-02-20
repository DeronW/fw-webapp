const bankName = ['工商银行', '农业银行', '中国银行', '建设银行', '平安银行', '兴业银行', '光大银行', '浦发银行', '华夏银行', '北京银行', '中信银行', '广发银行'];

const MyBankCard = React.createClass({

    addCardHandler: function () {
        location.href = location.protocol + '//' + location.hostname + '/static/mall/pay-add-card/index.html'
    },

    render: function () {
        return (
            <div className="detail-box">
                <div onClick={this.addCardHandler} className="add_card" style={{zIndex:"10"}}></div>
                {this.props.bankCards.map((card, index) => <CardList key={index} bankCard={card}/>)}
            </div>
        )
    }
});

const CardList = React.createClass({
    unBindCard: function (arg) {
        $FW.Ajax({
            url: `${API_PATH}/mall/api/payment/v1/forbidden_bank_card.json`,
            data: {
                accountNo: arg
            },
            enable_loading: 'mini'
        }).then(data => {
            location.reload()
        })
    },
    render: function () {
        let r = this.props.bankCard.bankName;
        var cardImg;

        switch (r) {
            case "中国银行":
                cardImg = "images/zg.png"
                break;
            case "工商银行":
                cardImg = "images/gs.png"
                break;
            case "农业银行":
                cardImg = "images/ny.png"
                break;
            case "建设银行":
                cardImg = "images/js.png"
                break;
            case "平安银行":
                cardImg = "images/pa.png"
                break;
            case "兴业银行":
                cardImg = "images/xy.png"
                break;
            case "光大银行":
                cardImg = "images/gd.png"
                break;
            case "浦发银行":
                cardImg = "images/pf.png"
                break;
            case "华兴银行":
                cardImg = "images/hx.png"
                break;
            case "北京银行":
                cardImg = "images/bj.png"
                break;
            case "中信银行":
                cardImg = "images/zx.png"
                break;
            case "广发银行":
                cardImg = "images/gf.png";
                break;
            default:
                cardImg = ""
        }

        var bgColor = 'my-bank-card bankColor1';
        let bankCard = this.props.bankCard;
        for (var j = 0; j < 12; j++) {
            if (bankCard.bankName == bankName[j]) {
                if (j == 0 || j == 2 || j == 8) {
                    bgColor = 'my-bank-card bankColor1';
                }
                else if (j == 1) {
                    bgColor = 'my-bank-card bankColor2';
                }
                else {
                    bgColor = 'my-bank-card bankColor3';
                }
            }
        }
        return (
            <div className={bgColor}>
                <div className="bank-tit"><img src={cardImg}/><span
                    className="bank-name">{bankCard.bankName}</span><span
                    className="bank-type">{bankCard.bankCardType}</span></div>
                <div className="bank-desc">
                    <div className="owner-name">{bankCard.accountName}</div>
                    <div>{bankCard.accountNo}</div>
                    <div className="unbind-btn" onClick={this.unBindCard.bind(this,bankCard.accountNo)}>解绑</div>
                </div>
            </div>
        );
    }
});

$FW.DOMReady(function () {

    ReactDOM.render(<Header title={"我的银行卡"} back_handler={back_handler}/>, HEADER_NODE);

    $FW.Ajax({
        url: `${API_PATH}/mall/api/payment/v1/bank_card_list.json`,
        enable_loading: 'mini'
    }).then(data => ReactDOM.render(<MyBankCard bankCards={data.bankCards}/>, CONTENT_NODE));
});

function back_handler() {
    location.href = '/static/mall/user/index.html';
}

