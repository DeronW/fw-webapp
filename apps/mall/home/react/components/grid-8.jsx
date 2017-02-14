const Grid_8 = React.createClass({
    getInitialState: function () {
        return {
            ps: this.props.data
        }
    },
    render() {
        let theme3_top_product_item = (product, index) => {
            return (
                <a className="theme3-top-product-item" key={index}
                   href={`/static/mall/product-detail/index.html?bizNo=${product.bizNo}`}>
                    <div className="theme3-top-product-wrap">
                        <div className="theme3-top-product-info">
                            <span
                                className={"theme3-top-product-title theme3-top-product-title-color" + parseInt(index + 1)}>{product.abbreviation}</span>
                            <span
                                className="theme3-top-product-price">{product.rmbPrice == 0.00 ? null : "¥" + product.rmbPrice + "+"}
                                {product.score == 0 ? null : "+" + product.score + "工分"}
                            </span>
                            <span
                                className={"product-purchase theme3-top-product-title-color" + parseInt(index + 1)}>点击抢购<span
                                className={"tri tri-color" + parseInt(index + 1)}></span></span>
                        </div>
                        <img className="theme3-product-img" src={product.img}/>
                    </div>
                </a>
            )
        };

        let theme3_btm_product_item = (product, index) => {
            return (
                <a className="theme3-btm-product-item" key={index}
                   href={`/static/mall/product-detail/index.html?bizNo=${product.bizNo}`}>
                    <img className="theme3-btm-product-img" src={product.img}/>
                    <span className="theme3-btm-product-title">{product.abbreviation}</span>
                </a>
            )
        };

        return (
            <div className="theme-3">
                <a href="" className="activity-theme"><img
                    src="static/mall/product-list/images/maternalInfantEducation.jpg"/></a>
                <div className="theme3-product-wrap">
                    <div className="theme3-top-product-list">
                        {this.state.ps.slice(0, 6).map(theme3_top_product_item)}
                    </div>
                    <div className="theme3-btm-product-list">
                        {this.state.ps.slice(6, 10).map(theme3_btm_product_item)}
                    </div>
                </div>
            </div>
        )
    }
});
