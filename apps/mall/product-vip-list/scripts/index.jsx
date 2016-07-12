'use strict';

const API_PATH = document.getElementById('api-path').value;

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
			page: 1,
			count: 5,	
			data: [] 
		};
	},
	render: function() {
		var data = this.props.products;

		var tags = (value, index) => (
			<span className="tag-text" key={index}>{value}</span>
		);

		var listDom = (value, index) => (
			<div className="ui-commodity-list" key={index}>
				<div className="li">
					<div className="l">
						<div className="img">
							<img src={value.img} />
						</div>
					</div>

					<div className="r">
						<div className="ui-commodity-list-name">
							{value.title}	
						</div>

						<div className="ui-commodity-list-tag">
							{
								data[index].tags.map(tags)	
							}
						</div>

						<div className="ui-commodity-vip-msg">
							<div className="mark-text">
								<span className="text">{value.score}工分</span>	
							</div>

							<div className="sales-text">
								<span className="text">累计销量 {value.sales}</span>
							</div>
						</div>
					</div>
				</div>

			</div>
		);

		return (
			<div className="content">
				<div className="ui-tab">
					<div className="ui-tab-block">
						<div className="ui-tab-li ui-select-li">
							<span className="text">全部</span>
						</div>
					</div>
				</div>

				<div className="vip-commodity-area">
					<div className="ui-commodity-list">
						{
							data.map(listDom)
						}
					</div>
				</div>
			</div>	
		);
	}		
}); 

const Body = React.createClass({
	getInitialState: function(){
		return {
			vip_level: 1,
			products: [],
			level_1_page: 1,
			level_2_page: 3,
			page: 1,
			count: 20
		}
	},
	loadMoreProductHandler: function(){
		var _this = this;
	
		$FW.Ajax({
			//url: API_PATH + 'mall/api/index/v1/vip_all_list.json',
			url: 'http://10.105.6.76:8083/mall/api/index/v1/vip_all_list.json?page=' + _this.state.page + '&count=' + _this.state.count,
			success: function(data) {
				 _this.setState({
				 	page: ++_this.state.page,
				 	products: _this.state.products.concat(data.products)
				 });
			}
		});
	},
	componentDidMount: function(){
		this.loadMoreProductHandler();		

        $FW.Event.touchBottom(this.loadMoreProductHandler);
	},
	render: function() {
		return (
			<div>
				<VipMsg />
				<Cnt  products={this.state.products}/>
			</div>	
		);
	}		
});

$FW.DOMReady(function(){
	NativeBridge.setTitle('VIP专区');
	if (!$FW.Browser.inApp())
		ReactDOM.render(<Header title={"VIP专区"} back_handler={back_handler}/>, document.getElementById('header'));
	ReactDOM.render(<Body/>, document.getElementById('cnt'));
});

function back_handler() {
	if ($FW.Format.urlQuery().preview == 'true' && !$FW.Browser.inApp()) {
		location.href = '/user'
	} else {
		history.back();
	}
}

