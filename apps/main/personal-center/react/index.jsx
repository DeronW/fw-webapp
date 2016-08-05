$FW.DOMReady(function(){
	ReactDOM.render(<Header title={"个人中心"} back_handler={backward}/>, document.getElementById('header'));
});

function backward(){
    $FW.Browser.inApp() ? NativeBridge.close() : location.href = '/'
}


const Personal = React.createClass({
		render : function(){
			return (
				<div className="percbox clearfix">
					<div className="wrap">
						<div className="sign">
							<div className="pic-a"><img src="images/per-a.png"/></div>
							<div className="tack">签到</div>
						</div>
						<div className="stup">
							<div className=""><img src="images/per-c.png"/></div>
							<div className="tumt-a">
								<span className="cog">吕骑士</span>
								<span className=""><img className="per-d" src="images/per-d.png"/></span>
							</div>
							<div className="eif">84,200.00</div>
							<div className="cum">累计收益(元)</div>
						</div>
						<div className="dope">
							<div className="pic-a"><img src="images/per-b.png"/></div>
							<div className="inf">消息</div>
						</div>
					</div>
				</div>
			)
		}
	})
ReactDOM.render(<Personal  />,document.getElementById('banner'));

const Total = React.createClass({
	render : function(){
		return (
			<div className="ass">
				<div className="set clearfix">
					<div className="capl">
						<div className="os">169,800.00</div>
						<div className="zjc">总计资产(元)</div>
					</div>
					<div className="capct"><img className="per-e" src="images/per-e.png"/></div>
					<div className="capr">
						<div className="os">5,700.00</div>
						<div className="zjc">可用余额(元)</div>
					</div>
				</div>
			</div>
		)
	}
})
ReactDOM.render(<Total />,document.getElementById('tal'));

const Button = React.createClass({
	render : function(){
		return (
			<div className="inv">
				<div className="yhk">
					<div className="tips clearfix">
						<div className="sjl">银行卡已失效，升级银行存管账户重新激活</div>
						<div className="sjy"><img className="ran" src="images/card-a.png"/></div>
					</div>
					<div className="uton clearfix">
						<div className="post"><a href="" className="tx">提现</a></div>
						<div className="arge"><a href="" className="tx">充值</a></div>
					</div>
				</div>
			</div>
		)
	}
})
ReactDOM.render(<Button />,document.getElementById('but'));

const Mixed = React.createClass({
	render : function(){
		return (
			<div className="plwp">
				<div className="albedo">
					<div className="merc clearfix">
						<div className="car">
							<div className=""><img className="per-f" src="images/per-f.png"/></div>
							<div className="ztdx">徽商存管账户</div>
						</div>
						<div className="vem">
							<div className=""><img className="per-f" src="images/per-g.png"/></div>
							<div className="ztdx">我的投资</div>
						</div>
						<div className="pay">
							<div className=""><img className="per-f" src="images/per-h.png"/></div>
							<div className="hk">回款明细</div>
						</div>
					</div>
				</div>
				
				<div className="albedo">
					<div className="merc clearfix">
						<div className="car">
							<div className=""><img className="per-f" src="images/per-i.png"/></div>
							<div className="ztdx">邀请返利</div>
						</div>
						<div className="vem">
							<div className=""><img className="per-f" src="images/per-j.png"/></div>
							<div className="ztdx">用户等级</div>
						</div>
						<div className="pay">
							<div className=""><img className="per-f" src="images/per-k.png"/></div>
							<div className="hk">优惠劵</div>
						</div>
					</div>
				</div>
				
				<div className="albedo">
					<div className="merc clearfix">
						<div className="car">
							<div className=""><img className="per-f" src="images/per-l.png"/></div>
							<div className="ztdx">工分</div>
						</div>
						<div className="vem">
							<div className=""><img className="per-f" src="images/per-m.png"/></div>
							<div className="ztdx">工豆</div>
						</div>
						<div className="pay">
							<div className=""><img className="per-f" src="images/per-n.png"/></div>
							<div className="hk">工场码</div>
						</div>
					</div>
				</div>
				
				<div className="albedo">
					<div className="merc clearfix">
						<div className="car">
							<div className=""><img className="per-f" src="images/per-o.png"/></div>
							<div className="ztdx">红包</div>
						</div>
						<div className="vem">
							<div className=""><img className="per-f" src="images/per-p.png"/></div>
							<div className="ztdx">刮刮卡</div>
						</div>
					</div>
				</div>
				
			</div>	
		)
	}
})
ReactDOM.render(<Mixed />,document.getElementById('foot'));


































































