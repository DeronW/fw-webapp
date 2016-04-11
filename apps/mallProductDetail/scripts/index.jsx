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
		var scoreSpan = (parseFloat(product.score)>0)?(<span className="list-price-score">&#43;{product.score}分</span>):"";
		return(
			<div className="product-desc">
				<div className="list-name">{product.name}</div>
				<div className="subtitle-name">{product.subtitle}</div>
				<div className="list-price-box">
					<div className="list-price">
						<span className="list-price-mark">&yen;</span>
						<span className="list-price-num">{formatNum(product.price)}</span>
                        {
                            scoreSpan
                        }
					</div>
					<div className="list-sold">
						<span>累计销量 </span>
						<span>{product.sold}</span>
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

