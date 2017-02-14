const AddressPanel = React.createClass({
    getInitialState: function () {
        return {}
    },
    render: function () {
        var data = {
            address: this.props.address,
            cartFlag: this.props.cartFlag,
            prd: this.props.prd,
            buyNum: this.props.buyNum
        };
        return this.props.address ?
            <AddressPanel.List {...data} /> :
            <AddressPanel.New {...data}/>;
    }
});

AddressPanel.New = React.createClass({
    render: function () {
        let new_link = "/static/mall/user-deliver-address/index.html?cartFlag=" + this.props.cartFlag + "&prd=" +
            this.props.prd + "&buyNum=" + this.props.buyNum;
        return (
            <div className="new-adress">
                <a href={new_link}>收货地址
                    <div className="btn-new-address"></div>
                </a>
            </div>
        )
    }
});


AddressPanel.List = React.createClass({
    render: function () {
        let address = this.props.address;
        let address_list_link = "/static/mall/user-deliver-address/index.html?cartFlag=" + this.props.cartFlag + "&prd=" +
            this.props.prd + '&buyNum=' + this.props.buyNum + '&address_id=' + this.props.address.id;

        return (
            <div className="goods-adress">
                <div className="goods-adress-h">
                    收货地址
                </div>
                <div className="goods-address-cnt">
                    <a href={address_list_link}>
                        <div className="inf">
                            <div className="receiver">
                                <span>收货人：</span>
                                <span>{address.receiver}</span>
                            </div>
                            <div className="phone">{address.receiverPhone}</div>
                        </div>
                        <div className="detail">收货地址：{address.addressDetail}</div>
                    </a>
                </div>
            </div>
        )
    }
});
