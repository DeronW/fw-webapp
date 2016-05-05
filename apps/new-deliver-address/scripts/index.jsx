'use strict';

const STATIC_PATH = document.getElementById('static-path').value;
const API_PATH = document.getElementById('api-path').value;

const Address = React.createClass({
    getInitialState: function () {
        return {
            username: '',
            phone: '',
            address: '',
            isDefault: true
        }
    },
    saveHandler: function () {
        $FW.Ajax({
            url: API_PATH + 'mall/api/member/v1/delivery_address/create.json',
            method: 'post',
            data: {
                username: this.state.username,
                phone: this.state.phone,
                address: this.state.address,
                isDefault: this.state.isDefault
            },

            success: function (data) {
                var query = $FW.Format.urlQuery();
                location.href = '/order/confirm?address_id=' + data.address_id + '&productBizNo=' + query.productBizNo + '&count=' + query.count;
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
    onDefaultChangeHandler: function (e) {
        this.setState({isDefault: !this.state.isDefault})
    },
    render: function () {
        let setDefaultImg = this.state.isDefault ? "ico-set-default" : "ico-noset-default";
        return (
            <div>
                {$FW.Browser.inApp() ? null : <Header title={'创建收货地址'}/>}
                <div className="new-deliver-address">
                    <div className="deliver input-div"
                         style={{background:"#fff url("+STATIC_PATH+"images/ico-person.png) no-repeat 24px center"}}>
                        <input value={this.state.username} onChange={this.onUsernameChangeHandler} placeholder="收货人"/>
                    </div>
                    <div className="phone input-div"
                         style={{background:"#fff url("+STATIC_PATH+"images/ico-phone.png) no-repeat 27px center"}}>
                        <input value={this.state.phone} onChange={this.onPhoneChangeHandler} placeholder="联系方式"/>
                    </div>
                    <div className="address input-div"
                         style={{background:"#fff url("+STATIC_PATH+"images/ico-blue-location.png) no-repeat 26px center"}}>
                        <input value={this.state.address} onChange={this.onAddressChangeHandler} placeholder="详细地址"/>
                    </div>

                    <div className="default" onClick={this.onDefaultChangeHandler}
                         style={{background:"url("+STATIC_PATH+"images/"+setDefaultImg+".png) no-repeat 2px 1px"}}>
                        设为默认
                    </div>
                    <div className="btn">
                        <a onClick={this.saveHandler}>保存</a>
                    </div>
                </div>
            </div>
        )
    }
});

$FW.DOMReady(function () {
    ReactDOM.render(<Address />, document.getElementById('cnt'));
    NativeBridge.setTitle('创建收货地址');
});

window.onNativeMessageReceive = function (msg) {
    if (msg == 'history:back') location.href = '/deliver_address';
};