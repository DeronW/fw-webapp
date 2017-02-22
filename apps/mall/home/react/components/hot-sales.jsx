
const HotSales = React.createClass({
    getInitialState: function () {
        return {
            page: 1,
            page_count: 6,
            hasData: true,
            products: []
        }
    },

    componentDidMount: function () {
        $FW.Ajax(`${API_PATH}/mall/api/index/v1/hotProducts.json?count=${this.state.page_count}`)
            .then((data) => this.setState({ products: data.products }));
        $FW.Event.touchBottom(this.loadMoreProductHandler);
    },

    loadMoreProductHandler: function (done) {
        this.setState({ page: this.state.page + 1 });
        if (!this.state.hasData) {
            $FW.Event.cancelTouchBottom();
            return;
        }

        $FW.Ajax({
            url: `${API_PATH}/mall/api/index/v1/hotProducts.json`,//人气热卖列表
            enable_loading: true,
            data: {
                count: this.state.page_count,
                page: this.state.page
            }
        }).then(data => {
            let products = data.products;
            this.setState({
                products: [...this.state.products, ...products],
                hasData: !!products.length
            })
            done && done()
        })
    },

    render: function () {
        let hotProduct = (product, index) => {
            return (
                <a className="product-wrap" key={index}
                    href={`/static/mall/product-detail/index.html?bizNo=${product.bizNo}`}>
                    <img src={product.img} />
                    <span className="product-name">{product.title}</span>
                    <span className="product-price">
                        {product.price == 0 ? null : `¥${product.price}`}
                        {product.price == 0 || product.score == 0 ? "" : "+"}
                        {product.score == 0 ? null : `${product.score}工分`}
                    </span>
                </a>
            )
        }

        return (
            <div className="hot-sales">
                <div className="hot-sales-title"><img src="images/hot-sale.png" /></div>
                <div className="product-list">
                    {this.state.products.map(hotProduct)}
                </div>
            </div>
        )
    }
});
