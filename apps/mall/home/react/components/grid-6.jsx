const Grid_6 = React.createClass({
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

        let theme_product_item = (product, index) => {
            return (
                <a className="theme-product-item" key={index}
                   href={`/static/mall/product-detail/index.html?bizNo=${product.bizNo}`}>
                    <img className="theme-1-img" src={product.img}/>
                    <span className="theme-product-item-name">{product.abbreviation}</span>
                </a>
            )
        };
        return (
            <div className="theme-1">
                <a className="activity-theme">
                    <img src="static/mall/product-list/images/outdoor.jpg"/></a>
                <div className="theme-product-wrap">
                    {products.map(theme_product_item)}
                </div>
            </div>
        )
    }
});
