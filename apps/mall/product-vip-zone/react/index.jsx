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

const Cnt = React.createClass({
	getInitialState: function() {
		return {
			n: 3,
			counter: 1,
			initialX: 0,
			cntInitialX: 0,
			endX: 0,
			cntEndX: 0,
			x: 0,
			cntX: 0
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
		var objWidth = (window.innerWidth * 1.1) - window.innerWidth;

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

		return (
			<div className="content">
				<div className="ui-tab" onTouchMove={_this.handleTouchMove} onTouchEnd={_this.handleTouchEnd} onTouchStart={_this.handleTouchStart}>
					<div className="ui-tab-block" style={marginStyle}>
						<div className="ui-tab-li ui-select-li">
							<span className="text">全部</span>
						</div>
						<div className="ui-tab-li">
							<span className="text">vip1</span>
						</div>
						<div className="ui-tab-li">
							<span className="text">vip2</span>
						</div>
						<div className="ui-tab-li">
							<span className="text">vip3</span>
						</div>
						<div className="ui-tab-li">
							<span className="text">vip4</span>
						</div>
					</div>
				</div>

				<div className="vip-commodity-area">
					<div className="vip-commodity-area-list">
						<div className="ui-commodity-list" style={windowWidth} >
							<div className="li">
								<div className="l">
									<div className="img">
										<img src="" />
									</div>
								</div>

								<div className="r">
									<div className="ui-commodity-list-name">
										Apple / 苹果   iPad Air2  128G   WIFI 64g 金色		
									</div>

									<div className="ui-commodity-list-tag">
										<span className="tag-text">端午浓情</span>
										<span className="tag-text">端午浓情</span>
										<span className="tag-text">端午浓情</span>
									</div>

									<div className="ui-commodity-vip-msg">
										<div className="ui-commodity-vip-msg-wrap">
											<div className="mark-text">
												<span className="text">268700000工分</span>
											</div>

											<div className="sales-text">
												<span className="text">累计销量 1990000</span>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>

					</div>
				</div>
			</div>	
		);
	}		
}); 

const Body = React.createClass({
	render: function() {
		return (
			<div>
				<VipMsg />
				<Cnt />
			</div>	
		);
	}		
});

$FW.DOMReady(function(){
	NativeBridge.setTitle('VIP专区');
	if (!$FW.Browser.inApp())
		ReactDOM.render(<Header title={"VIP专区"} back_handler={backward}/>, document.getElementById('header'));





	ReactDOM.render(<Body/>, document.getElementById('cnt'));
});

function backward(){
	location.href = '/';
}

window.onNativeMessageReceive = function (msg) {
	if (msg == 'history:back') backward()
};