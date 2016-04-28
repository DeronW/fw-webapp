'use strict';

const STATIC_PATH = document.getElementById('static-path').value;
const API_PATH = document.getElementById('api-path').value;

const MallProducts = React.createClass({
    getInitialState: function () {
        this.tabs = ['all', 'virtual', 'reality'];
        this.pageCount = 20;

        return {
            tab: 'all',
            page: {
                all: 1,
                virtual: 1,
                reality: 1
            },
            products: []
        }
    },

    tabClickHandler: function (tab) {
        this.setState({tab: tab, products: window.Products[tab]});
        if (window.Products[tab].length == 0) {
            setTimeout(function () {
                this.loadMoreProductHandler(null);
            }.bind(this), 500)
        }
    },

    loadMoreProductHandler: function (done) {
        console.log('load more product');
        console.log(done);

        let page = this.state.page[this.state.tab];
        if (page == 0) return; // 如果page=0 表示没有更多页内容可以加载了
        let is_reality;
        if (this.state.tab == 'reality') {
            is_reality = 1
        } else if (this.state.tab == 'virtual') {
            is_reality = 2
        } else {
            is_reality = 0
        }

        NativeBridge.ajaxStart();
        $FW.Ajax({
            url: API_PATH + 'mall/api/index/v1/products.json?count=' + this.pageCount + '&page=' + page + '&isVirtual=' + is_reality,
            success: function (data) {
                // isVirtual	0全部 1实体 2虚拟
                let tab;
                if (data.isVirtual == 0) {
                    tab = 'all'
                } else if (data.isVirtual == 1) {
                    tab = 'reality'
                } else if (data.isVirtual == 2) {
                    tab = 'virtual'
                } else {
                    done && done();
                    return;
                }

                window.Products[tab] = window.Products[tab].concat(data.products);
                let products = window.Products[this.state.tab];

                let new_page = this.state.page;
                new_page[this.state.tab] = new_page[this.state.tab] + 1;
                if (data.totalCount < 20) new_page[this.state.tab] = 0;

                this.setState({products: products, page: new_page});
                NativeBridge.ajaxComplete();
                done && done();
            }.bind(this)
        });
    },

    componentDidMount: function () {
        this.loadMoreProductHandler(null);
        $FW.Event.touchBottom(this.loadMoreProductHandler);
    },

    render: function () {
        let _this = this;

        let tab = function (i) {
            let name = {
                all: '全部',
                virtual: '虚拟商品',
                reality: '实物商品'
            };
            return (
                <div key={i} className={i==_this.state.tab ? "act" : null}
                     onClick={function(){_this.tabClickHandler(i)}}>
                    <span>{name[i]}</span>
                </div>
            )
        };

        return (
            <div>
                {$FW.Browser.inApp() ? null : <Header title={'豆哥商品'}/>}
                <div className="productsTab" style={{top:$FW.Browser.inApp() ? "0" : "100px" }}>
                    {this.tabs.map(tab)}
                </div>
                <div className="products-list">
                    { this.state.products.map((p, index) => <ProductItem {...p} key={index}/>) }
                    {this.state.products.length == 0 ? <div className="empty-list">暂无商品</div> : null}
                </div>
            </div>
        )
    }
});

const ProductItem = React.createClass({
    render: function () {
        var price = (parseFloat(this.props.score) > 0) ? (
            <span className="list-price-score">&#43;{this.props.score}工分</span>) : null;
        var Angle = (this.props.angle_text) ? (<div className="list-label">{this.props.angle_text}</div>) : null;
        var cover_bg = 'url(' + (this.props.img || STATIC_PATH + 'images/default-product.jpg') + ')';

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

window.Products = {
    all: [],
    virtual: [],
    reality: []
};

$FW.DOMReady(function () {
    NativeBridge.setTitle('豆哥商品');
    ReactDOM.render(<MallProducts />, document.getElementById('cnt'));
});

window.onNativeMessageReceive = function (msg) {
    if (msg == 'history:back') location.href = '/';
};
