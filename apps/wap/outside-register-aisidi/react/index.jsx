const RegisterContent = React.createClass({
    render:function () {
        return <div className="aisidiContainer">
            <div className="aisidiTop"></div>
            <div className="banner"></div>
            <div className="registerForm">
                <div className="formBox">
                    <div className="topPic">
                    </div>
                    <div className="formContainer">
                        <div className="inputBox">
                            <input type="text"  className="inputs" placeholder="请输入您的手机号" />
                        </div>
                        <div className="inputBox">
                            <input type="text"  className="inputs" placeholder="请输入推荐人工场码" />
                        </div>
                        <div className="registerButton">
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
            <div className="box2">
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
            <div className="box3">
                <div className="box31">
                    <img src="images/top2@ldy.jpg"/>
                </div>
                <div className="box32">
                    <img src="images/pig@ldy.jpg"/>
                </div>
                <div className="box33">
                    <div className="box-left">
                        <div>用户投资金额</div>
                        <div>
                            <span className="number">11</span>亿
                            <span className="number">33333</span>万元
                        </div>
                    </div>
                    <div className="box-left">
                        <div>用户投资金额</div>
                        <div>
                            <span className="number">22</span>亿
                            <span className="number">33333</span>万元
                        </div>
                    </div>
                </div>
            </div>
            <div className="box4">
                <div className="box42">
                    <div className="btm fl">
                        <div className="btm-img">
                            <img src="images/bottom1@ldy.jpg" alt=""/>
                        </div>
                        <div className="btm-text1">
                            上市公司
                        </div>
                    </div>
                </div>
            </div>
        </div>
    }

});

$FW.DOMReady(function () {
    ReactDOM.render(<RegisterContent/>, CONTENT_NODE);
});
