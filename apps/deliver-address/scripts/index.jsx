'use strict';

const STATIC_PATH = document.getElementById('static-path').value;
const API_PATH = document.getElementById('api-path').value;

const DeliverAddress = React.createClass({
    getInitialState: function () {
        return {cur_index: 0}
    },
    clickHandler: function (id, index) {
        this.setState({
            address_id: id.address_id,
            cur_index: index
        });
    },
    render: function () {
        let _this = this;
        let productBizNo = $FW.Format.urlQuery().productBizNo;

        let address = function (i, index) {
            let link;
            if (!_this.props.preview) {
                link = "/order/confirm?address_id=" + i.address_id + "&productBizNo=" + productBizNo
            }
            return (
                <div key={index} className="address-panel"
                     onClick={function(){_this.clickHandler(i,index)}}
                     style={{background:"#fff url("+STATIC_PATH+"images/"+(index == _this.state.cur_index ? "checked-circle" :"check-circle")+".png) no-repeat 20px center"}}
                >
                    <a href={link}>
                        <div className="username">{i.username}</div>
                        <div className="phone">{i.phone}</div>
                        <div className="address">{i.address}</div>
                    </a>
                </div>
            )
        };

        let create_address;
        if (!this.props.preview) {
            create_address = (
                <div className="bottom-panel">
                    <a href="/delivery_address/create" className="create-address">+新建地址</a>
                </div>
            )
        }

        return (
            <div>
                <header className="header">
                    选择收货地址
                    <a href="#" className="btn-back"
                       style={{background:"url("+STATIC_PATH+"images/ico-blue-back.png) no-repeat 30px center"}}> </a>
                </header>
                <div className="address-list">
                    {this.props.address.map(address)}
                </div>
                {create_address}
            </div>
        )
    }
});


$FW.DOMReady(function () {
    $FW.Ajax({
        url: API_PATH + 'mall/api/member/v1/delivery_address.json',
        success: function (data) {
            let preview = $FW.Format.urlQuery().preview == 'true';
            ReactDOM.render(<DeliverAddress address={data.address_list} preview={preview}/>, document.getElementById('cnt'));
        }
    });

    NativeBridge.setTitle('我的收货地址');
});