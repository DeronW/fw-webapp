const bankName = ['工商银行', '农业银行', '中国银行', '建设银行', '平安银行', '兴业银行', '光大银行', '浦发银行', '华夏银行', '北京银行', '中信银行', '广发银行'];

const MyBankCard = React.createClass({

    addCardHandler: function () {
        location.href = location.protocol + '//' + location.hostname + '/static/mall/pay-add-card/index.html'
    },
    componentDidMount: function () {
        if ($FW.Browser.inIOS())
            document.querySelector(".add_card").style.top = '22px';
    },
    render: function () {
        return (
            <div className="detail-box">
                <div onClick={this.addCardHandler} className="add_card" style={{zIndex:"10"}}></div>
                {this.props.bankCards ? this.props.bankCards.map((card, index) => <CardList key={index}
                                                                                            bankCard={card}/>) : null
                }
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
                cardImg = "images/zg.jpg"
                break;
            case "工商银行":
                cardImg = "images/gs.jpg"
                break;
            case "农业银行":
                cardImg = "images/ny.jpg"
                break;
            case "建设银行":
                cardImg = "images/js.jpg"
                break;
            case "平安银行":
                cardImg = "images/pa.jpg"
                break;
            case "兴业银行":
                cardImg = "images/xy.jpg"
                break;
            case "光大银行":
                cardImg = "images/gd.jpg"
                break;
            case "浦发银行":
                cardImg = "images/pf.jpg"
                break;
            case "华兴银行":
                cardImg = "images/hx.jpg"
                break;
            case "北京银行":
                cardImg = "images/bj.jpg"
                break;
            case "中信银行":
                cardImg = "images/zx.jpg"
                break;
            case "广发银行":
                cardImg = "images/gf.jpg";
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
                    className="bank-type">{/*{bankCard.bankCardType}*/}储蓄卡</span>
                </div>
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

