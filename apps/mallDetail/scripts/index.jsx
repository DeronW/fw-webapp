'use strict';

const Mall = React.createClass({
    render: function () {
        return (
            <div>
                <header className="header">商品详情<a href="#" className="btn-back"
                       style={{background:"url(../images/ico-blue-back.png) no-repeat 30px center"}}> </a></header>
                <CarouselDetail banners={this.props.banners}/>    
                <div className="detail-inf">
	                <div className="detail-inf-name">
	                戴森(Dyson)吸尘器V6 origin+高配版(旧名DC62 Complete)(新老包装型号随机发，产品相同)	                	
	                </div>
                	<div className="detail-inf-des">
                	</div>
                	<div className="detail-inf-price">
                		<span className="money">&yen;</span><span className="price">2,199</span><span className="score">+ {200}分</span>
                	</div>
                	<div className="detail-inf1">
                		<div className="market-price"><span>市价：</span><span>&yen;{3688}</span>
                		</div>
                		<div className="total"><span>累计销量</span><span>{3688}</span></div>
                	</div>
                	<div className="detail-inf1">
                		<div className="market-price"><span>快递：</span><span>{}</span>
                		</div>
                		<div className="total"><span>配送范围：</span><span>{}</span></div>
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
        )
    }
});

const CarouselDetail = React.createClass({
    getInitialState: function () {
        return {
            banners: this.props.banners,
            cur_index: 0
        }
    },

    changeCurrentIndex: function (index) {
        this.setState({cur_index: index})
    },

    render: function () {
        let banner = (dot, index) => <div key={index} className={(this.state.cur_index == index) ? "on" : ''}></div>;
        let ba = (d, index) => <div key={index}><a href={d.href}><img src={d.img}/></a><div className="label"></div></div>;

        return (
            <div className="banner-carousel-detail">
                <ReactSwipe wrapperClassName={'wrap'} auto={3000} speed={1000} callback={this.changeCurrentIndex}>
                    {this.state.banners.map(ba) }
                </ReactSwipe>
                <div className="points">
                    {this.state.banners.map(banner)}
                </div>
            </div>
        );
    }
});



$FW.DOMReady(function () {
    $FW.BatchGet([
        'http://10.10.100.112/mockjs/4/api/v1/mall/banner',
        'http://10.10.100.112/mockjs/4/api/v1/mall/activities'
    ], function (data) {
        var banners = data[0].banners, activities = data[1].activities;
        ReactDOM.render(<Mall banners={banners} activities={activities}/>, document.getElementById('cnt'));
    });
});


