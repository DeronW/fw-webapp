'use strict';

const API_PATH = document.getElementById('api-path').value;

var PROVINCES = [];

window.ADDRESS_DATA[0].forEach(function(prov){
    PROVINCES.push({value:prov[0],name:prov[1]});
});

function getAddrsArrayById(key){
    var arr=[];
    window.ADDRESS_DATA[key].forEach(function(subArr){
        arr.push({value:subArr[0],name:subArr[1]});
    });
    return arr;
}

const AddrSelect = React.createClass({
    handleChange: function() {
        this.props.onUserSelect(this.refs.addrSelect.value);
    },
    render: function() {

        let option = (item, index) =>
            <option key={index}>{item.name}</option>;

        return (
            <li className="clearfix">
                <div className="fl b">
                    <div className="new-select-wp">
                        <select
                            className="select-31"
                            value={this.props.initSelectedValue}
                            ref="addrSelect"
                            onChange={this.handleChange}
                        >
                            <option value=''> 请选择{this.props.addrCNTitle} </option>
                            {this.props.addrs.map(option)}
                        </select>
                    </div>
                </div>
            </li>
        );
    }
});

const CascadingAddressForm = React.createClass({
    getInitialState: function() {
        return {
            provSelectedValue: this.props.initProvSelectedValue,
            citySelectedValue: this.props.initCitySelectedValue,
            distSelectedValue: this.props.initDistSelectedValue
        };
    },
    handleUserProvSelect: function(provSelectedValue) {
        this.setState({
            provSelectedValue: provSelectedValue,
            citySelectedValue: 0,
            distSelectedValue: 0
        });
    },
    handleUserCitySelect: function(citySelectedValue) {
        this.setState({
            citySelectedValue: citySelectedValue,
            distSelectedValue: 0
        });
    },
    handleUserDistSelect: function(distSelectedValue) {
        this.setState({
            distSelectedValue: distSelectedValue
        });
    },

    render: function() {
        var newCities = (this.state.provSelectedValue !=0 ? getAddrsArrayById(this.state.provSelectedValue) : []);
        var newDistricts = (this.state.citySelectedValue!=0 ? getAddrsArrayById(this.state.citySelectedValue) : []);
        return (
            <ul>
                <AddrSelect
                    addrs={PROVINCES}
                    initSelectedValue={this.state.provSelectedValue}
                    onUserSelect={this.handleUserProvSelect}
                    addrCNTitle={"省份"}
                />
                <AddrSelect
                    addrs={newCities}
                    initSelectedValue={this.state.citySelectedValue}
                    onUserSelect={this.handleUserCitySelect}
                    addrCNTitle={"城市"}
                />
                <AddrSelect
                    addrs={newDistricts}
                    initSelectedValue={this.state.distSelectedValue}
                    onUserSelect={this.handleUserDistSelect}
                    addrCNTitle={"地区"}
                />
                <li className="clearfix">
                    <div className="fl b">
                        <textarea id="address" name="address" className="text" placeholder="详细地址" required="" defaultValue={this.props.address}></textarea>
                    </div>
                </li>
            </ul>
        );
    }
});

const Address = React.createClass({
    getInitialState: function () {
        return {
            username: '',
            phone: '',
            address: '',
            province:'',
            city:'',
            district:'',
            isDefault: false
        }
    },
    saveHandler: function () {
        if (!this.state.username)
            return $FW.Component.Alert('请填写收货人姓名');
        if (!this.state.phone)
            return $FW.Component.Alert('请填写联系方式');
        if (!this.state.address)
            return $FW.Component.Alert('请填写收货地址');

        $FW.Ajax({
            url: API_PATH + 'mall/api/member/v1/delivery_address/create.json',
            method: 'post',
            data: {
                username: this.state.username,
                phone: this.state.phone,
                address: this.state.province + this.state.city + this.state.district + this.state.address,
                isDefault: this.state.isDefault
            },
            enable_loading: true,

            success: function (data) {
                var query = $FW.Format.urlQuery();
                // 需要判断页面来源, 如果从 "我的商城" 进入到这个页面, 怎要后退页面
                if (query.preview == 'true') {
                    if ($FW.Browser.inApp()) {
                        history.back()
                    } else {
                        location.href = '/delivery_address?preview=true';
                    }
                } else {
                    // 如果是从下单页面进入, 则需要回到下单页面或下单页的收获地址
                    var link;
                    if (data.address_count > 1) {
                        link = '/delivery_address?' + 'productBizNo=' + query.productBizNo + '&count=' + query.count;
                    } else {
                        link = '/order/confirm?address_id=' + data.address_id + '&productBizNo=' + query.productBizNo + '&count=' + query.count;
                    }
                    location.href = link
                }
            }
        })
    },
    onUsernameChangeHandler: function (e) {
        if (e.target.value.length < 50)
            this.setState({username: e.target.value})
    },
    onPhoneChangeHandler: function (e) {
        var v = e.target.value;
        if (v.length < 12 && !isNaN(v))
            this.setState({phone: e.target.value})
    },
    onAddressChangeHandler: function (e) {
        if (e.target.value.length < 100)
            this.setState({address: e.target.value})
    },
    onDefaultChangeHandler: function (e) {
        this.setState({isDefault: !this.state.isDefault})
    },
    render: function () {
        return (
            <div>
                {$FW.Browser.appVersion() >= $FW.AppVersion.show_header ? <Header title={'新建收货地址'}/> : null}
                <div className="new-deliver-address">
                    <div className="deliver-info">收货人信息：</div>
                    <div className="deliver input-div">
                        <input value={this.state.username} onChange={this.onUsernameChangeHandler} placeholder="收货人"/>
                    </div>
                    <div className="phone input-div">
                        <input value={this.state.phone} onChange={this.onPhoneChangeHandler} placeholder="联系方式"/>
                    </div>
                    <div className="deliver-info">详细收货地址：</div>
                    <CascadingAddressForm
                        address={''}
                        initProvSelectedValue={0}//初始选择0空，1北京，2天津等等
                        initCitySelectedValue={0}//初始选择城市0空
                        initDistSelectedValue={0}//初始选择区域0空
                    />
                    {/*<div className="address input-div">
                       <input value={this.state.address} onChange={this.onAddressChangeHandler} placeholder="详细地址"/>
                    </div>*/}
                    <div className={this.state.isDefault ? "default checked" : "default"}
                         onClick={this.onDefaultChangeHandler}> 设为默认
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
    NativeBridge.setTitle('新建收货地址');
});

window.onNativeMessageReceive = function (msg) {
    if (msg == 'history:back') location.href = '/deliver_address';
};
