'use strict';

const VipMsg = React.createClass({
	render: function() {
		return (
			<div className="vip-msg">
				<p className="text">您当前等级是<em className="c">VIP2</em>，可用工分 <em className="c">269562</em></p>
			</div>	
		);
	}		
});

const VipZone = React.createClass({
	getInitialState: function() {
		this.tabs = ['all', 'vipLevel0', 'vipLevel1', 'vipLevel2', 'vipLevel3', 'vipLevel4'];
		this.pageCount = 20;
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
			products: [],
			show:false
		}
	},
	handleTouchStart: function(event) {
		var _this = this;

		_this.setState({
			initialX: event.targetTouches[0].pageX	
		});

	},
	handleTouchMove: function(event) {
		var _this = this;

		_this.setState({
			x: _this.state.endX + (event.targetTouches[0].pageX - _this.state.initialX)
		});	

	},
	handleTouchEnd: function(event) {
		var _this = this;
		var objWidth = (window.innerWidth * 1.3) - window.innerWidth;

		_this.setState({
			endX: _this.state.x		
		});

		if(_this.state.x > 0) {
			_this.setState({
				x: 0,		
				endX: 0
			});
		} else if (-(_this.state.x) > objWidth ) {
			_this.setState({
				x: -(objWidth),		
				endX: -(objWidth)
			});
		} 

	},
	cntTouchStart: function(event) {
		var _this = this;

		_this.setState({
			cntInitialX: event.targetTouches[0].pageX	
		});
	},
	cntTouchMove: function(event) {
		var _this = this;

		_this.setState({
			cntX: _this.state.cntEndX + (event.targetTouches[0].pageX - _this.state.cntInitialX)
		});	
				  
	},
	cntTouchEnd: function() {
		var _this = this;
		var objWidth = (window.innerWidth * _this.state.n);
		var goldLine = window.innerWidth / 8; 

		_this.setState({
			cntEndX: _this.state.cntX		
		});

		if(_this.state.cntX > 0) {
			_this.setState({
				cntX: 0,
				cntEndX: 0		
			});
		} else if(-(_this.state.cntX) > goldLine) {
			console.log("goldLine");
			_this.setState({
				cntX: -(window.innerWidth * _this.state.counter),
				cntEndX: -(window.innerWidth * _this.state.counter), 
				counter: ++_this.state.counter
			});	
				
		} 
		
		if (-(_this.state.cntX) > window.innerWidth *  (_this.state.n -1)) {
			console.log("aaaaaa");
			_this.setState({
				cntX: -(window.innerWidth * (_this.state.n - 1)),	
				cntEndX: -(window.innerWidth * (_this.state.n - 1))	
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


	render: function() {
		var _this = this;

		let marginStyle = {
			marginLeft: _this.state.x + 'px'
		};
		
		let cntStyle = {
			width: window.innerWidth * _this.state.n + "px",
			marginLeft: _this.state.cntX + "px"
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

		let VipMsg = _this.state.show ? (<div className="vip-msg">
			<p className="text">您当前等级是<em className="c">VIP2</em>，可用工分 <em className="c">269562</em></p>
		</div>) : null;

		return (
			<div>
				{VipMsg}
				<div className="ui-tab" onTouchMove={_this.handleTouchMove} onTouchEnd={_this.handleTouchEnd} onTouchStart={_this.handleTouchStart}>
					<div className="ui-tab-block" style={marginStyle}>
						this.tabs.map(tab)}
					</div>
				</div>
				<div className="products-list">
					{ this.state.products.map((p, index) => <ProductItem {...p} key={index}/>) }
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
	virtual: [],
	reality: []
};

$FW.DOMReady(function(){
	NativeBridge.setTitle('VIP专区');
	if (!$FW.Browser.inApp())
		ReactDOM.render(<Header title={"VIP专区"} back_handler={backward}/>, document.getElementById('header'));
	ReactDOM.render(<VipZone/>, document.getElementById('cnt'));
});

function backward(){
	location.href = '/';
}

window.onNativeMessageReceive = function (msg) {
	if (msg == 'history:back') backward()
};