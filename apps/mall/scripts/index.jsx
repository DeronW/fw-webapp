'use strict';

const Mall = React.createClass({
    render: function () {
        return (
            <div>
                <header className="header">豆哥商城</header>
                <Carousel banners={this.props.banners}/>
                <div className="index-actList-wrap">
                    { this.props.activities.map((i, index) =>
                        <ActivityProduct title={i.title} img={i.img} link={i.link}
                                         products={i.products} key={index}/>) }
                </div>
            </div>
        )
    }
});

const Carousel = React.createClass({
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
        let ba = (d, index) => <div key={index}><a href={d.href}><img src={d.img}/></a></div>;

        return (
            <div className="banner-carousel">
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

const ActivityProduct = React.createClass({
    render: function () {
        let pi = (data, index) => <ProductItem {...data} key={index}/>;
        return (
            <div className="index-actList-box">
                <TextBar title={this.props.title} link={this.props.link}/>
                <div className="index-actList-img">
                    <a href={this.props.link}><img src={this.props.img}/></a>
                </div>
                <ul className="index-actList-list">{this.props.products.map(pi)}</ul>
            </div>
        )
    }
});

const TextBar = React.createClass({
    render: function () {
        return (
            <div className="index-actList-h">
                <div className="index-actList-htext">{this.props.title}</div>
                <a href={this.props.link} className="index-actList-hmore"
                   style={{background:"url(../images/ico-blue-right.png) no-repeat right center"}}>更多</a>
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

        return (
            <li>
                <a href={this.props.link} className="index-actList-a">
                    <div className="list-img"><img src={this.props.img}/></div>
                    {Angle}
                    <div className="list-name">{this.props.title}</div>
                    <div className="list-mark">
                        { this.props.tags.map((d, index) => <div key={index}>{d}</div>) }
                    </div>
                    <div className="list-price-box">
                        <div className="list-price">
                            <span className="list-price-mark">&yen;</span>
                            <span className="list-price-num">{formatNum(this.props.price)}</span>
                            { price }
                        </div>
                        <div className="list-sold">
                            <span>累计销量 </span>
                            <span>{this.props.sales}</span>
                        </div>
                    </div>
                </a>
            </li>
        )
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


function formatNum(str) {
    var newStr = "";
    var count = 0;
    str += '';

    if (str.indexOf(".") == -1) {
        for (var i = str.length - 1; i >= 0; i--) {
            if (count % 3 == 0 && count != 0) {
                newStr = str.charAt(i) + "," + newStr;
            } else {
                newStr = str.charAt(i) + newStr;
            }
            count++;
        }
        str = newStr + ".00";
    } else {
        for (var i = str.indexOf(".") - 1; i >= 0; i--) {
            if (count % 3 == 0 && count != 0) {
                newStr = str.charAt(i) + "," + newStr;
            } else {
                newStr = str.charAt(i) + newStr;
            }
            count++;
        }
        str = newStr + (str + "00").substr((str + "00").indexOf("."), 3);
    }
    return str
}