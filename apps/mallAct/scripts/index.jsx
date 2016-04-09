'use strict';

const MallActivity = React.createClass({
    render: function () {
        return (
            <div>
                <header className="header">
                    {this.props.activity.title}
                    <a href="#" className="btn-back"
                       style={{background:"url(../images/ico-blue-back.png) no-repeat 30px center"}}> </a>
                </header>
                <a href="#" className="act-img-detail"><img src={this.props.activity.img}/></a>
                <MallActivity.Explain desc={this.props.activity.desc}/>
                <div className="products-act">
                    <ProductList />
                </div>

            </div>
        )
    }
});

MallActivity.Explain = React.createClass({
    getInitialState: function () {
        return {show: true}
    },
    toggleHandler: function () {
        this.setState({show: !this.state.show});
    },
    render: function () {
        var actExplainContClass = this.state.show ? "act-explain-cont" : "act-explain-cont show";
        var actExplainBtn = this.state.show ? "act-explain-btn" : "act-explain-btn on";
        return (
            <div className="act-explain-box">
                <div className="act-explain-head">
                    <div className="act-explain-h">活动说明</div>
                    <div className={actExplainBtn} onClick={this.toggleHandler}
                         style={{background:"url(../images/ico-grap-down.png) no-repeat center"}}></div>
                </div>
                <ul className={actExplainContClass}>
                    { this.props.desc.split(',').map((i, index) => <li key={index}>{i}</li>) }
                </ul>
            </div>
        )
    }
});

const ProductList = React.createClass({
    getInitialState: function () {
        return {
            products: []
        }
    },
    componentDidMount: function () {
        $FW.Ajax({
            url: 'http://10.10.100.112/mockjs/4/api/v1/products?count=&type=&cursor=',
            success: function (data) {
                this.setState({products: this.state.products.concat(data.products)})
            }.bind(this)
        })
    },
    render: function () {
        return (
            <ul className="index-actList-list">
                { this.state.products.map((p) => <ProductItem {...p} key={p.id}/>) }
            </ul>
        )
    }
});

const ProductItem = React.createClass({
    render: function () {
        var price = (parseFloat(this.props.score) > 0) ? (
            <span className="list-price-score">&#43;{this.props.score}分</span>) : null;
        var Angle = (this.props.angle_text) ? (<div className="list-label">{this.props.angle_text}</div>) : null;

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
                            <span className="list-price-num">{$FW.Format.currency(this.props.price)}</span>
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

    $FW.BatchGet(
        [
            'http://10.10.100.112/mockjs/4/api/v1/activity?activity_id=12',
            'http://10.10.100.112/mockjs/4/api/v1/products?count=&type=&cursor='
        ], function (arr) {
            ReactDOM.render(<MallActivity activity={arr[0]} products={arr[1]} />, document.getElementById('cnt'));
        });
});