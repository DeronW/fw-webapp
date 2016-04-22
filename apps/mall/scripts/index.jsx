'use strict';

const STATIC_PATH = document.getElementById('static-path').value;
const API_PATH = document.getElementById('api-path').value;

function gotoHandler(i) {
    if ($FW.Browser.inApp()) {
        NativeBridge.goto(i)
    } else {
        location.href = i;
    }
}

const Mall = React.createClass({
    clickHandler: function (link) {
		if(link.indexOf('://') < 0) {
			link = location.protocol + location.hostname + link;
		}
        gotoHandler(link)
    },
    render: function () {
        let activity = (i, index) => <ActivityProduct title={i.title} img={i.img} bizNo={i.bizNo}
                                                      activity_id={i.activity_id}
                                                      products={i.products} key={index}/>;
        let _this = this;
        return (
            <div>
                {$FW.Browser.inApp() ? null : <Header/>}
                <Carousel banners={this.props.banners}/>
                <div className="header-nav">
                    <a className="vip" onClick={function(){ _this.clickHandler("/products/vip") }}
                       style={{backgroundImage: 'url(' + STATIC_PATH + 'images/ico-vip.png)'}}>
                        VIP专区</a>
                    <a className="goods" onClick={function(){ _this.clickHandler("/products") }}
                       style={{backgroundImage: 'url(' + STATIC_PATH + 'images/ico-goods.png)'}}>
                        豆哥商品</a>
                    <a className="mine" onClick={function(){ _this.clickHandler("/user") }}
                       style={{backgroundImage: 'url(' + STATIC_PATH + 'images/ico-shop.png)'}}>
                        我的商城</a>
                </div>
                <div className="index-actList-wrap">
                    { (this.props.activities || []).map(activity) }
                    {this.props.activities.length ? null : <div className="empty">暂无活动</div>}
                </div>
            </div>
        )
    }
});

const Header = React.createClass({
    backClickHandler: function () {
        history.back();
    },
    render: function () {
        let style_a = {
            height: "100px"
        };

        let style_b = {
            position: "fixed",
            zIndex: "99",
            top: "0",
            width: "100%",
            height: "100px",
            textAlign: "center",
            lineHeight: "100px",
            fontSize: "40px"
        };

        let style_c = {
            display: "block",
            position: "absolute",
            width: "100px",
            height: "100px",
            lineHeight: "100px",
            fontSize: "40px",
            left: "0",
            top: "0"
        };

        return (
            <div style={style_a}>
                <div style={style_b}>
                    <b style={style_c} onClick={this.backClickHandler}>&lt;</b>
                    豆哥商城
                </div>
            </div>
        )
    }
});

const Carousel = React.createClass({
    getInitialState: function () {
        return {
            banners: this.props.banners || [],
            cur_index: 0
        }
    },

    changeCurrentIndex: function (index) {
        this.setState({cur_index: index})
    },

    render: function () {
        let point = (dot, index) => <div key={index}
                                         className={(this.state.cur_index == index - 1) ? "on" : ''}></div>;
        let ba = (d, index) => <div key={index}><a onClick={function(){gotoHandler(d.href)}}><img src={d.img}/></a></div>;

        return (
            <div className="banner-carousel">
                <ReactSwipe wrapperClassName={'wrap'} auto={3000} speed={1000} callback={this.changeCurrentIndex}>
                    {this.state.banners.map(ba) }
                </ReactSwipe>
                <div className="points">
                    {this.state.banners.map(point)}
                </div>
            </div>
        );
    }
});

const ActivityProduct = React.createClass({
    render: function () {
        let pi = (data, index) => <ProductItem {...data} key={index}/>;
        let activity_banner = () => {
            return this.props.img ?
                (<div className="index-actList-img">
                    <a><img src={this.props.img}/></a>
                </div>) :
                null;
        };
        return (
            <div className="index-actList-box">
                <TextBar title={this.props.title} bizNo={this.props.bizNo} activity_id={this.props.activity_id}/>
                {activity_banner()}
                <div className="index-actList-list">{this.props.products.map(pi)}</div>
            </div>
        )
    }
});

const TextBar = React.createClass({
    render: function () {
        let _this = this;
        return (
            <div className="index-actList-h">
                <div className="index-actList-htext">{this.props.title}</div>
                <a onClick={function(){gotoHandler('/activity?bizNo=' + _this.props.bizNo + '&activity_id=' + _this.props.activity_id)}}
                   className="index-actList-hmore"
                   style={{background:"url("+STATIC_PATH+"images/ico-blue-right.png) no-repeat right center"}}>更多</a>
            </div>
        )
    }
});

const ProductItem = React.createClass({
    render: function () {
        var price = (parseFloat(this.props.score) > 0) ? (
            <span className="list-price-score">&#43;{this.props.score}分</span>) : "";

        let Angle = this.props.angle_text ?
            <div className={"list-label " + this.props.angle_type}>{this.props.angle_text}</div> :
            null;
        let _this = this;

        return (
                <a onClick={function(){gotoHandler('/productDetail?bizNo='+ _this.props.bizNo)}}
                   className="index-actList-a">
                    <div className="list-img"><img src={this.props.img}/></div>
                    {Angle}
                    <div className="list-name">{this.props.title}</div>
                    <div className="list-mark">
                        { this.props.tags.map((d, index) => <div key={index}>{d}</div>) }
                    </div>
                    <div className="list-price-box">
                        <div className="list-price">
                            <span className="list-price-mark">&yen;</span>
                            <span className="list-price-num">{$FW.Format.currency(this.props.price)}</span>
                            { price }
                        </div>
                        <div className="list-sold">
                            <span>累计销量 </span>
                            <span>{this.props.sales}</span>
                        </div>
                    </div>
                </a>
        )
    }
});

	

$FW.DOMReady(function () {
    NativeBridge.ajaxStart();
    NativeBridge.setTitle('豆哥商城');
    $FW.BatchGet([
        API_PATH + 'mall/api/index/v1/banners.json', // banner轮播图数据
        API_PATH + 'mall/api/index/v1/activities.json' // 明前活动的数据
    ], function (data) {
        var banners = data[0].banners, activities = data[1].activities;
        ReactDOM.render(<Mall banners={banners} activities={activities}/>, document.getElementById('cnt'));
        NativeBridge.ajaxComplete();
    });
});