'use strict';

const HomePage = React.createClass({
	render: function(){
		return (
			<div>
				<header className="header">
				商品详情<a href="#" className="btn-back" style={{background:"url(../images/ico-blue-back.png) no-repeat 30px center"}}></a>
				</header>
				<Carousel titleImagesJson={detailJson.data.title_img}/>
				<ProductDesc detailJson={detailJson.data}/>

						
			</div>	
		)
	}
});
const Carousel = React.createClass({
	getInitialState: function () {
		return {cur_index: 0}
	},

	changeCurrentIndex: function (index) {
		this.setState({cur_index: index})
	},
	render: function () {
		var imageArray = this.props.titleImagesJson;
		var _this = this;
		var banner = function (dot, index) {
			return <div key={index} className={(_this.state.cur_index == index) ? "on" : ''}></div>
		};

		let ba = function (d, index) {
			return ( <div key={index}><a href="#"><img className="title" src={d}/></a></div> )
		};

		return (
			<div className="banner-carousel">
				<ReactSwipe wrapperClassName={'wrap'} auto={3000} speed={1000} callback={this.changeCurrentIndex}>
					{ imageArray.map(ba) }
				</ReactSwipe>
				<div className="points">
					{imageArray.map(banner)}
				</div>
			</div>
		);
	}
});

const ProductDesc = React.createClass({
	render: function () {
		var product = this.props.detailJson;
		var scoreSpan = (parseFloat(product.score)>0)?(<span className="score">&#43;{product.score}分</span>):"";
		return(
			<div className="product-desc">
				<div className="detail-inf">
					<div className="detail-inf-name">
						{product.name}
					</div>
					<div className="detail-inf-des">
						{product.subtitle}
					</div>
					<div className="detail-inf-price">
						<span className="money">&yen;</span>
						<span className="price">{formatNum(product.price)}</span>
						{
							scoreSpan
						}
					</div>
					<div className="detail-inf1">
						<div className="market-price"><span>市价：</span><span>&yen;{formatNum(product.market_price)}</span>
						</div>
						<div className="total"><span>累计销量</span><span>{product.sold}</span></div>
					</div>
					<div className="detail-inf1">
						<div className="market-price"><span>快递：</span><span>免运费</span>
						</div>
						<div className="total"><span>配送范围：</span><span>全国</span></div>
					</div>
				</div>
				<div className="detail-mark">
					<div>限购普一见</div><div>拉新5人</div><div>1111</div>
				</div>
				<div className="detail-explain">
					<div className="detail-explain-h">活动说明</div>
					<div className="detail-explain-cont">
						<p>1、活动时间2.22~3.23；</p>
						<p>2、30日内累计投资满5W；</p>
						<p>3、活动期间内拉新人数大于5人</p>
						<p>4、年化拉新投资大于10W。</p>
					</div>
				</div>
				<div className="detail-des">
					<p>商品展示的划横线价格为参考价，该价格可能是品牌专柜标价、商品吊牌价或由品牌供应商提供的正品零售价（如厂商指导价、建议零售价等）或该商品在京东平台上曾经展示过的销售价；由于地区、时间的差异性和市场行情波动，品牌专柜标价、商品吊牌价等可能会与您购物时展示的不一致，该价格仅供您参考。</p>
					<img src=""/>
				</div>
				<div className="detail-foot">
					<div className="detail-num-change">
						<div className="plus"></div><input type="text" value="0"/><div className="minus"></div>
					</div>
					<div className="stock-box">
						<span>库存</span><span className="stock">10000</span><span className="unit">件</span>
					</div>
					<div className="btn-buy btn-buy-dis">
						立即购买
					</div>
				</div>
			</div>
		);
		
	}
});

var detailJson={
	"ret": true,
	"code": 100000,
	"message": "获取成功",
	"ver": 1,
	"data": {
		"name": "戴深吸尘器",
		"subtitle": "聚宝盆来袭!3.28-3.30仅1990元",
		"price": 1990.00,
		"score": 200,
		"market_price": 3600,
		"sold": 1999,
		"mark": [
			"限购一件",
			"累投5万",
			"拉新5人"
		],
		"activity_desc": [
			"1.活动时间",
			"2.30日内投资满5万"
		],
		"inventory": 20,
		"title_img": [
			"../images/pro-img1.jpg",
			"../images/pro-img2.jpg",
			"../images/pro-img1.jpg",
			"../images/pro-img2.jpg",
			"../images/pro-img1.jpg",
		],
		"detail_img": [
			"../images/pro-img1.jpg",
			"../images/pro-img2.jpg",
		]
	}
}

ReactDOM.render(<HomePage detailJson={detailJson} />, document.getElementById('cnt'));
function formatNum(str){
	str += '';
	var newStr = "";
	var count = 0;			 
	if(str.indexOf(".")==-1){
	   for(var i=str.length-1;i>=0;i--){
	if(count % 3 == 0 && count != 0){
	   newStr = str.charAt(i) + "," + newStr;
	}else{
	   newStr = str.charAt(i) + newStr;
	}
	count++;
	   }
	   str = newStr + ".00";
	   return str
	}
	else
	{
		for(var i = str.indexOf(".")-1;i>=0;i--){
			if(count % 3 == 0 && count != 0){
			   newStr = str.charAt(i) + "," + newStr;
			}else{
			   newStr = str.charAt(i) + newStr;
			}
	    	count++;
	   }
	   str = newStr + (str + "00").substr((str + "00").indexOf("."),3);
	   return str
	}
}

