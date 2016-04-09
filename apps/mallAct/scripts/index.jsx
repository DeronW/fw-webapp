'use strict';

const MallAct = React.createClass({
	render: function(){
		var productsList=this.props.productsActJson;
		var list=function(data, index){return <ProductItem data={data}  key={index} />}
		return (
			<div>
				<header className="header">
				{productsList.actProduct.actTitle}<a href="#" className="btn-back" style={{background:"url(../images/ico-blue-back.png) no-repeat 30px center"}}></a>
				</header>
				<a href="#" className="act-img-detail"><img src={productsList.actProduct.actimg} /></a>
				<ActExplain actExplain={productsList.actProduct.actExplain}/>
				<div className="products-act">
					<ul className="index-actList-list">						
						{							
							productsList.actProduct.products.map(list)
						}
						{alert(GetSearch())}
					</ul>
					
				</div>
						
			</div>	
		)
	}
});

const ActExplain = React.createClass({
	getInitialState: function () {
		
        return {onoff:true}
    },
    handleClick:function() {
    	this.setState({onoff: !this.state.onoff});
    },
	render: function(){		
		var actExplainContClass=this.state.onoff?"act-explain-cont":"act-explain-cont show";
		var actExplainBtn=this.state.onoff?"act-explain-btn":"act-explain-btn on";
		return(
			<div className="act-explain-box">
				<div className="act-explain-head">
					<div className="act-explain-h">{this.props.actExplain.title}</div>
					<div className={actExplainBtn} onClick={this.handleClick} style={{background:"url(../images/ico-grap-down.png) no-repeat center"}}></div>
				</div>
				<ul className={actExplainContClass}>
					{
						this.props.actExplain.cont.map(function(data){
									return (<li>{data}</li>)
								})
					}
				</ul>
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


var productsActJson={
	"success":true,
	"actProduct":{
		"actimg":"../images/act-banner3.jpg",
		"actTitle":"暖心礼活动",
		"actExplain":{
			"title":"活动说明",
			"cont":[
					"1、活动时间2.22—3.23；",
					"2、30日内累计投资满5W；",
					"3、活动期间内拉新人数大于5人；",
					"4、年化拉新投资大于10W。"
				]
			
		},
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

$FW.DOMReady(function () {
    $FW.BatchGet([
        'http://10.10.100.112/mockjs/4/api/v1/mall/banner',
        'http://10.10.100.112/mockjs/4/api/v1/mall/activities'
    ], function (data) {
		console.log(data)
    });
});

ReactDOM.render(<MallAct productsActJson={productsActJson} />, document.getElementById('cnt'));

function GetSearch() {
   var url = location.search; //获取url中"?"符后的字串   
   var theRequest = new Object();   
   if (url.indexOf("?") != -1) {   
      var str = url.substr(1);   
      strs = str.split("&");   
      for(var i = 0; i < strs.length; i ++) {   
         theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]);   
      }   
   }   
   return theRequest;   
}   
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

