const Grid_5 = React.createClass({
    getInitialState() {
        return {
            bizNo: this.props.bizNo,
            products: []
        }
    },
    componentDidMount() {
        $FW.Ajax({
            url: `${API_PATH}mall/api/index/v1/recommendProducts.json`,
            data: {
                recommendBizNo: this.state.bizNo,
                totalCount: this.props.count
            }
        }).then(data => this.setState({ products: data.products }))
    },
    render: function () {
        let {products} = this.state;
        if(products.length == 0) return null;

        let theme2_top_product_item = (product, index) => {
            return (
                <a className="theme2-top-product-item" key={index}
                   href={`/static/mall/product-detail/index.html?bizNo=${product.bizNo}`}>
                    <div
                        className={"theme2-top-product-title theme2-top-product-title-color" + parseInt(index + 1)}>{product.abbreviation}</div>
                    <div className="theme2-top-product-price">
                        {product.rmbPrice == 0 ? null : `¥${product.rmbPrice}`}
                        {product.rmbPrice == 0 || product.score == 0 ? "" : "+"}
                        {product.score == 0 ? null : `${product.score}工分`}
                    </div>
                    <img className="product-img2" src={product.img}/>
                </a>
            )
        };

        let theme2_btm_product_item = (product, index) => {
            return (
                <a className="theme2-btm-product-item" key={index}
                   href={`/static/mall/product-detail/index.html?bizNo=${product.bizNo}`}>
                    <div className="theme2-btm-product-wrap">
                        <img className="theme2-product-img" src={product.img}/>
                        <div className="theme2-btm-product-info">
                            <span className="theme2-btm-product-title">{product.abbreviation}</span>
                            <span className="theme2-btm-product-price">
                                {product.rmbPrice == 0.00 ? null : `¥${product.rmbPrice}`}
                                {product.rmbPrice == 0 || product.score == 0 ? "" : "+"}
                                {product.score}工分
                            </span>
                        </div>
                    </div>
                </a>
            )
        };
        return (
            <div className="theme-2">
                <a href= '/static/mall/product-list/index.html?searchSourceType=0&category=户外用品' className="activity-theme"><img src="/static/mall/product-list/images/outdoor.jpg"/></a>
                <div className="theme2-product-wrap">
                    <div className="theme2-top-product-list">
                        {products.slice(0, 3).map(theme2_top_product_item)}
                    </div>
                    <div className="theme2-btm-product-list">
                        {products.slice(3, 9).map(theme2_btm_product_item)}
                    </div>
                </div>
            </div>
        )
    }
});
