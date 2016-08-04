'use strict';

const API_PATH = document.getElementById('api-path').value;

const MallActivity = React.createClass({
    render: function () {
        let img = this.props.activity.img ?
            <a href="#" className="act-img-detail">
                <img src={this.props.activity.img || 'images/default-banner.jpg'}/></a> :
            null;

        return (
            <div>
                {$FW.Browser.appVersion() >= $FW.AppVersion.show_header ? <Header title={this.props.title}/> : null}
                {img}
                <MallActivity.Explain desc={this.props.activity.desc}/>
                <ProductList />
            </div>
        )
    }
});

MallActivity.Explain = React.createClass({
    getInitialState: function () {
        return {show: false}
    },
    toggleHandler: function () {
        this.setState({show: !this.state.show});
    },
    render: function () {
        let desc = null;
        if (this.state.show && this.props.desc) {
            desc = (
                <div className="act-explain-cont show">
                    { this.props.desc.split(/[;|；]/).map((i, index) => <div key={index}>{trim(i)}</div>) }
                </div>
            )
        }

        return (
            <div className="act-explain-box">
                <div className="act-explain-head" onClick={this.toggleHandler}>
                    <div className="act-explain-h">活动说明</div>
                    <div className={this.state.show ? "act-explain-btn on" : "act-explain-btn"}
                         style={{background:"url(images/ico-grap-down.png) no-repeat center"}}></div>
                </div>
                {desc}
            </div>
        )
    }
});

const ProductList = React.createClass({
    getInitialState: function () {
        return {
            page: 1,
            products: []
        }
    },
    componentDidMount: function () {
        let aid = $FW.Format.urlQuery().activity_id;

        $FW.Ajax({
            url: API_PATH + 'mall/api/index/v1/products.json?activityId=' + aid + '&count=20&page=' + this.state.page,
            success: function (data) {
                this.setState({
                    products: this.state.products.concat(data.products),
                    page: this.state.page++
                })
            }.bind(this)
        })
    },
    render: function () {
        return (
            <div className="products-act">
                <div className="index-actList-list">
                    { this.state.products.map((p, index) => <ProductItem key={index} {...p} key={p.bizNo}/>) }
                </div>
                <div className="auth-info">以上活动由金融工场主办 与Apple Inc.无关</div>
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
                {this.props.price > 0 ? <span>&#43</span> : null}
                {this.props.score}工分
            </span>) : "";

        var Angle = (this.props.angle_text) ? (<div className="list-label">{this.props.angle_text}</div>) : null;
        var cover_bg = 'url(' + (this.props.img || 'images/default-product.jpg') + ')';

        return (
            <a href={'/productDetail?bizNo=' + this.props.bizNo} className="index-actList-a">
                <div className="list-img" style={{backgroundImage: cover_bg}}></div>
                {Angle}
                <div className="list-name">{this.props.title}</div>
                <div className="list-mark">
                    { (this.props.tags || []).map((d, index) => <div key={index}>{d}</div>) }
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
            </a>
        )
    }
});

$FW.DOMReady(function () {

    let bizNo = $FW.Format.urlQuery().bizNo;
    $FW.Ajax({
        url: API_PATH + '/mall/api/index/v1/activity.json?bizNo=' + bizNo,
        //url:'http://localhost/activities.json',
        enable_loading: true,
        success: function (data) {
            ReactDOM.render(<MallActivity activity={data} title={data.title}/>, document.getElementById('cnt'));
            NativeBridge.setTitle(data.title);
        }
    });
});

window.onNativeMessageReceive = function (msg) {
    if (msg == 'history:back') location.href = '/user';
};

function trim(s) {
    return s.replace(/(^\s*)|(\s*$)/g, '')
}