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
        var cardImg =
            r == "中国银行" ? "images/zg.png"
                : r == "工商银行" ? "images/gs.png"
                : r == "农业银行" ? "images/ny.png"
                : r == "建设银行" ? "images/js.png"
                : r == "平安银行" ? "images/pa.png"
                : r == "兴业银行" ? "images/xy.png"
                : r == "光大银行" ? "images/gd.png"
                : r == "浦发银行" ? "images/pf.png"
                : r == "华兴银行" ? "images/hx.png"
                : r == "北京银行" ? "images/bj.png"
                : r == "中信银行" ? "images/zx.png"
                : "images/gf.png";

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

function backward() {
    location.href = '/static/mall/user/index.html';
}

