const bankName = ['工商银行','农业银行','中国银行','建设银行','平安银行','兴业银行','光大银行','浦发银行','华夏银行','北京银行','中信银行','广发银行'];

const MyBankCard = React.createClass({

    addCardHandler: function () {
        location.href = location.protocol + '//' + location.hostname + '/static/mall/add-bank-card/index.html'
    },

    render:function(){
        return (
          <div className="detail-box">
            <div onClick={this.addCardHandler} className="add_card" style={{zIndex:"10"}}></div>
            {this.props.bankCards.map((card) => <CardList bankCards={card}/>)}
          </div>
        )
    }
});

const CardList = React.createClass({
    render: function () {
    var bgColor='my-bank-card';
	let bankCards = this.props.bankCards;
	for(var j=0;j<12;j++){
	   if(bankCards.cardName==bankName[j]){
		   if(j==0||j==2||j==8){ bgColor = 'my-bank-card bankColor1'; }
		   else if(j==1){ bgColor = 'my-bank-card bankColor2'; }
		   else{bgColor = 'my-bank-card bankColor3';}
		}
	}
        return (
            <div className={bgColor}>
                <div className="bank-tit"><img src={bankCards.cardImg}/><span className="bank-name">{bankCards.cardName}</span><span className="bank-type">{bankCards.cardType}</span></div>
                <div className="bank-desc">
                    <div className="owner-name">{bankCards.ownerName}</div>
                    <div>{bankCards.cardNo}</div>
                </div>
             </div>
        );
    }
});

$FW.DOMReady(function() {
    NativeBridge.setTitle('我的银行卡');

    if ($FW.Utils.shouldShowHeader()) {
        ReactDOM.render(<Header title={"我的银行卡"}/>, document.getElementById('header'));
	}

    $FW.Ajax({
        url: '/mall/api/payment/v1/bank_card_list.json',
        enable_loading: true,
        success: function (data) {
            ReactDOM.render(<MyBankCard bankCards={data.bankCards}/>, document.getElementById('cnt'));
        }
    });
});
