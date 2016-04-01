'use strict';

/*
var Carousel = React.createClass({
    render: function () {
        return (
            <ReactSwipe>
                <div>'PANE 1'</div>
                <div>'PANE 2'</div>
                <div>'PANE 3'</div>
                <div>'PANE 3'</div>
            </ReactSwipe>
        );
    }
});

ReactDOM.render(<Carousel />, document.getElementById('cnt'));
*/

const HomePage = React.createClass({
		
		
		
	render: function(){
		return (
			<div>
				<header className="header">
				<div className="btn-back">&lt;</div>			

				</header>
				
				
			<HomePage.ActList indexlist={this.props.indexlist.cont}/>
				
				
			</div>	
		)
	}
});

HomePage.ActList = React.createClass({
	render: function(){
		return (
		<div className="index-actList-wrap">
		{
			this.props.indexlist.map(function(date1){
				return (
				<div className="index-actList-box">
							<div className="index-actList-h">
								<div className="index-actList-htext">{date1.title}</div>
								<a href={date1.morehref} className="index-actList-hmore" style={{background:"url(../images/ico-blue-right.png) no-repeat right center"}}>更多</a>
							</div>
							<div className="index-actList-img"><img src={date1.actimg} /></div>
							<ul className="index-actList-list">
							{
								date1.products.map(function(date2){
									return(
										<li>
										<a href={date2.ahref} className="index-actList-a">									
											<div className="list-img"><img src={date2.img} /></div>
											<div className="list-label">{date2.label}</div>
											<div className="list-name">{date2.name}</div>
											<div className="list-mark">
												<div>{date2.mark}</div>
											</div>
											<div className="list-price-box">
												<div className="list-price">
													<span className="list-price-mark">&yen;</span>
													<span className="list-price-num">{date2.price}</span>
													<span className="list-price-score">&#43;{date2.score}</span>
												</div>
												<div className="list-sold">
													<span>累计销量 </span>
													<span>{date2.sold}</span>
												</div>
											</div>
										</a>
									</li>
									)
								})
							}
								
							</ul>
						</div>
					)
				})
			}
			</div>
		)
	}
})

var json={"cont":
	[	{	
			"success": true,			
			"actimg":"../images/act-banner1.jpg",
			"title":"愚人节",
			"morehref":"http://www.jd.com",		
			"products": [
				{	"label":"愚",
					"name": "product 11",
					"price": 199900,
					"sold": 999,
					"ahref": "http://m.9888.cn/mpwap/",
					"img": "../images/pro-img1.jpg",
					"mark": "限购一件",					
					"score": 999
					
				},				
				{	"label":"愚",
					"name": "product 12",
					"price": 199900,
					"sold": 999,
					"ahref": "http://m.9888.cn/mpwap/",
					"img": "../images/pro-img2.jpg",
					"mark": "限购一件",
					"score": 999
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
					"name": "product 21",
					"price": 199900,
					"sold": 999,
					"ahref": "http://m.9888.cn/mpwap/",
					"img": "../images/pro-img1.jpg",
					"mark": "限购一件",
					"score": 999
				},				
				{	
					"label":"清",
					"name": "product 22",
					"price": 199900,
					"sold": 999,
					"ahref": "http://m.9888.cn/mpwap/",
					"img": "../images/pro-img3.jpg",
					"mark": "限购一件",
					"score": 999
				}
			]
		}
	]
}
 	ReactDOM.render(<HomePage sum={99} indexlist={json}/>, document.getElementById('cnt'));
