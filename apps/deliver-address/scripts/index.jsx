'use strict';

const STATIC_PATH = document.getElementById('static-path').value;
const API_PATH = document.getElementById('api-path').value;

const DeliverAddress = React.createClass({
    getInitialState: function () {
        return {
            current: 1
        }
    },
    clickHandler: function (id) {
        this.setState({address_id: id})
    },
    render: function () {
        let _this = this;
        let address = function (i, index) {
            return (
                <div key={index} className={index == _this.state.cur_index ? "address-panel on" :"address-panel"}
                     onClick={function(){_this.clickHandler(i.id)}}
                >
                    <div className="username">{i.username}</div>
                    <div className="phone">{i.phone}</div>
                    <div className="address">{i.address}</div>
                </div>
            )
        };

        return (
            <div>
                {this.props.address.map(address)}
                <div className="bottom-panel">
                    <a className="create-address">新建收货地址</a>
                </div>
            </div>
        )
    }
});

$FW.DOMReady(function () {
    $FW.Ajax({
        url: API_PATH + 'mall/api/v1/delivery_address.json',
        success: function (data) {
            ReactDOM.render(<DeliverAddress address={data.deliveryAddress}/>, document.getElementById('cnt'));
        }
    })
});