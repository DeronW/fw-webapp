const Grid_2 = React.createClass({
    getInitialState: function () {
        return {
            ps: this.props.data
        }
    },
    render: function () {
        let theme_product_item = (product, index) => {
            return (
                <a className="theme-product-item" key={index}
                   onClick={ () => gotoHandler('/static/mall/product-detail/index.html?bizNo=' + product.bizNo)}>
                    <img className="theme-1-img" src={product.img}/>
                    <span className="theme-product-item-name">{product.abbreviation}</span>
                </a>
            )
        };
        return (
            <div className="theme-1">
                <a href="" className="activity-theme"><img src="static/mall/product-list/images/fantasy.jpg"/></a>
                <div className="theme-product-wrap">
                    {this.state.ps.map(theme_product_item)}
                </div>
            </div>
        )
    }
});
