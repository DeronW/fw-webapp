'use strict';

const STATIC_PATH = document.getElementById('static-path').value;
const API_PATH = document.getElementById('api-path').value;

const MallActivity = React.createClass({
    render: function () {
        let img = this.props.activity.img ?
            <a href="#" className="act-img-detail"><img src={this.props.activity.img}/></a> :
            null;

        return (
            <div>
                {$FW.Browser.inApp() ? null : <Header title={this.props.title}/>}
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
        if (this.state.show) {
            desc = (
                <div className="act-explain-cont show">
                    { this.props.desc.split(/[;|；]/).map((i, index) => <div key={index}>{index + 1}. {i}</div>) }
                </div>
            )
        }

        return (
            <div className="act-explain-box">
                <div className="act-explain-head" onClick={this.toggleHandler}>
                    <div className="act-explain-h">活动说明</div>
                    <div className={this.state.show ? "act-explain-btn on" : "act-explain-btn"}
                         style={{background:"url("+STATIC_PATH+"images/ico-grap-down.png) no-repeat center"}}></div>
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
            url: API_PATH + 'mall/api/index/v1/products.json?activityId='+aid+'&count=20&page=' + this.state.page,
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
            </div>
        )
    }
});

const ProductItem = React.createClass({
    render: function () {
        var price = (parseFloat(this.props.score) > 0) ? (
            <span className="list-price-score">&#43;{this.props.score}分</span>) : null;
        var Angle = (this.props.angle_text) ? (<div className="list-label">{this.props.angle_text}</div>) : null;

        return (
            <a href={'/productDetail?bizNo=' + this.props.bizNo} className="index-actList-a">
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

    let bizNo = $FW.Format.urlQuery().bizNo;
    $FW.Ajax({
        url: API_PATH + '/mall/api/index/v1/activity.json?bizNo=' + bizNo,
        success: function (data) {
            ReactDOM.render(<MallActivity activity={data} title={data.title}/>, document.getElementById('cnt'));
            NativeBridge.ajaxComplete();
            NativeBridge.setTitle(data.title);
        }
    });
});

window.onNativeMessageReceive = function(msg){
    if(msg == 'history:back') location.href = '/user';
};
