class RegisterContent extends React.Component{
    constructor(props) {

        super(props);
        this.state = {
            phonenumber: '',
            totleInvestYi:'',
            totleInvestWan:'',
            isShow:'none'
        };
    }
    componentDidMount(){
        $FW.getJSONP("https://fore.9888.cn/cms/api/dealstatis.php",(data)=>{
        })
        window.addEventListener('scroll', this.handleScroll.bind(this));
    }
    handleScroll(){
        if(document.body.scrollTop>400){
            this.setState({isShow:"block"})
        }else{
            this.setState({isShow:"none"})
        }
    }
    phonenumberHandler(e){
        this.setState({phonenumber: e.target.value});
    }
    registerHandler(){
        let phoneReg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
        if(this.state.phonenumber==""){
          $FW.Component.Toast("手机号不能为空")
        }else if(!phoneReg.test(this.state.phonenumber)){
            $FW.Component.Toast("手机号格式不正确")
        }
    }
    render(){
        let {phonenumber,totleInvestYi,totleInvestWan,isShow} = this.state;
        return <div className="aisidiContainer">
            <div className="aisidiTop"></div>
            <div className="banner">
                <img src="images/banner2@ldy.jpg" alt=""/>
            </div>
            <div className="registerForm clearfix">
                <div className="formBox">
                    <div className="topPic">
                    </div>
                    <div className="formContainer">
                        <div className="inputBox">
                            <input type="text" value={phonenumber} onChange={this.phonenumberHandler.bind(this)} className="inputs" placeholder="请输入您的手机号" name="mobile" maxLength="16"/>
                        </div>
                        <div className="inputBox">
                            <input type="text"  className="inputs" placeholder="请输入推荐人工场码" />
                        </div>
                        <div className="registerButton" onClick={this.registerHandler.bind(this)}>
                            立即注册
                        </div>
                        <div className="tips">
                            市场有风险，投资需谨慎
                        </div>
                    </div>
                </div>
                <div className="wrap">
                    已有账户？投资得礼包&nbsp;&nbsp;&nbsp;
                    <a href="/mpwap/top/index.do" className="wrapLink">返回首页</a>
                </div>
            </div>
            <div className="box2 clearfix">
                <div className="title"></div>
                <div className="contentbox">
                    <div className="line bottom">
                        <div className="c-left"></div>
                        <div className="c-right">
                            爱施德体系内优质分销商应收账款融资项目，安全透明
                        </div>
                    </div>
                    <div className="line">
                        <div className="c-lefts"></div>
                        <div className="c-right">
                            爱施德体系内优质分销商应收账款融资项目，安全透明
                        </div>
                    </div>
                </div>
            </div>
            <div className="box3 clearfix">
                <div className="box31">
                    <img src="images/top2@ldy.jpg"/>
                </div>
                <div className="box32">
                    <img src="images/pig@ldy.jpg"/>
                </div>
                <div className="box33">
                    <div className="box-left">
                        <div>用户投资金额</div>
                        <div className="data">
                            <span className="number">{totleInvestYi}</span>亿
                            <span className="number">{totleInvestWan}</span>万元
                        </div>
                    </div>
                    <div className="box-left">
                        <div>注册会员数量超过</div>
                        <div className="data">
                            <span className="number">{}</span>万人
                        </div>
                    </div>
                </div>
            </div>
            <div className="box4 clearfix">
                <div className="box42">
                    <div className="btm fl">
                        <div className="btm-img">
                            <img src="images/bottom1@ldy.jpg" alt=""/>
                        </div>
                        <div className="btm-text1">
                            上市公司
                        </div>
                        <div className="btm-text2">
                            中国信贷战略控股
                        </div>
                        <div className="btm-text3">
                            股票代码：08207.HK
                        </div>
                    </div>
                    <div className="btm fr">
                        <div className="btm-img">
                            <img src="images/bottom2@ldy-baoxian.jpg" alt=""/>
                        </div>
                        <div className="btm-text1">
                            上市公司
                        </div>
                        <div className="btm-text2">
                            中国信贷战略控股
                        </div>
                        <div className="btm-text3">
                            股票代码：08207.HK
                        </div>
                    </div>
                </div>
            </div>
            <div className="need">
                <div className="need-title">
                    <img src="images/need-title.jpg" alt=""/>
                </div>
                <div className="need-wrap clearfix">
                    <div className="need-icon need-icon1">
                        <img src="images/need-icon1.jpg" alt=""/>
                    </div>
                    <div className="need-tips">
                        如果您是爱施德体系内的优质分销商，提交融资申请，增加资金流动性，实现收益最大化。
                        <a href="javascript:void(0)" className="lend1">企业借款>></a>
                    </div>
                </div>
                <div className="need-wrap clearfix">
                    <div className="need-icon need-icon2">
                        <img src="images/need-icon2.jpg" alt=""/>
                    </div>
                    <div className="need-tips need-tips2">
                        短期资金周转，用身份证就能借款，500-10000额度，
                        <a href="https://jkentry.weshare.com.cn/regisiter.html?c=22500" className="lend1">
                            个人借款>></a>
                    </div>
                </div>
            </div>
            <div className="box5">
                <div className="shouye-foot">
                    <div className="foot-a clearfix">
                        <a href="javascript:window.location.href='https://www.9888.cn/top/index.do?pc=1'">PC首页</a>
                        <a href="javascript:window.location.href='https://bbs.9888.cn'">工友之家</a>
                        <a href="javascript:toAppLoad();">下载APP</a>
                        <a href="https://m.9888.cn/static/wap/about-us/index.html">关于我们</a>
                        <a href="https://m.9888.cn/static/wap/test-information-disclosure/index.html">信息披露</a>
                    </div>
                    <div className="copyRight clearfix">
                        ©2017 金融工场版权所有
                    </div>
                    <div className="copyRight-down">
                        北京凤凰信用管理有限公司
                    </div>
                </div>
            </div>
            <div className="foot" style={{display:isShow}}>
                <a href="#" className="btn-foot">立即领取新手礼包</a>
            </div>
        </div>
    }

};

$FW.DOMReady(function () {
    ReactDOM.render(<RegisterContent/>, CONTENT_NODE);
});
