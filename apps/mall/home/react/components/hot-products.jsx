const HotProducts = React.createClass({
    getInitialState() {
        return {
            bizNo: this.props.bizNo,
            ps: []
        }
    },
    componentDidMount() {
        $FW.Ajax({
            url: `${API_PATH}mall/api/index/v1/recommendProducts.json`,
            data: {
                recommendBizNo: this.state.bizNo,
                totalCount: this.props.count
            }
        }).then(data => this.setState({ ps: data.products }))
    },
    render: function () {
        let hot_product_item = (product, index) => {
            return (
                <a className={`hot-product-item hot-product-item-bg-${index + 1}`} key={index}
                    href={`/static/mall/product-detail/index.html?bizNo=${product.bizNo}`}>
                    <img className="hot-img" src={product.img} />
                    <span className={"hot-img-title hot-img-title-color-" + parseInt(index + 1)}>
                        {product.abbreviation}</span>
                    <span
                        className="hot-img-price">
                        {product.rmbPrice != 0 && `¥${product.rmbPrice}`}
                        {product.rmbPrice == 0 || product.score == 0 ? "" : "+"}
                        {product.score != 0 && `${product.score}工分`}
                    </span>
                </a>
            )
        };
        return (
            <div className="hot-product-list">
                <div className="hot-title"><img className="hot-title-img" src="images/hot-title.png" /></div>
                <div className="hot-product-wrap">
                    {this.state.ps.map(hot_product_item)}
                </div>
            </div>
        )
    }
});
