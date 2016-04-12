'use strict';

const STATIC_PATH = document.getElementById('static-path').value;
const API_PATH = document.getElementById('api-path').value;

const MallProducts = React.createClass({
    getInitialState: function () {
        return {
            index: 0,
            tabs: ['all', 'virtual', 'reality'],
            products: []
        }
    },

    tabClickHandler: function (index) {
        this.setState({index: index});
    },

    componentDidMount: function () {
        let _this = this;
        $FW.Ajax({
            url: 'http://10.10.100.112/mockjs/4/api/v1/products?count=&type=&cursor=',
            success: function (data) {
                let products = window.Products.all.concat(data.products);
                window.Products.all = products;
                _this.setState({products: products});
            }
        })
    },

    render: function () {
        let _this = this;

        let tab = function (i, index) {
            let name = {
                all: '全部',
                virtual: '虚拟商品',
                reality: '实物商品'
            };
            return (
                <div key={index}
                     className={index==_this.state.index ? "act" : null}
                     onClick={function(){_this.tabClickHandler(index)}}>
                    <span>{name[i]}</span>
                </div>
            )
        };

        return (
            <div>
                <header className="header">
                    豆哥商品
                    <a className="btn-back"
                       style={{background:"url(" + STATIC_PATH + "images/ico-blue-back.png) no-repeat 30px center"}}> </a>
                </header>
                <div className="productsTab">
                    {this.state.tabs.map(tab)}
                </div>

                <div className="products-list">
                    <ul className="index-actList-list on">
                        { this.state.products.map((p) => <ProductItem {...p} key={p.id}/>) }
                    </ul>
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

window.Products = {
    all: [],
    virtual: [],
    real: []
};

$FW.DOMReady(function () {
    ReactDOM.render(<MallProducts />, document.getElementById('cnt'));
});
