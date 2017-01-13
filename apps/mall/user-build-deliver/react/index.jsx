const CascadingAddressForm = React.createClass({
    getInitialState: function () {

        var province_list = [];
        window.ADDRESS_DATA[0].forEach(function (prov) {
            province_list.push({value: prov[0], name: prov[1]});
        }.bind(this));


        return {
            address: '',
            province: this.props.initProvSelectedValue,
            city: this.props.initCitySelectedValue,
            district: this.props.initDistSelectedValue,

            province_list: province_list,
            city_list: [],
            district_list: []
        };
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

        address = [prov, city, dist, this.state.address].join('');

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

    provinceChangeHandler: function (e) {
        var province = e.target.value;
        var city_list = province == 'empty' ? [] : this.getAddressArray(province);
        this.setState({
            province: province,
            city: 'not_exist',
            city_list: city_list,
            district_list: []
        })
    },

    cityChangeHandler: function (e) {
        var city = e.target.value;
        this.setState({
            city: city,
            district_list: this.getAddressArray(city)
        })
    },

    districtChangeHandler: function (e) {
        var district = e.target.value;
        this.setState({
            district: district
        }, this.setParentFormData)
    },

    render: function () {
        let generateSelectPanel = function (addresses, value, changeHandler, title) {

            let option = (item, index) => <option key={index} value={item.value}>{item.name}</option>;

            return (
                <select className="select-31" value={value} onChange={changeHandler}>
                    <option value='empty'> 请选择{title} </option>
                    {addresses.map(option)}
                </select>
            )
        }.bind(this);

        return (
            <div>
                {generateSelectPanel(this.state.province_list, this.state.province, this.provinceChangeHandler, '省份')}
                {generateSelectPanel(this.state.city_list, this.state.city, this.cityChangeHandler, '城市')}
                {generateSelectPanel(this.state.district_list, this.state.district, this.districtChangeHandler, '地区')}
                <textarea className="text" onChange={this.onChangeHandler} placeholder="详细地址"
                          value={this.state.address}>
                </textarea>
            </div>
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
            url: `${API_PATH}mall/api/member/v1/delivery_address/create.json`,
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
                        location.href = '/static/mall/user-deliver-address/index.html?preview=true';
                    }
                } else {
                    // 如果是从下单页面进入, 则需要回到下单页面或下单页的收获地址
                    var link;
                    if (data.address_count > 1) {
                        link = '/static/mall/user-deliver-address/index.html?cartFlag='+ query.cartFlag + '&prd=' + query.prd + '&buyNum=' + query.buyNum;
                    } else {
                        link = '/static/mall/user-confirm/index.html?address_id=' + data.address_id + '&cartFlag=' + query.cartFlag + '&prd=' + query.prd + '&buyNum=' + query.buyNum;
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
            if (data[i]) {
                this.setState({address: data[i]})
            }
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
                        <input value={this.state.username} onChange={this.onUsernameChangeHandler} placeholder="收货人姓名"/>
                    </div>
                    <div className="phone input-div">
                        <input type="tel" value={this.state.phone} onChange={this.onPhoneChangeHandler} placeholder="手机号码"/>
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

    if ($FW.Utils.shouldShowHeader()) {
        ReactDOM.render(<Header title={"新建收货地址"} back_handler={back_handler}/>, document.getElementById('header'));
    }

    ReactDOM.render(<Address />, document.getElementById('cnt'));
});

function back_handler() {
        location.href = '/static/mall/order-deliver-address/index.html?preview=true'
}
