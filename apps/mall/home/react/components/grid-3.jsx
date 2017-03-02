function fmtPrice(v) {
    return v != 0 && `¥${v}+`
}

const Grid_3 = React.createClass({
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

        let theme4_top_product_item = (product, index) => {
            return (
                <a className="theme4-top-product-item" key={index}
                   href={productLink(product.bizNo)}>
                    <span
                        className={"theme4-top-product-title theme4-top-product-title-color" + parseInt(index + 1)}>{product.abbreviation}</span>
                    <span
                        className="theme4-top-product-price">
                        {product.rmbPrice == 0 ? null : `¥${product.rmbPrice}`}
                        {product.rmbPrice == 0 || product.score == 0 ? "" : "+"}
                        {product.score == 0 ? null : `${product.score}工分`}
                    </span>
                    <span className={"horizon-line theme4-top-line-color" + parseInt(index + 1)}></span>
                    <img className="theme4-top-product-img" src={product.img}/>
                </a>
            )
        };

        let get_prd = (n) => products[n] || {};

        return (
            <div className="theme-4">
                <a className="activity-theme" href= '/static/mall/product-list/index.html?searchSourceType=0&category=living&title=家居生活'>
                    <img src="/static/mall/product-list/images/living.jpg"/></a>
                <div className="theme4-product-wrap">
                    <div className="theme4-top-product-list">
                        {products.slice(0, 4).map(theme4_top_product_item)}
                    </div>
                    <div className="theme4-btm-product-list">
                        <div className="theme4-btm-left-product-item">
                            <a className="theme4-btm-left-product-wrap" href={productLink(products[4].bizNo)}>
                                <img className="theme4-btm-product-img" src={products[4].img}/>
                                <span
                                    className="theme4-btm-product-title theme4-btm-product-title-color1">{products[4].abbreviation}</span>
                                <span
                                    className="theme4-btm-product-price">
                                    {fmtPrice(products[4].rmbPrice)}
                                    {products[4].score}工分</span>
                                <span className="product-purchase theme4-btm-product-title-color1">点击抢购<span
                                    className="tri tri-btm-color1"></span></span>
                            </a>
                        </div>
                        <div className="theme4-btm-middle-product-wrap">
                            <a className="theme4-btm-middle-product-item"
                               onClick={() => gotoHandler('/static/mall/product-detail/index.html?bizNo=' + products[5].bizNo)}>
                                <div className="theme4-btm-middle-top-product-wrap">
                                    <div className="theme4-btm-img-wrap">
                                        <img className="theme4-btm-product-img" src={get_prd(5).img}/>
                                    </div>
                                    <div className="theme4-btm-middle-top-info">
                                        <span
                                            className="theme4-btm-product-title theme4-btm-product-title-color2">{get_prd(5).abbreviation}</span>
                                        <span
                                            className="theme4-btm-product-price">
                                            {fmtPrice(get_prd(5).rmbPrice)}
                                            {get_prd(5).score}工分</span>
                                        <span className="product-purchase theme4-btm-product-title-color2">点击抢购<span
                                            className="tri tri-btm-color2"></span></span>
                                    </div>
                                </div>
                            </a>
                            <a className="theme4-btm-middle-product-item"
                               onClick={() => gotoHandler('/static/mall/product-detail/index.html?bizNo=' + get_prd(6).bizNo)}>
                                <div className="theme4-btm-middle-top-product-wrap">
                                    <div className="theme4-btm-img-wrap">
                                        <img className="theme4-btm-product-img" src={get_prd(6).img}/>
                                    </div>
                                    <div className="theme4-btm-middle-top-info">
                                        <span
                                            className="theme4-btm-product-title theme4-btm-product-title-color3">{this.state.productSeventhTitle}</span>
                                        <span
                                            className="theme4-btm-product-price">
                                            {fmtPrice(get_prd(6).rmbPrice)}
                                            {get_prd(6).score}工分</span>
                                        <span className="product-purchase theme4-btm-product-title-color3">点击抢购<span
                                            className="tri tri-btm-color3"></span></span>
                                    </div>
                                </div>
                            </a>
                        </div>
                        <div className="theme4-btm-right-product-wrap">
                            <a href={'/static/mall/product-detail/index.html?bizNo=' + get_prd(7).bizNo}>
                                <img className="theme4-btm-product-img" src={get_prd(7).img}/>
                            </a>
                            <a href={'/static/mall/product-detail/index.html?bizNo=' + get_prd(8).bizNo}>
                                <img className="theme4-btm-product-img" src={get_prd(8).img}/>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
});
