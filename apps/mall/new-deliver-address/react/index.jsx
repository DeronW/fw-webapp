'use strict';

const API_PATH = document.getElementById('api-path').value;

var PROVINCES = [];

window.ADDRESS_DATA[0].forEach(function (prov) {
    PROVINCES.push({value: prov[0], name: prov[1]});
});


const AddrSelect = React.createClass({
    handleChange: function () {
        this.props.onUserSelect(this.refs.addrSelect.value);
    },
    render: function () {
        let option = (item, index) => <option key={index} value={item.value}>{item.name}</option>;
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
                            <option value='' className="select-item"> 请选择{this.props.addrCNTitle} </option>
                            {this.props.addrs.map(option)}
                        </select>
                    </div>
                </div>
            </li>
        );
    }
});

const CascadingAddressForm = React.createClass({
    getInitialState: function () {
        return {
            address: '',
            province: this.props.initProvSelectedValue,
            city: this.props.initCitySelectedValue,
            district: this.props.initDistSelectedValue
        };
    },
    handleUserProvSelect: function (province) {
        this.setState({
            province: province,
            city: 0,
            district: 0
        });
    },
    handleUserCitySelect: function (city) {
        this.setState({
            city: city,
            district: 0
        });
    },
    handleUserDistSelect: function (district) {
        this.setState({district: district}, this.setParentFormData);
    },

    setParentFormData: function () {
        let i, prov, address, city, dist;

        for (i = 0; i < ADDRESS_DATA[0].length; i++) {
            if (ADDRESS_DATA[0][i][0] == this.state.province) {
                prov = ADDRESS_DATA[0][i][1];
                break;
            }
        }

        for (i = 0; i < ADDRESS_DATA[this.state.province].length; i++) {
            if (ADDRESS_DATA[this.state.province][i][0] == this.state.city) {
                city = ADDRESS_DATA[this.state.province][i][1];
                break;
            }
        }

        for (i = 0; i < ADDRESS_DATA[this.state.city].length; i++) {
            if (ADDRESS_DATA[this.state.city][i][0] == this.state.district) {
                dist = ADDRESS_DATA[this.state.city][i][1];
                break;
            }
        }

        address = [prov, city, dist, this.state.address].join(' ');

        this.props.setFormData({address: address})
    },

    onChangeHandler: function (e) {
        this.setState({
            address: e.target.value
        }, this.setParentFormData);
    },

    getAddressArray: function (key) {
        var arr = [];
        window.ADDRESS_DATA[key].forEach(function (subArr) {
            arr.push({value: subArr[0], name: subArr[1]});
        });
        return arr;
    },

    //provinceChangeHandler: function (e) {
    //    console.log(e)
    //},

    render: function () {
        var newCities = (this.state.province != 0 ? this.getAddressArray(this.state.province) : []);
        var newDistricts = (this.state.city != 0 ? this.getAddressArray(this.state.city) : []);

        //let generateSelectPanel = function (addresses, value, changeHandler, title) {
        //
        //    let option = (item, index) => <option key={index} value={item.value}>{item.name}</option>;
        //
        //    return (
        //        <select className="select-31" value={value} onChange={changeHandler}>
        //            <option value=''> 请选择{title} </option>
        //            {addresses.map(option)}
        //        </select>
        //    )
        //}.bind(this);

        return (
            <ul>
                {/*{generateSelectPanel(PROVINCES, this.state.province, this.provinceChangeHandler, '省份')}*/}
                {/*{generateSelectPanel(newCities, this.state.city, this.provinceChangeHandler, '城市')}*/}
                {/*{generateSelectPanel(newDistricts, this.state.district, this.provinceChangeHandler, '地区')}*/}
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
                        <textarea className="text" onChange={this.onChangeHandler} placeholder="详细地址"
                                  value={this.state.address}>
                        </textarea>
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
                address: this.state.address,
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
    onDefaultChangeHandler: function (e) {
        this.setState({isDefault: !this.state.isDefault})
    },
    setFormData: function (data) {
        [
            'address'
        ].forEach((i) => {
            if (data[i]) this.setState({i: data[i]})
        });
        console.log(data)
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
                        setFormData={this.setFormData}
                        initProvSelectedValue={0}
                        initCitySelectedValue={0}
                        initDistSelectedValue={0}
                    />
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
    NativeBridge.setTitle('新建收货地址');
    ReactDOM.render(<Address />, document.getElementById('cnt'));
});