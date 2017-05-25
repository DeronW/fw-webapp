class TenMillionLoanInfo extends React.Component {
    constructor() {
        super()
        this.state = {
            financial: '',
            years: '',
            county: '',
            district: '',
            houseSize: ''
        }
    }

    handlerInfo () {
        if(this.state.financial == '') {
            $FW.Component.Toast("抵押金融不能为空");
        } else if(this.state.years == '') {
            $FW.Component.Toast("抵押年限不能为空");
        } else if(this.state.county == '') {
            $FW.Component.Toast("所在区县不能为空");
        } else if(this.state.district == '') {
            $FW.Component.Toast("小区名称不能为空");
        } else if(this.state.houseSize == '') {
            $FW.Component.Toast("建筑面积不能为空");
        } else {
            
        }
    }

    render() {
        return (
            <div className="">
                <div className="">
                    <div className="title">
                        抵押金融及年限
                    </div>

                    <div className="">
                        <div className="">
                            <div className="name-text">抵押金融</div>
                            <div className="input">
                                <input type="text" />
                            </div>
                        </div>
                        <div className="">
                            <div className="name-text">抵押年限</div>
                            <div className="input">
                                <input type="text" />
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
                                <input type="text" />
                            </div>
                        </div>
                        <div className="">
                            <div className="name-text">小区名称</div>
                            <div className="input">
                                <input type="text" />
                            </div>
                        </div>  
                        <div className="">
                            <div className="name-text">建筑面积</div>
                            <div className="input">
                                <input type="text" />
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