'use strict';

const MallVip = React.createClass({
	getInitialState: function () {		
        return {close:true,tabOnIndex:0}
    },
    handleClickClose:function() {
    	this.setState({close:false});
    },
    handleClickTab:function(index) {
    	this.setState({tabOnIndex:index});
    },
    getTabClass:function(index){
    	return index==this.state.tabOnIndex?"on":"";
    },
    getTabContClass:function(index){
    	return index==this.state.tabOnIndex?"index-actList-list show":"index-actList-list";
    }
    
	render: function(){
		var productsList=this.props.vipJson.vip;
		var list=function(data, index){return <ProductItem data={data}  key={index} />};
		var vipBoxClass=this.state.close?"vip-box":"vip-box vip-box-close";		
		var that=this;
		return (
			<div>
				<header className="header">
				VIP专区<a href="#" className="btn-back" style={{background:"url(../images/ico-blue-back.png) no-repeat 30px center"}}></a>
				</header>
				<div className={vipBoxClass}>				
					<div className="vip-header">
						<div className="vip-tip">您当前等级是<span className="vip-tip-mylevel">{this.props.vipJson.mylevel}</span>，可购买该等级及以下等级商品！
							<div className="vip-tip-close" onClick={this.handleClickClose} style={{background:"url(../images/ico-gray-close.png) no-repeat center"}}></div>
						</div>
						<div className="vip-tab-box"><VipTab vip={vipJson} tabOnClass={tabOnClass}/></div>
					</div>
					<div className="vip-cont">
						{
							productsList.map(function(datavip){
								return (
									<ul className={ulShowClass}>
										{datavip.products.map(list)}
									</ul>
								)
							})														
						}
					</div>																							
				</div>
		
			</div>	
		)
	}
});
const VipTab = React.createClass({
	render: function(){
		var tabOnClass=this.props.tabOnClass;
		return (
			<ul className="vip-tab">
				{
					this.props.vip.vip.map(function(data) {
						return(
							<li onClick={that.handleClickTab} style={{background:"#fff url(../images/tab-gray-dot.png) no-repeat right 0"}}><span className={tabOnClass}>{data.title}</span></li>
							)
					})
				}	
			</ul>
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
});
var a1={
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
};

var vipJson={
	"success":true,
	"mylevel":"VIP2",
	"vip":[		
			{
				"title":"全部",
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
			{	"title":"VIP1",
				"products": [
					{	
						"label":"清",
						"name": "Apple / 苹果   iPad Air2  128G   WIFI 64g 玫瑰色",
						"price": "199900.000",
						"sold": 999,
						"ahref": "http://m.9888.cn/mpwap/",
						"img": "../images/pro-img1.jpg",
						"mark": ["vip1","限购2件"],
						"score": "999"
					},									
					{	
						"label":"清",
						"name": "product 22",
						"price": "900",
						"sold": 999,
						"ahref": "http://m.9888.cn/mpwap/",
						"img": "../images/pro-img3.jpg",
						"mark":  ["vip1","限购2件"],
						"score": 999
					}
				]
			},
			{
				"title":"VIP2",
				"products": [
					{	
						"label":"清",
						"name": "Apple / 苹果   iPad Air2  128G   WIFI 64g 玫瑰色",
						"price": "199900.000",
						"sold": 999,
						"ahref": "http://m.9888.cn/mpwap/",
						"img": "../images/pro-img1.jpg",
						"mark": ["vip2","限购2件"],
						"score": "999"
					},									
					{	
						"label":"清",
						"name": "product 22",
						"price": "900",
						"sold": 999,
						"ahref": "http://m.9888.cn/mpwap/",
						"img": "../images/pro-img3.jpg",
						"mark":  ["vip2","限购2件"],
						"score": 999
					}
				]
			},
			{	
				"title":"VIP3",
				"products": [
					{	
						"label":"清",
						"name": "Apple / 苹果   iPad Air2  128G   WIFI 64g 玫瑰色",
						"price": "199900.000",
						"sold": 999,
						"ahref": "http://m.9888.cn/mpwap/",
						"img": "../images/pro-img1.jpg",
						"mark": ["vip3","限购2件"],
						"score": "999"
					},									
					{	
						"label":"清",
						"name": "product 22",
						"price": "900",
						"sold": 999,
						"ahref": "http://m.9888.cn/mpwap/",
						"img": "../images/pro-img3.jpg",
						"mark":  ["vip3","限购2件"],
						"score": 999
					}
				]
			}
	]
}

ReactDOM.render(<MallVip vipJson={vipJson} />, document.getElementById('cnt'));
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

