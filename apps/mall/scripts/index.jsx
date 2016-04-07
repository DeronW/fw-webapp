'use strict';

const HomePage = React.createClass({
	render: function(){
		return (
			<div>
				<header className="header">
				豆哥商城
				</header>
				<Carousel bannerJson={proIndexJson}/>
				<Nav />				
				<div className="index-actList-wrap">
				{proIndexJson.cont.map(function(i, index){		
					return <ActivityProduct indexProList={i} key={index} />
				})}
				</div>							
			</div>	
		)
	}
});

const ActivityProduct = React.createClass({
	render: function(){
		var products = this.props.indexProList.products;		
		return (
			<div className="index-actList-box">
				<TextBar title={this.props.indexProList.title} link={this.props.indexProList.morehref} />
				<ActBanner actimg={this.props.indexProList.actimg} link={this.props.indexProList.morehref} />				
				<ul  className="index-actList-list">
					{
						products.map(function(data, index){
						return <ProductItem data={data} key={index} />
						})
					}
				</ul>
			</div>
		)
	}
})
const ActBanner = React.createClass({
	render: function(){
		return (
			<div className="index-actList-img">
				<a href={this.props.link}><img src={this.props.actimg} /></a>
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
    	var bannerArr=this.props.bannerJson.banner;
    	var _this = this;    	
    	var banner = function(dot, index){
						return <div className={(_this.state.cur_index == dot.bannerIndex) ? "on" : ''}></div>
		}    	
        return (
            <div className="banner-carousel">
                <ReactSwipe wrapperClassName={'wrap'} auto={3000} speed={1000} callback={this.changeCurrentIndex}>
                	{
						bannerArr.map(function(d){
						return (
								<div>
									<a href={d.bannerHref}><img src={d.bannerImg}/></a>
								</div>
							)
						})
					}
                </ReactSwipe>                
                <div className="points"> 
                {bannerArr.map(banner)}
                </div>
            </div>
        );
    }
});

const Nav = React.createClass({
	render: function(){
		return (
			<div className="indexnav">
				<a href="#"  className="indexnav1">
					<div className="text">VIP专区</div>
				</a>
				<a href="#"  className="indexnav2">
					<div className="text">豆哥商品</div>
				</a>
				<a href="#"  className="indexnav3">
					<div className="text">我的商城</div>
				</a>
			</div>
		)
	}
});

const TextBar = React.createClass({
	render: function(){
		return (
			<div className="index-actList-h">
				<div className="index-actList-htext">{this.props.title}</div>
				<a href={this.props.link} className="index-actList-hmore" 
				style={{background:"url(../images/ico-blue-right.png) no-repeat right center"}}>更多</a>
			</div>
		)
	}
})

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


var proIndexJson={
	"success":true,
	"banner":[
		{
			"bannerHref":"http://www.jd.com",
			"bannerImg":"../images/act-banner2.jpg",
			"bannerIndex":0		
		},
		{
			"bannerHref":"http://www.jd.com",
			"bannerImg":"../images/act-banner1.jpg",
			"bannerIndex":1
		},
		{
			"bannerHref":"http://www.jd.com",
			"bannerImg":"../images/act-banner3.jpg",
			"bannerIndex":2
		},
		{
			"bannerHref":"http://www.jd.com",
			"bannerImg":"../images/act-banner1.jpg",
			"bannerIndex":3
		}
	],
	
	"cont":
	[	{	
			"success": true,			
			"actimg":"../images/act-banner1.jpg",
			"title":"愚人节",
			"morehref":"http://www.jd.com",		
			"products": [
				{	"label":"愚",
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
				}
			]
		},
		{
			"success": true,			
			"actimg":"../images/act-banner2.jpg",
			"title":"清明节",
			"morehref":"http://www.jd.com",			
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
	]
}
 	ReactDOM.render(<HomePage indexlist={proIndexJson}/>, document.getElementById('cnt'));

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

