$FW.DOMReady(function(){
	ReactDOM.render(<Header title={"提现"} back_handler={backward}/>, document.getElementById('header'));
});

function backward(){
    $FW.Browser.inApp() ? NativeBridge.close() : location.href = '/'
}


const Mask = React.createClass({
	render : function(){
		return (
			<div className="cang">
				<div className="masker"></div>
				<div className="taine">
					<div className="his">提示</div>
					<div className="fact">
						<div className="">
							<span className="acti">实际到账金额</span>
							<span className="san">¥33,000.00</span>
						</div>
						<div className="pot-a">
							<span className="iner">提现金额</span>
							<span className="zeor">¥3,003,000.00</span>
						</div>
						<div className="pot-b">
							<span className="iner">提现手续费</span>
							<span className="zeor">¥200.00</span>
						</div>
					</div>
					
					<div className="ton clearfix">
						<div className="xiaoqu">取消</div>
						<div className="ding">确定</div>
					</div>
					
				</div>
			</div>
		)
	}
})
ReactDOM.render(<Mask />,document.getElementById('masker'));


const Recruit = React.createClass({
	render : function(){
		return (
			<div className="stou clearfix">
				<div className="zhaoshang"><img className="ico-zhaoshang" src="images/ico-zhaoshang.jpg"/></div>
				<div className="wz">
					<div className="zh">招商银行</div>
					<div className="nz">6225********1726</div>
				</div>
				<div className="kuaijie"><img src="images/ico-kuaijie.png"/></div>
			</div>
		)
	}
})
ReactDOM.render(<Recruit />,document.getElementById('spet'));

const If = React.createClass({
	render : function(){
		return (
			<div className="txt-a">
				<div className="nin">如果您绑定的银行卡暂不支持手机一键支付请联系客服<a href="tel:400-6766-988" className="c-4aa1f9">400-6766-988</a></div>
				<div className="kx">可提现金额(元)：<span style={{fontSize: '38px',color: '#fd4d4c'}}>3,050.00</span></div>
			</div>
		)
	}
})
ReactDOM.render(<If />,document.getElementById('ts'));

const Jing = React.createClass({
	render : function(){
		return (
			<div className="kunag">
				<div className="ing">请输入提现金额</div>
			</div>
		)
	}
})
ReactDOM.render(<Jing />,document.getElementById('kt'));














const Greater = React.createClass({
	render : function(){
		return (
			<div className="modify">
				<div className="pure">
					<div className="xuanwu">120,000</div>
					<div className="choice"><div className="pleas">修改</div></div>
				</div>
				<div className="wire"></div>
				<div className="pure">
					<div className="xuanwu" style={{fontSize:'32px'}}>开户银行</div>
					<div className="choice"><div className="pleas" style={{color:'#555555'}}>请选择</div></div>
				</div>
			</div>
		)
	}
})
ReactDOM.render(<Greater />,document.getElementById('than'));

const Neg = React.createClass({
	render : function(){
		return (
			<div>
				<div className="slip clearfix"><a className="peno">忘记开户行？</a></div>
				<div className="qing clearfix">
					<div className="shyan">
						<div className="mzysq">请输入验证码</div>
					</div>
					<div className="miaoh" style={{background:'#d4d4d4'}}>120秒后重新获取</div>
				</div>
				<div className="songfa">已向您输入的手机号码 139****0234 发送短信验证码</div>
			</div>
		)
	}
})
ReactDOM.render(<Neg />,document.getElementById('forget'));























const Special = React.createClass({
	render : function(){
		return (
			<div>
				<div className="intex clearfix">
					<div className="yel">120,000</div>
					<div className="atler">修改</div>
				</div>
				
				<div className="qing clearfix">
					<div className="shyan">
						<div className="mzysq">请输入验证码</div>
					</div>
					<div className="miaoh">120秒后重新获取</div>
				</div>
				
				<div className="xt">提现</div>
				
			</div>
		)
	}
})
ReactDOM.render(<Special />,document.getElementById('bdtx'));

const Single = React.createClass({
	render : function(){
		return (
			<div>
				<div className="hsuo">提现说明</div>
				<div className="danbi">
					<div className="atpr"><img className="card-d" src="images/card-d.png"/><span className="online">充值后无投资提现将由第三方平台收取0.4%手续费。</span></div>
					<div className="atpr"><img className="card-d" src="images/card-d.png"/><span className="online">10万及以下提现，7*24小时实时到帐；10万元及以上，工作日9:00-17:00实时到帐，其余时间及节假日发起提现，顺延至下一工作日处理。</span></div>
					<div className="atpr"><img className="card-d" src="images/card-d.png"/><span className="online">单笔提现金额不低于10元。</span></div>
					<div className="atpr"><img className="card-d" src="images/card-d.png"/><span className="online">3个工作日之内到账。</span></div>
					<div className="atpr"><img className="card-d" src="images/card-d.png"/><span className="online">在双休日和法定节假日期间，也可申请提现。</span></div>
					<div className="atpr"><img className="card-d" src="images/card-d.png"/><span className="online">填写的提现信息不正确导致提现失败，由此产生的提现费用不予退还。</span></div>
				</div>
			</div>
		)
	}
})
ReactDOM.render(<Single />,document.getElementById('xtms'));








































































