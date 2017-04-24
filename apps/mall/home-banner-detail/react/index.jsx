const BannerDetail = React.createClass({
	render: function () {
		let iOSApp = $FW.Browser.inApp() && $FW.Browser.inIOS();
		return (<div>
					<div className={iOSApp ? "head-images head-images-ios" : "head-images"}>
						{/*<img src="https://mmall.9888.cn/images/banner_20170412/1491965487785_.jpg"/>*/}
						<img src="images/cheat.jpg"/>
					</div>
					<div  className="display">
					<div>
					<h2>
					关于谎称豆哥商城供货商电话诈骗公告
					</h2>
					</div>

					<p className="notice">近期有个别客户反映，接到电话自称豆哥商城供货商，谎称商品质量有问题，主动给客户退钱退货事宜。请大家不要轻易相信，此类多是诈骗电话。</p>
					<p className="notice">豆哥保证豆哥商城全场正品行货，如有质量问题，退换货请主动联系豆哥商城官方客服人员。</p>
					<p className="notice">请大家提高警惕，谨防上当！</p>
					<div className="date">
						<span>豆哥商城</span>
						<p className="last-time">2017年4月10日</p>
					</div>
					</div>

				</div>)

	}
});


$FW.DOMReady(function () {
	ReactDOM.render(<Header title={"公告"}/>, HEADER_NODE);
	ReactDOM.render(<BannerDetail />, CONTENT_NODE);
});

