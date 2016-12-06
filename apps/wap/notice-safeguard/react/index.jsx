const NotSafeGuar =React.createClass({
    render: function () {
        var safeBox1=<div className="safe-box1"><img src="images/img1@safe.png"/></div>;
        var safeBox2=
            <div className="safe-box2">
                <div className="safe-h1">
                    <img src="./images/h1@safe.png"/></div>
                <ul className="safe-list1">
                    <li className="clearfix">
                        <div className="safe-img1">
                            <img src="./images/list11@safe.png"/></div>
                        <div className="safe-text1">
                            <div className="safe-t11">贷前机构评估</div>
                            <div className="safe-t12">以定性评估和定量评估对合作对象进行360°全方位审核。</div></div>
                    </li>
                    <li className="clearfix">
                        <div className="safe-img1">
                            <img src="./images/list12@safe.png"/></div>
                        <div className="safe-text1">
                            <div className="safe-t11">贷中担保机制</div>
                            <div className="safe-t12">平台引入第三方担保机制，担保每笔投资项目。</div></div>
                    </li>
                    <li className="clearfix">
                        <div className="safe-img1">
                            <img src="./images/list13@safe.png"/></div>
                        <div className="safe-text1">
                            <div className="safe-t11">贷后项目管理</div>
                            <div className="safe-t12">实行不定期电话回访、定期下户调查的全方位贷后跟踪管理。</div></div>
                    </li>
                </ul>
            </div>;
        var safeBox3=
            <div className="safe-box3">
            <div className="safe-h2"><img src="./images/h2@safe.png"/></div>
            <div className="safe-box31">
                <div className="safeBox31-t1">机构初审接入</div>
                <ul className="safeBox31-ul clearfix">
                    <li>
                        <div className="safeBox31-img"><img src="./images/list21@safe.png"/></div>
                        <div className="safeBox31-text">企业经营审核</div>
                    </li>
                    <li>
                        <div className="safeBox31-img"><img src="./images/list22@safe.png"/></div>
                        <div className="safeBox31-text">企业信用状况</div>
                    </li>
                    <li>
                        <div className="safeBox31-img"><img src="./images/list23@safe.png"/></div>
                        <div className="safeBox31-text">企业担保审核</div>
                    </li>
                </ul>
            </div>
            <div className="safe-box32">
                <div className="safeBox32-t1">平台复审上线</div>
                <ul className="safeBox32-ul clearfix">
                    <li>
                        <div className="safeBox32-img"><img src="./images/list31@safe.png"/></div>
                        <div className="safeBox32-text">信息复审</div>
                    </li>
                    <li>
                        <div className="safeBox32-img"><img src="./images/list32@safe.png"/></div>
                        <div className="safeBox32-text">审批管理</div>
                    </li>
                    <li>
                        <div className="safeBox32-img"><img src="./images/list33@safe.png"/></div>
                        <div className="safeBox32-text">贷后管理</div>
                    </li>
                </ul>
            </div>
        </div>;
        var safeBox4=
            <div className="safe-box4">
            <div className="safe-h3"><img src="./images/h3@safe.png"/></div>
            <div className="safe-box41">
                <ul className="safeBox41-ul clearfix">
                    <li>
                        <div className="safeBox41-img"><img src="./images/list41@safe.png"/></div>
                        <div className="safeBox41-text1">资金安全</div>
                        <div className="safeBox41-text2">签约徽商银行<br/>资金存管</div>
                    </li>
                    <li>
                        <div className="safeBox41-img"><img src="./images/list42@safe.png"/></div>
                        <div className="safeBox41-text1">信息安全</div>
                        <div className="safeBox41-text2">隐私信息MD5加密<br/>遵守法律规则</div>
                    </li>
                    <li>
                        <div className="safeBox41-img"><img src="./images/list43@safe.png"/></div>
                        <div className="safeBox41-text1">安全认证</div>
                        <div className="safeBox41-text2">网上交易保障<br/>中心平台认证</div>
                    </li>
                </ul>
            </div>
        </div>;

        return (
             <div className="container appRemoveHead safe">
                {safeBox1}{safeBox2}{safeBox3}{safeBox4}
             </div>
        );
    }
});

$FW.DOMReady(function () {
    ReactDOM.render(<NotSafeGuar/>, document.getElementById("cnt"));
});