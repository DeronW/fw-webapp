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
		getInitialState: function(){
			return {
				a: 1
			}
		},	
		
		
		componentDidMount: function(){
			let _this = this;
			setInterval(function(){
				// _this.setState({a: _this.state.a+1	})
			}, 1000)
		},
		
	render: function(){
		return (
			<div>
				<header className="header">
				<div className="btn-back">&lt;</div>
				TITLE {this.state.a}
				Sum {this.props.sum}
				</header>
				
				<HomePage.Swipe/>
				
//				<HomePage.ActList indexlist={this.props.indexlist}/>
				
				
			</div>	
		)
	}
});

HomePage.Swipe = React.createClass({
	render: function(){
		return <div>I am swipe</div>
	}
})
//HomePage.ActList = React.createClass({
//	render: function(){
//		return (
//		<div className="index-actList-wrap">
//		{
//			this.props.indexlist.map(function(date1){
//				return (
//				<div className="index-actList-box">
//							<div className="index-actList-h">
//								<div className="index-actList-htext">{date1.title}</div>
//								<a href={date1.ahref} className="index-actList-hmore">更多&lt;</a>
//							</div>
//							<div className="index-actList-img"><img src={date1.img} /></div>
//							<ul className="index-actList-list">
//							date1.products.map(function(date2){
//									<li>
//									<a href={date2.ahref} className="index-actList-a">
//										
//										<div className="list-img"><img src={date2.img} /></div>
//										<div className="list-name">{date2.name}</div>
//										<div className="list-mark">
//											<div>{date2.mark}</div>
//										</div>
//										<div className="list-price-box">
//											<div className="list-price">
//												<span className="list-price-mark">&yen;</span>
//												<span className="list-price-num">{date2.price}</span>
//												<span className="list-price-score">&#43;{date2.score}</span>
//											</div>
//											<div className="list-sold">
//												<span>累计销量 </span>
//												<span>{date2.sold}</span>
//											</div>
//										</div>
//									</a>
//								</li>
//							})
								
//							</ul>
//						</div>
//					)
//				})
//			}
//			</div>
//		)
//	}
//})

//var json={
//	[	{	
//			"success": true,
//			"label":"愚",
//			"img":"../images/act-banner1.jpg",
//			"title":"愚人节",
//			"ahref":"http://www.jd.com/?jd_pop=7813b16606874157bbb4f40e527dc4f4&abt=0&utm_source=x.jd.com&utm_medium=unioncpc&utm_campaign=t_220520384_507443_1156&utm_term=7813b16606874157bbb4f40e527dc4f4-p_1156",
//			
//			"products": [
//				{
//					"name": "product 11",
//					"price": 199900,
//					"sold": 999,
//					"ahref": "m.9888.cn",
//					"img": "../images/pro-img1.jpg",
//					"name": "999",
//					"mark": "999",
//					"price": 999,
//					"score": 999
//				},				
//				{
//					"name": "product 12",
//					"price": 199900,
//					"sold": 999,
//					"ahref": "m.9888.cn",
//					"img": "../images/pro-img2.jpg",
//					"name": "999",
//					"mark": "999",
//					"price": 999,
//					"score": 999
//				}
//			]
//		},
//		{
//			"success": true,
//			"label":"清",
//			"img":"../images/act-banner2.jpg",
//			"title":"清明节",
//			"ahref":"http://www.jd.com/?jd_pop=7813b16606874157bbb4f40e527dc4f4&abt=0&utm_source=x.jd.com&utm_medium=unioncpc&utm_campaign=t_220520384_507443_1156&utm_term=7813b16606874157bbb4f40e527dc4f4-p_1156",
//			
//			"products": [
//				{
//					"name": "product 21",
//					"price": 199900,
//					"sold": 999,
//					"ahref": "m.9888.cn",
//					"img": "../images/pro-img1.jpg",
//					"name": "999",
//					"mark": "999",
//					"price": 999,
//					"score": 999
//				},				
//				{
//					"name": "product 22",
//					"price": 199900,
//					"sold": 999,
//					"ahref": "m.9888.cn",
//					"img": "../images/pro-img3.jpg",
//					"name": "999",
//					"mark": "999",
//					"price": 999,
//					"score": 999
//				}
//			]
//		}
//	]
//}
ReactDOM.render(<HomePage sum={99}/>, document.getElementById('cnt'));
