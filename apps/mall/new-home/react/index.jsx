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
    getHeadImages: function () {
        var images = [];
        var bs = this.props.banners;
        for (var i = 0; i < bs.length; i++) {
            images.push(bs[i].img)
        }
        return images;
    },
    onImageClickHandler: function (index) {
        var link = null;
        var bs = this.props.banners;
        for (var i = 0; i < bs.length; i++) {
            if (i == index) link = bs[i].link;
        }
        link ? gotoHandler(link) : console.log('no link set');
    },
    render: function () {
        let activity = (i, index) => {
            return <ActivityProduct title={i.title} img={i.img} bizNo={i.bizNo}
                                    activity_id={i.activity_id} products={i.products} key={index}/>;
        };

        return (
            <div className="head-wrap">
                {this.props.banners.length ?
                    <BannerGroup className="head-images" images={this.getHeadImages()}
                                 onImageClick={this.onImageClickHandler}/> :
                    <div className="no-banner"></div>}
                <div className="head-items">
                    <img className="m-logo" src="images/m-logo.png"/>
                    <input className="search-bar" type="text" value="" placeholder="搜索"/>
                    <img className="search-icon" src="images/search-icon.png"/>
                    <a className="index-avatar" onClick={function(){ gotoHandler("/user", true) }}><img src="images/profile-icon.png"/></a>
                </div>
                <div className="head-user-info">
                     <div className="my-score"><span className="my-score-icon"></span>我的工分:<span className="score-num">250000000工分</span></div>
                     <a className="my-exchange" onClick={function(){ gotoHandler("/user") }}><span className="my-exchange-icon"></span>我可兑换</a>
                     <a className="my-mall" onClick={function(){ gotoHandler("/user", true) }}><span className="my-mall-icon"></span>我的商城</a>
                     <span className="vertical-gray-line"></span>
                </div>
                <div className="header-nav">
                    <a className="recharge" onClick={function(){ gotoHandler("/recharge_phone",true) }}>话费充值</a>
                    <a className="vip" onClick={function(){ gotoHandler("/vip_zone") }}>VIP专区</a>
                    <a className="goods" onClick={function(){ gotoHandler("/products") }}>玩玩乐</a>
                    <a className="mine" onClick={function(){ gotoHandler("/user", true) }}>品类</a>
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
        var price = 0;
        if (this.props.price == 0 && this.props.score == 0) {
            price = <span className="list-price-num">¥0</span>
        } else if (this.props.price == 0) {
            price = <span className="list-price-num"></span>
        } else if (this.props.price >= 0) {
            price = <span className="list-price-num">{$FW.Format.currency(this.props.price)}</span>
        } else {
            price = null
        }
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
    ], function (data) {
        var banners = data[0].banners, activities = data[1].activities;
        if (typeof(banners) == 'undefined' || typeof(activities) == 'undefined') $FW.Component.Alert('error: empty data received');
        ReactDOM.render(<Mall banners={banners} activities={activities}/>, document.getElementById('cnt'));
    }, true);

});