class TenMillionLoanInfo extends React.Component {
    constructor() {
        super()
        this.state = {
            sum: '',
            years: '',
            county: '',
            district: '',
            houseSize: '',
            allFilled: false
        }
    }

    componentDidUpdate() {
        if (this.state.sum != '请选择' && this.state.years != '请选择' && this.state.county != '请选择' && this.state.district != '' && this.state.houseSize != '') {
            if (this.state.allFilled != true)
                this.setState({ allFilled: true });
        }
    }

    handlerSum = (e) => {
        this.setState({
            sum: e.target.value
        })
    }

    handlerYears = (e) => {
        this.setState({
            years: e.target.value
        })
    }

    handlerCounty = (e) => {
        this.setState({
            county: e.target.value
        })
    }

    changeDistrict = (e) => {
        if (e.target.value.length <= 20) {
            this.setState({
                district: e.target.value
            })
        }
    }

    changeHouseSize = (e) => {
        if (e.target.value.length <= 4) {
            this.setState({
                houseSize: e.target.value
            })
        }
    }

    handlerInfo = () => {
        if (this.state.sum == '' || this.state.sum == '请选择') {
            $FW.Component.Toast("抵押金额不能为空");
        } else if (this.state.years == '' || this.state.years == '请选择') {
            $FW.Component.Toast("抵押年限不能为空");
        } else if (this.state.county == '' || this.state.county == '请选择') {
            $FW.Component.Toast("所在区县不能为空");
        } else if (this.state.district == '') {
            $FW.Component.Toast("小区名称不能为空");
        } else if (this.state.houseSize == '') {
            $FW.Component.Toast("建筑面积不能为空");
        } else if (this.state.houseSize == 0) {
            $FW.Component.Toast("建筑面积必须大于0");
        } else {
            $FW.Post(`${API_PATH}/api/public/v1/mortgage.json`, {
                mortgAmountRange: this.state.sum,
                mortgTimeLong: this.state.years,
                area: this.state.county,
                housingEstate: this.state.district,
                houseBuildArea: this.state.houseSize,
                province: '北京市',
                city: '北京市',
                phone: $FW.Format.urlQuery().phone,
                uid: $FW.Format.urlQuery().uid,
                token: $FW.Format.urlQuery().token,
                realName: '',
                sourceType: 3
            }).then(data => {
                location.href = '/static/loan/outside-mortgage-id-download/index.html';
            }, e => {
                $FW.Component.Toast(e.message);
            });
        }
    }

    render() {
        const SUM = ['请选择', '100万-200万', '200万-300万', '300万-400万', '400万-500万', '500万-1000万']
        const YEARS = ['请选择', '半年以下', '半年-1年', '1年-10年', '10年-25年', '25年以上']
        const COUNTY = ['请选择', '东城区', '西城区', '朝阳区', '海淀区', '丰台区', '石景山区', '门头沟区', '房山区', '大兴区', '通州区', '顺义区', '昌平区', '平谷区', '怀柔区', '密云县', '延庆县', '北京经济技术开发区', '北京周边']

        return (
            <div className="">
                <div className="banner">
                    <div className="title">北京地区</div>
                    <div className="text">房产抵押贷款</div>
                </div>
                <div className="list-area">
                    <div className="title">
                        抵押金融及年限
                    </div>

                    <div className="list">
                        <div className="li">
                            <div className="name-text">抵押金额</div>
                            <div className="input">
                                <select className="select" value={this.state.sum} onChange={this.handlerSum}>
                                    {
                                        SUM.map((data, index) => {
                                            return <option className="option" key={index} value={data}>{data}</option>
                                        })
                                    }
                                </select>
                            </div>
                        </div>
                        <div className="li">
                            <div className="name-text">抵押年限</div>
                            <div className="input">
                                <select className="select" value={this.state.years} onChange={this.handlerYears}>
                                    {
                                        YEARS.map((data, index) => {
                                            return <option key={index} value={data}>{data}</option>
                                        })
                                    }
                                </select>
                            </div>
                        </div>
                    </div>

                </div>

                <div className="list-area">
                    <div className="title">
                        抵押物信息
                    </div>

                    <div className="list">
                        <div className="li">
                            <div className="name-text">所在区县</div>
                            <div className="input">
                                <select className="select" value={this.state.county} onChange={this.handlerCounty}>
                                    {
                                        COUNTY.map((data, index) => {
                                            return <option key={index} value={data}>{data}</option>
                                        })
                                    }
                                </select>
                            </div>
                        </div>
                        <div className="li">
                            <div className="name-text">小区名称</div>
                            <div className="input">
                                <input className="text" type="text"
                                    placeholder="请输入"
                                    value={this.state.district}
                                    onChange={this.changeDistrict}
                                />
                            </div>
                        </div>
                        <div className="li">
                            <div className="name-text">建筑面积(㎡)</div>
                            <div className="input">
                                <input className="text" type="number"
                                    placeholder="请输入"
                                    value={this.state.houseSize}
                                    onChange={this.changeHouseSize}
                                />
                            </div>
                        </div>
                    </div>

                </div>

                <div className="btn-area">
                    <div className={this.state.allFilled ? "push-btn" : "push-btn-forbid"} onClick={this.handlerInfo}>
                        提交资料
                    </div>
                </div>

            </div>

        )
    }
}



$FW.DOMReady(function () {
    ReactDOM.render(<Header title={"放心花"} />, HEADER_NODE);
    ReactDOM.render(<TenMillionLoanInfo />, CONTENT_NODE)
});
