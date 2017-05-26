class TenMillionLoanInfo extends React.Component {
    constructor() {
        super()
        this.state = {
            sum: '',
            years: '',
            county: '',
            district: '',
            houseSize: ''
        }
    }

    handlerSum (e) {        
        this.setState({
            sum: e.target.value    
        })
    }

    handlerYears(e) {
        this.setState({
            years: e.target.value    
        })  
    }

    handlerCounty(e) {
        this.setState({
            county: e.target.value    
        })         
    }

    changeDistrict (e) {
        this.setState({
            district: e.target.value
        })
    }

    changeHouseSize (e) {
        this.setState({
            houseSize: e.target.value
        })
    }


    handlerInfo () {
        if(this.state.sum == '' || this.state.sum == '请选择') {
            $FW.Component.Toast("抵押金额不能为空");
        } else if(this.state.years == '' || this.state.years == '请选择') {
            $FW.Component.Toast("抵押年限不能为空");
        } else if(this.state.county == '' || this.state.county == '请选择') {
            $FW.Component.Toast("所在区县不能为空");
        } else if(this.state.district == '') {
            $FW.Component.Toast("小区名称不能为空");
        } else if(this.state.houseSize == '') {
            $FW.Component.Toast("建筑面积不能为空");
        } else {
            $FXH.Post(`${API_PATH}/api/userBase/v1/register.json`, {
                    mortgAmountRange: this.state.sum,
                    mortgTimeLong: this.state.years,
                    area: this.state.county,
                    housingEstate: this.state.district,
                    houseBuildArea: this.state.houseSize,
                    province: '北京',
                    area: '北京',
                    phone: ''
                }).then(data => {
                    
                }, e => {
                    
                });
        }
    }

    render() {
        const SUM = ['请选择', '100万-200万', '200万-300万', '300万-400万', '400万-500万', '500万-1000万']
        const YEARS = ['请选择', '半年以下', '半年-1年', '1年-10年', '10年-25年' ,'25年以上']
        const COUNTY = ['请选择', '东城区', '西城区', '朝阳区', '海淀区', '丰台区', '石景山区', '门头沟区', '房山区', '大兴区', '通州区', '顺义区', '昌平区', '平谷区', '怀柔区', '密云县', '延庆县', '北京经济技术开发区', '北京周边' ]

        return (
            <div className="">
                <div className="">
                    <div className="title">
                        抵押金融及年限
                    </div>

                    <div className="">
                        <div className="">
                            <div className="name-text">抵押金额</div>
                            <div className="input">
                                <select value={ this.state.sum } onChange={ this.handlerSum.bind(this) }>
                                    {
                                        SUM.map((data, index) => {
                                            return <option key={ index } value={ data }>{ data }</option> 
                                        })
                                    }
                                </select>
                            </div>
                        </div>
                        <div className="">
                            <div className="name-text">抵押年限</div>
                            <div className="input">
                                <select value={ this.state.years } onChange={ this.handlerYears.bind(this) }>
                                    {
                                        YEARS.map((data, index) => {
                                            return <option key={ index } value={ data }>{ data }</option> 
                                        })
                                    }
                                </select>
                            </div>
                        </div>  
                    </div>
              
                </div>

                <div className="">
                    <div className="title">
                        抵押物信息
                    </div>

                    <div className="">
                        <div className="">
                            <div className="name-text">所在区县</div>
                            <div className="input">
                                <select value={ this.state.county } onChange={ this.handlerCounty.bind(this) }>
                                    {
                                        COUNTY.map((data, index) => {
                                            return <option key={ index } value={ data }>{ data }</option> 
                                        })
                                    }
                                </select>
                            </div>
                        </div>
                        <div className="">
                            <div className="name-text">小区名称</div>
                            <div className="input">
                                <input type="text" 
                                    value={ this.state.district }
                                    onChange ={ this.changeDistrict.bind(this) } 
                                />
                            </div>
                        </div>  
                        <div className="">
                            <div className="name-text">建筑面积</div>
                            <div className="input">
                                <input type="text" 
                                    value={ this.state.houseSize }
                                    onChange= { this.changeHouseSize.bind(this) }  
                                />
                            </div>
                        </div>                          
                    </div>
              
                </div>                

                <div className="push-btn" onClick={ this.handlerInfo.bind(this) }>
                    提交资料
                </div>
            </div>

        ) 
    }
}
$FW.DOMReady(function () {
    ReactDOM.render(<Header title={"申请千万贷款"} show_back={false} />, HEADER_NODE);
    ReactDOM.render(<TenMillionLoanInfo />, CONTENT_NODE)
});