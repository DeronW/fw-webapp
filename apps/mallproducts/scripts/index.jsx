'use strict';

const MallProducts = React.createClass({
	render: function(){
		var productsList=this.props.productsJson;
		var list=function(data, index){return <ProductItem data={data}  key={index} />}
		return (
			<div>
				<header className="header">
				豆哥商品<a href="#" className="btn-back" style={{background:"url(../images/ico-blue-back.png) no-repeat 30px center"}}></a>
				</header>
				<TabProducts />
				<div className="products-list">
					<ul className="index-actList-list on">						
						{							
							productsList.all.products.map(list)
						}
					</ul>
					<ul className="index-actList-list">						
						{							
							productsList.realProduct.products.map(list)
						}
					</ul>
					<ul className="index-actList-list">						
						{							
							productsList.fictitiousProduct.products.map(list)
						}
					</ul>
				</div>
						
			</div>	
		)
	}
});
const TabProducts = React.createClass({
	render: function(){
		return(
			<div className="productsTab">
				<div className="productsTab1 act"><span>全部</span></div>
				<div className="productsTab2"><span>虚拟商品</span></div>
				<div className="productsTab3"><span>实物商品</span></div>
			</div>
		)
	}
});

const ProductItem = React.createClass({
	render: function(){
		var date2 = this.props.data;		
		var price = (parseFloat(date2.score)>0)?(<span className="list-price-score">&#43;{date2.score}分</span>):"";
		var Olabel=(date2.label)?(<div className="list-label">{date2.label}</div>):"";
		return (
			<li>
				<a href={date2.ahref} className="index-actList-a">									
					<div className="list-img"><img src={date2.img} /></div>
					{Olabel}
					<div className="list-name">{date2.name}</div>
					<div className="list-mark">
						{
							date2.mark.map(function(d){
								return (<div>{d}</div>)
							})
						}
					</div>
					<div className="list-price-box">
						<div className="list-price">
							<span className="list-price-mark">&yen;</span>
							<span className="list-price-num">{formatNum(date2.price)}</span>							
							{	
								price
							}	
						</div>
						<div className="list-sold">
							<span>累计销量 </span>
							<span>{date2.sold}</span>
						</div>
					</div>
				</a>
			</li>
		)
	}
})


var productsJson={
	"success":true,
	"all":{
		"products": [
			{	"label":"",
				"name": "product 11限购一件限购一件限购一件限购一件限购一件限人节人节人节人节人节人节人节购一件",
				"price": "19900",
				"sold": 999,
				"ahref": "http://m.9888.cn/mpwap/",
				"img": "../images/pro-img1.jpg",
				"mark":  ["限购一件","限购2件"],					
				"score": 999
				
			},				
			{	"label":"愚",
				"name": "product 12",
				"price": "199900.0000",
				"sold": 999,
				"ahref": "http://m.9888.cn/mpwap/",
				"img": "../images/pro-img2.jpg",
				"mark": ["限购一件","限购2件"],
				"score": 0
			},
			{
				"label":"清",
				"name": "Apple / 苹果   iPad Air2  128G   WIFI 64g 玫瑰色",
				"price": "199900.000",
				"sold": 999,
				"ahref": "http://m.9888.cn/mpwap/",
				"img": "../images/pro-img1.jpg",
				"mark": ["限购一件","限购2件"],
				"score": "999"
			},				
				
			{	
				"label":"清",
				"name": "product 22",
				"price": "900",
				"sold": 999,
				"ahref": "http://m.9888.cn/mpwap/",
				"img": "../images/pro-img3.jpg",
				"mark":  ["限购一件","限购2件"],
				"score": 999
			}
		]
	},
	"realProduct":{
		"products": [
				{	
					"label":"清",
					"name": "Apple / 苹果   iPad Air2  128G   WIFI 64g 玫瑰色",
					"price": "199900.000",
					"sold": 999,
					"ahref": "http://m.9888.cn/mpwap/",
					"img": "../images/pro-img1.jpg",
					"mark": ["限购一件","限购2件"],
					"score": "999"
				},									
				{	
					"label":"清",
					"name": "product 22",
					"price": "900",
					"sold": 999,
					"ahref": "http://m.9888.cn/mpwap/",
					"img": "../images/pro-img3.jpg",
					"mark":  ["限购一件","限购2件"],
					"score": 999
				}
			]
	},
	"fictitiousProduct":{
		"products": [
				{	
					"label":"清",
					"name": "Apple / 苹果   iPad Air2  128G   WIFI 64g 玫瑰色",
					"price": "199900.000",
					"sold": 999,
					"ahref": "http://m.9888.cn/mpwap/",
					"img": "../images/pro-img1.jpg",
					"mark": ["限购一件","限购2件"],
					"score": "999"
				},									
				{	
					"label":"清",
					"name": "product 22",
					"price": "900",
					"sold": 999,
					"ahref": "http://m.9888.cn/mpwap/",
					"img": "../images/pro-img3.jpg",
					"mark":  ["限购一件","限购2件"],
					"score": 999
				}
			]
	}
}

ReactDOM.render(<MallProducts productsJson={productsJson} />, document.getElementById('cnt'));
function formatNum(str){
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

