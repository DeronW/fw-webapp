const Grid_5 = React.createClass({
    getInitialState: function () {
        return {
            ps: this.props.data
        }
    },
    render: function () {
        let theme2_top_product_item = (product, index) => {
            return (
                <a className="theme2-top-product-item" key={index}
                   onClick={ () => gotoHandler('/static/mall/product-detail/index.html?bizNo=' + product.bizNo)}>
                    <div
                        className={"theme2-top-product-title theme2-top-product-title-color"+parseInt(index+1)}>{product.abbreviation}</div>
                    <div
                        className="theme2-top-product-price">{product.rmbPrice == 0.00 ? null : "¥" + product.rmbPrice + "+"}{product.score}工分
                    </div>
                    <img className="product-img2" src={product.img}/>
                </a>
            )
        };

        let theme2_btm_product_item = (product, index) => {
            return (
                <a className="theme2-btm-product-item" key={index}
                   onClick={ () => gotoHandler('/static/mall/product-detail/index.html?bizNo=' + product.bizNo)}>
                    <div className="theme2-btm-product-wrap">
                        <img className="theme2-product-img" src={product.img}/>
                        <div className="theme2-btm-product-info">
                            <span className="theme2-btm-product-title">{product.abbreviation}</span>
                            <span
                                className="theme2-btm-product-price">{product.rmbPrice == 0.00 ? null : "¥" + product.rmbPrice + "+"}{product.score}工分</span>
                        </div>
                    </div>
                </a>
            )
        };
        return (
            <div className="theme-2">
                <a href="" className="activity-theme"><img src="images/workshop.jpg"/></a>
                <div className="theme2-product-wrap">
                    <div className="theme2-top-product-list">
                        {this.state.ps.slice(0, 3).map(theme2_top_product_item)}
                    </div>
                    <div className="theme2-btm-product-list">
                        {this.state.ps.slice(3, 9).map(theme2_btm_product_item)}
                    </div>
                </div>
            </div>
        )
    }
});
