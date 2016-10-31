'use strict';
const API_PATH = document.getElementById('api-path').value;

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
	let bankCards = this.props.bankCards;
	/*
	if(bankCards.cardName==''){}
	else if(bankCards.cardName){}
	else if(bankCards.cardName){}
	else{}*/
        return (
            <div className="my-bank-card">
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
        url: './bankCard.json',
        enable_loading: true,
        success: function (data) {
            ReactDOM.render(<MyBankCard bankCards={data.bankCards}/>, document.getElementById('cnt'));
        }
    });
});
