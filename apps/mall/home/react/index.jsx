'use strict';

const API_PATH = document.getElementById('api-path').value;

function gotoHandler(link, need_login) {
    if (link.indexOf('://') < 0) {
        link = location.protocol + '//' + location.hostname + link;
    }
    if ($FW.Browser.inApp()) {
        NativeBridge.goto(link, need_login)
    } else {
        location.href = link;
    }
}

const Mall = React.createClass({
    render: function () {
        let activity = (i, index) => {
            return <ActivityProduct title={i.title} img={i.img} bizNo={i.bizNo}
                                    activity_id={i.activity_id} products={i.products} key={index}/>;
        };

        return (
            <div>
                {this.props.banners.length ?
                    <Carousel banners={this.props.banners}/> :
                    <div className="no-banner"></div>}

                <div className="header-nav">
                    {/* <a className="recharge" onClick={function(){ gotoHandler("/static/mall/product-recharge/index.html",true) }}>话费充值</a>*/}
                    <a className="recharge" onClick={function(){ gotoHandler("/recharge_phone",true) }}>话费充值</a>
                    <a className="vip" onClick={function(){ gotoHandler("/vip_zone") }}>VIP专区</a>
                    <a className="goods" onClick={function(){ gotoHandler("/products") }}>豆哥商品</a>
                    <a className="mine" onClick={function(){ gotoHandler("/user", true) }}>我的商城</a>
                </div>
                <div className="index-actList-wrap">
                    { this.props.activities.map(activity) }
                    {this.props.activities.length ? null : <div className="empty">暂无活动</div>}
                </div>
                <div className="auth-info">以上活动由金融工场主办 与Apple Inc.无关</div>
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
        if (this.state.banners.length == 2) index = index % 2;
        this.setState({cur_index: index})
    },

    render: function () {
        let point = (dot, index) => <div key={index} className={(this.state.cur_index == index) ? "on" : ''}></div>;
        let ba = (d, index) => <div key={index}>
            <div><a onClick={function(){gotoHandler(d.link)}}>
                <img src={d.img}/></a></div>
        </div>;

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
        let _this = this;
        let pi = (data, index) => <ProductItem {...data} key={index}/>;
        let activity_banner = () => {
            return this.props.img ?
                (<div className="index-actList-img">
                    <a onClick={function(){gotoHandler("/activity?bizNo=" + _this.props.bizNo + '&activity_id=' + _this.props.activity_id)}}>
                        <img src={this.props.img || 'images/default-banner.jpg'}/>
                    </a>
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
                <div className="index-actList-htext"><span className="vertical-line"></span>{this.props.title}</div>
                <a onClick={function(){gotoHandler('/activity?bizNo=' + _this.props.bizNo + '&activity_id=' + _this.props.activity_id)}}
                   className="index-actList-hmore">更多</a>
            </div>
        )
    }
});

const ProductItem = React.createClass({
    render: function () {
        var price = this.props.price > 0 ?
            <span className="list-price-num">{$FW.Format.currency(this.props.price)}</span> : null;
        var score = (parseFloat(this.props.score) > 0) ?
            ( <span className="list-price-score">
                {this.props.price > 0 ? <span>+</span> : null}
                {this.props.score}工分
            </span>) : "";

        let Angle = this.props.angle_text ?
            <div className={"list-label " + this.props.angle_type}>{this.props.angle_text}</div> :
            null;
        let _this = this;

        return (
            <a onClick={function(){gotoHandler('/productDetail?bizNo='+ _this.props.bizNo)}}
               className="index-actList-a">
                <div className="list-img"><img src={this.props.img || 'images/default-product.jpg'}/>
                </div>
                {Angle}
                <div className="product-content-wrap">
                    <div className="list-name">{this.props.title}</div>
                    <div className="list-mark">
                        { this.props.tags.map((d, index) => <div key={index}>{d}</div>) }
                    </div>
                    <div className="list-price-box">
                            <div className="list-price">
                                {this.props.price > 0 ? <span className="list-price-mark">&yen;</span> : null}
                                {price}
                                {score}
                            </div>
                            <div className="list-sold">
                                <span>累计销量 </span>
                                <span>{this.props.sales}</span>
                            </div>
                    </div>
                </div>

            </a>
        )
    }
});

$FW.DOMReady(function () {
    NativeBridge.setTitle('豆哥商城');
    $FW.BatchGet([
        API_PATH + 'mall/api/index/v1/banners.json', // banner轮播图数据
        API_PATH + 'mall/api/index/v1/activities.json' // 明前活动的数据
        //'http://127.0.0.1/banners.json',
        //'http://127.0.0.1/activities.json'
    ], function (data) {
        var banners = data[0].banners, activities = data[1].activities;
        if (typeof(banners) == 'undefined' || typeof(activities) == 'undefined') $FW.Component.Alert('error: empty data received');
        ReactDOM.render(<Mall banners={banners} activities={activities}/>, document.getElementById('cnt'));
    }, true);

    if ($FW.Utils.shouldShowHeader()) {
        ReactDOM.render(<Header title_img='images/dg-mall-title.png' show_back_btn={!$FW.Browser.inApp()}
                                back_handler={ () => location.href = 'http://m.9888.cn' }/>,
            document.getElementById('header'));
    }
});