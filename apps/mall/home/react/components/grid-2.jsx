const Grid_2 = React.createClass({
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
        }).then(data => this.setState({products: data.products}))
    },
    render: function () {
        let theme_product_item = (product, index) => {
            return (
                <a className="theme-product-item" key={index}
                   href={productLink(product.bizNo)}>
                    <img className="theme-1-img" src={product.img}/>
                    <span className="theme-product-item-name">{product.abbreviation}</span>
                </a>
            )
        };
        return (this.state.products ?
                <div className="theme-1">
                    <a className="activity-theme">
                        <img src="/static/mall/product-list/images/diet.jpg"/></a>
                    <div className="theme-product-wrap">
                        {this.state.products.map(theme_product_item)}
                    </div>
                </div> : null
        )
    }
});
