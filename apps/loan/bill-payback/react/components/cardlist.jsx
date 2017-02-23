const BankCardList = React.createClass({
    getInitialState: function () {
        return {
            checked: this.props.callbackIndex,
            bankName: this.props.bankName,
            bankNo: this.props.bankNo,
            cardGid: this.props.cardGid,
            cardType: this.props.cardType
        }
    },
    backHandler: function () {
        this.props.callbackPopHide(false);
    },
    confirmHandler: function () {
        this.props.callbackPopHide(false);
        this.props.callbackBankName(this.state.bankName);
        this.props.callbackBankNo(this.state.bankNo);
        this.props.callbackBankCardGid(this.state.cardGid);
        this.props.callbackGetBankIndex(this.state.checked);
        this.props.callbackGetBankType(this.state.cardType);
    },
    clickHandler: function (index) {
        this.setState({
            checked: index,
            bankName: this.props.bankList[index].bankShortName,
            bankNo: this.props.bankList[index].cardNo,
            cardGid: this.props.bankList[index].cardGid,
            cardType: this.props.bankList[index].cardType
        })
    },
    render: function () {
        function isDepositCard(ele) {
            return ele.cardType == 0;
        }
        let depositCardList = this.props.bankList.filter(isDepositCard);

        let list_item = (item, index) => {
            return (
                <div className="list-item" key={index} onClick={() => {
                    this.clickHandler(index)
                }}>
                    <img
                        src={item.logoUrl}/>
                    {item.bankShortName}({item.cardNo.slice(-4)})
                    {
                        this.state.checked == index ?
                            <div className="checked"></div> : null
                    }
                </div>
            )
        };
        return (
            <div className="bank-card-list">
                <div className="header">
                    <div className="arrow-left" onClick={this.backHandler}></div>
                    <div className="title">选择还款卡</div>
                    {this.props.bankList.length < 10 ?
                        <a className="history-bill" href='/static/loan/user-card-add/index.html'>添加</a> : null}
                </div>
                <div className="bank-branch-list">
                    {depositCardList.map(list_item)}
                </div>
                <div className="banklist-btn-wrap">
                    <div className="banklist-btn" onClick={this.confirmHandler}>确定</div>
                </div>
            </div>
        )
    }
});
