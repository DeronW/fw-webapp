
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
})
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
							</div>
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


































































