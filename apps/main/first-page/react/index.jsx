
const China = React.createClass({
	render : function(){
		return (
			<div className="shouyet b-fff clearfix border-b">
				<img src="images/ico-logo.png" className="ico-logo"/>
				<div className="shouye-t1 fr">
					<a href="login.html" className="shouye-dl fr">登录</a>
					<a href="#" className="shouye-zc fr">注册</a>
					<a href="#" className="shouye-app fr">下载APP</a>
				</div>
			</div>
		)
	}
});

ReactDOM.render(<China />,document.getElementById('head'));

const Change = React.createClass({
	render : function(){
		return (
			<div className="shouye-tou-wrap">
				<div className="swiper-container swiper1">
					<div className="swiper-wrapper">
						<div className="swiper-slide"><a href="#"><img src="images/play-img1.jpg" width="100%" /></a></div>
					</div>
					<div className="pagination pagination1"></div>
				</div>
				<div className="notice-box">
					<div className="notice clearfix">
						<div>维护公告：今日21:30分-22:30分将进行系统升级维护，届时主站将停止使用。</div>
					</div>
					<div className="notice-close">&nbsp;</div>
					<div className="notice-hide">&nbsp;</div>
				</div>
				<div className="zqzr-banner dis"><images src="img/zqzr-banner1@1.3.jpg"/></div>
				
				<ul className="shouye-tab border-b clearfix">
					<li className="shouye-tab1 shouye-act fl">
						<a href="#">
							<div className="shouye-text">最新投资</div>
						</a>
					</li>
					<li className="shouye-tab2 fl">
						<a  href="#">
							<div className="shouye-text">债权转让</div>
						</a>
					</li>
					<li className="shouye-tab4 fl">
						<a href="#">
							<div className="shouye-text">豆哥商城</div>
						</a>
					</li>
					<li className="shouye-tab3 fl">
						<a href="#">
							<div className="shouye-text rel">个人中心</div>
						</a>
					</li>
				</ul>
				<div className="zanwei-tab dis">&nbsp;</div>
			</div>
		)
	}
})
ReactDOM.render(<Change />,document.getElementById('tab'));

const List = React.createClass({
	render : function(){
		return (
			<div className="new-projects">
				<ul className="list-cont">
					<li className="">
						<a href="javascript:toPrdClaimsDetail(125540,2)">	
							<div className="list-h overdot">		
								<span>利随享8531</span>
								<em className="ico-danbao1"></em>
								<em className="ico-redgu"></em>
								<em className="ico-blueling"></em>
							</div>
							<div className="type">限时抢购</div>
							<div className="list-cont1">
								<span className="year-income">
									9.2
									<em>%</em>
								</span>
								<span className="time-long">6个月</span>
								<span className="sheng">剩0.1万</span>
							</div>
							<div className="list-cont2">
								<span className="qitou">100元起投</span>
								<span className="jiesuan-type">一次结清</span>
							</div>
						</a>
						
						<div>
							<a href=""></a>
							<div className="yuan-wrap">
								<div className="circle-progress">
									
									<div className="circle-inner-left">	
										<div className="circle-left"></div>
									</div>	
									<div className="circle-inner-right">
										<div className="circle-right"></div>
									</div>
								</div>
							</div>
						</div>
						
						<div className="text-touzi">投资</div>
						
					</li>
				</ul>
			</div>
		)
	}
});
ReactDOM.render(<List />,document.getElementById('list'));

const Load = React.createClass({
	render : function(){
		return (
			<div className="">
				<div className="shouye-foot">
					<div className="more">点击加载更多</div>
					<div className="foot-a">
						<a href="javascript:toWebVersion();">PC首页</a>
						<a href="javascript:toFamily();">工友之家</a>
						<a href="javascript:toAppLoad();">下载App</a>
						<a href="http://m.9888.cn:80/mpwap/about/aboutUs.shtml">关于我们</a>
					</div>
					<div className="copyRight">©2016 金融工场版权所有</div>
					<div className="copyRight-down">北京凤凰信用管理有限公司</div>
				</div>
			</div>
		)
	}
})
ReactDOM.render(<Load />,document.getElementById('bottom'));

const Flutter = React.createClass({
	render : function(){
		return (
			<div className="loadApp">
				<img src="images/ico-loadapp.png"/>
				<a className="btn-app"></a>
			</div>
		)
	}
})
ReactDOM.render(<Flutter />,document.getElementById('susp'));

const Top = React.createClass({
	render : function(){ 
		var style = {
			display: 'block'
		}
		return (
			<div className="top-computer">
				<div className="g-fly" style={style}>
					<img src="images/ico-top.png" />
				</div>
			</div>
		)
	}
})
ReactDOM.render(<Top />,document.getElementById('go'));




























































