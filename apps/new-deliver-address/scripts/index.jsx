'use strict';

const STATIC_PATH = document.getElementById('static-path').value;
const API_PATH = document.getElementById('api-path').value;

const Address = React.createClass({
    getInitialState: function () {
        return {
            username: '',
            phone: '',
            address: '',
            default: false
        }
    },
    saveHandler: function () {
        $FW.Ajax({
            url: API_PATH + 'mall/api/v1/delivery_address/create.json',
            method: 'post',
            data: {
                username: this.state.username,
                phone: this.state.phone,
                address: this.state.address,
                default: this.state.default
            },
            success: function (d) {
            }
        })
    },
    onUsernameChangeHandler: function (e) {
        this.setState({username: e.target.value})
    },
    onPhoneChangeHandler: function (e) {
        this.setState({phone: e.target.value})
    },
    onAddressChangeHandler: function (e) {
        this.setState({address: e.target.value})
    },
    render: function () {
        return (
            <div>
                <div>
                    <input value={this.state.username} onChange={this.onUsernameChangeHandler} placeholder="收货人"/>
                </div>
                <div>
                    <input value={this.state.phone} onChange={this.onPhoneChangeHandler} placeholder="联系方式"/>
                </div>
                <div>
                    <input value={this.state.address} onChange={this.onAddressChangeHandler} placeholder="详细地址"/>
                </div>

                <div>
                    {this.state.default ? 'default' : 'not default'}
                </div>
                <div>
                    <a onClick={this.saveHandler}>save</a>
                </div>
            </div>
        )
    }
});

$FW.DOMReady(function () {
    ReactDOM.render(<Address />, document.getElementById('cnt'));
});