'use strict';
const API_PATH = document.getElementById('api-path').value;
const test_api = "http://10.105.6.76:8083/";

const VipMsg = React.createClass({
	getInitialState: function(){
		return {
			show:true,
			vipLevel:this.props.user_level,
			score:this.props.user_score
		}
	},
	closeHandler: function(){
		this.setState({show:false});
	},
	render: function() {
		let user_level_manifest;
		if(this.state.vipLevel == 1) user_level_manifest = "普通用户";
		if(this.state.vipLevel == 2) user_level_manifest = "VIP1";
		if(this.state.vipLevel == 3) user_level_manifest = "VIP2";
		if(this.state.vipLevel == 4) user_level_manifest = "VIP3";
		if(this.state.vipLevel == 5) user_level_manifest = "VIP4";
		return (
			<div className={this.state.show ? "vip-msg" : "hide"}>
				<p className="text">您当前等级是<em className="c">{user_level_manifest}</em>，可用工分<em className="c">{this.state.score}</em><span className="closeBtn" onClick={this.closeHandler}></span></p>
			</div>
		);
	}
});

const VipZone = React.createClass({
	getInitialState: function() {
		this.tabs = ['all', 'vipLevel0', 'vipLevel1', 'vipLevel2', 'vipLevel3', 'vipLevel4'];
		this.count = 20;
		return {
			n: 3,
			counter: 1,
			initialX: 0,
			cntInitialX: 0,
			endX: 0,
			cntEndX: 0,
			x: 0,
			cntX: 0,
			tab: 'all',
			page: {
				all: 1,
				vipLevel0: 1,
				vipLevel1: 1,
				vipLevel2: 1,
				vipLevel3: 1,
				vipLevel4: 1
			},
			products: []
		}
	},

	handleTouchStart: function(event) {
		this.setState({ initialX: event.targetTouches[0].pageX});
	},
	handleTouchMove: function(event) {
		this.setState({ x: this.state.endX + (event.targetTouches[0].pageX - this.state.initialX)});
	},
	handleTouchEnd: function(event) {
		var objWidth = (window.innerWidth * 1.3) - window.innerWidth;

		this.setState({ endX: this.state.x});

		if(this.state.x > 0) {
			this.setState({ x: 0, endX: 0});
		} else if (-(this.state.x) > objWidth ) {
			this.setState({
				x: -(objWidth),		
				endX: -(objWidth)
			});
		} 

	},

	tabClickHandler: function (tab) {
		this.setState({tab: tab, products: window.Products[tab]});
		if (window.Products[tab].length == 0) {
			setTimeout(function () {
				this.loadMoreProductHandler(null);
			}.bind(this), 500)
		}
	},

	loadMoreProductHandler: function (done) {
		let page = this.state.page[this.state.tab];
		if (page == 0) return; // 如果page=0 表示没有更多页内容可以加载了
		let is_Level;
		if (this.state.tab == 'all') {
			is_Level = -1
		} else if(this.state.tab == 'vipLevel0'){
			is_Level = 1
		}else if (this.state.tab == 'vipLevel1') {
			is_Level = 2
		} else if(this.state.tab == 'vipLevel2'){
			is_Level = 3
		} else if(this.state.tab == 'vipLevel3'){
			is_Level = 4
		} else if(this.state.tab == 'vipLevel4'){
			is_Level = 5
		}

		$FW.Ajax({
			//url: API_PATH + 'mall/api/index/v1/vip_list.json?count=' + this.pageCount + '&page=' + page + '&vipLevel=' + is_Level,
			url: test_api + 'mall/api/index/v1/vip_list.json?count=' + this.count + '&page=' + page + '&vipLevel=' + is_Level,
			enable_loading: true,
			success: function (data) {
				let tab;
				if (data.vipLevel == -1) {
					tab = 'all'
				} else if (data.vipLevel == 1) {
					tab = 'vipLevel0'
				} else if (data.vipLevel == 2) {
					tab = 'vipLevel1'
				} else if (data.vipLevel == 3) {
					tab = 'vipLevel2'
				} else if (data.vipLevel == 4) {
					tab = 'vipLevel3'
				} else if (data.vipLevel == 5) {
					tab = 'vipLevel4'
				} else {
					done && done();
					return;
				}

				window.Products[tab] = window.Products[tab].concat(data.products);
				let products = window.Products[this.state.tab];

				let new_page = this.state.page;
				new_page[this.state.tab] = new_page[this.state.tab] + 1;
				if (data.totalCount < 20) new_page[this.state.tab] = 0;
				this.setState({products: products, page: new_page});
				done && done();
			}.bind(this)
		});
	},

	componentDidMount: function () {
		this.loadMoreProductHandler(null);
		$FW.Event.touchBottom(this.loadMoreProductHandler);
	},

	render: function() {
		var _this = this;

		let marginStyle = {
			marginLeft: _this.state.x + 'px'
		};

		let windowWidth = {
			width: window.innerWidth
		};

		let tab = function (i) {
			let name = {
				all: '全部',
				vipLevel0: '普通会员',
				vipLevel1: 'vip1',
				vipLevel2: 'vip2',
				vipLevel3: 'vip3',
				vipLevel4: 'vip4',
			};
			return (
				<div key={i} className={i==_this.state.tab ? "ui-tab-li ui-select-li" : "ui-tab-li"}
					 onClick={function(){_this.tabClickHandler(i)}}>
					<span className="text">{name[i]}</span>
				</div>
			)
		};

		return (
			<div>
				<div className="ui-tab"
					 onTouchStart={_this.handleTouchStart}
					 onTouchMove={_this.handleTouchMove}
					 onTouchEnd={_this.handleTouchEnd}
				>
					<div className="ui-tab-block" style={marginStyle}>
						{this.tabs.map(tab)}
						<span className="tab-line"></span>
					</div>
				</div>
				<div className="products-list">
					{this.state.products.map((p, index) => <ProductItem {...p} key={index}/>) }
					{this.state.products.length == 0 && this.state.page[this.state.tab] == 0 ? <div className="empty-list">暂无商品</div> : null}
				</div>
		</div>
		);
	}		
});

const ProductItem = React.createClass({
	render: function () {
		var show_price = this.props.price != 0 || this.props.score == 0;
		var score = (parseFloat(this.props.score) > 0) ? (
			<span className="list-price-score">{show_price ? <span>&#43;</span> : null}{this.props.score}工分</span>) : null;
		var Angle = (this.props.angle_text) ? (<div className="list-label">{this.props.angle_text}</div>) : null;
		var cover_bg = 'url(' + (this.props.img || 'images/default-product.jpg') + ')';

		return (
			<a href={'/productDetail?bizNo=' + this.props.bizNo} className="index-actList-a">
				<div className="list-img" style={{backgroundImage: cover_bg}}></div>
				{Angle}
				<div className="list-name">{this.props.title}</div>
				<div className="list-mark">
					{ (this.props.tags || []).map((d, index) => <div key={index}>{d}</div>) }
				</div>
				<div className="list-price-box">
					<div className="list-price">
						{show_price ? <span className="list-price-mark">&yen;</span> : null}
						{show_price ? <span className="list-price-num">{$FW.Format.currency(this.props.price)}</span> : null}
						{ score }
					</div>
					<div className="list-sold">
						<span>累计销量 </span>
						<span>{this.props.sales}</span>
					</div>
				</div>
			</a>
		)
	}
});

window.Products = {
	all: [],
	vipLevel0: [],
	vipLevel1: [],
	vipLevel2: [],
	vipLevel3: [],
	vipLevel4: []
};

$FW.DOMReady(function(){
	NativeBridge.setTitle('VIP专区');

	if (!$FW.Browser.inApp())
		ReactDOM.render(<Header title={"VIP专区"} back_handler={backward}/>, document.getElementById('header'));

    $FW.Ajax({
		url:test_api + "mall/api/member/v1/user_level_points.json",
		enable_loading: true,
		success:function(data){
			if(data.loginOk){
				ReactDOM.render(<VipMsg user_level={data.vip_level} user_score={data.score}/>, document.getElementById('msg'));
			}
		}
	});
	ReactDOM.render(<VipZone/>, document.getElementById('cnt'));
});

function backward(){
	location.href = '/';
}

window.onNativeMessageReceive = function (msg) {
	if (msg == 'history:back') backward()
};