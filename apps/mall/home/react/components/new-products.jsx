const NewProducts = React.createClass({
    getInitialState() {
        return {
            bizNo: this.props.bizNo,
            products: []
        }
    },
    componentDidMount() {
        $FW.Ajax({
            url: `./recommendProducts.json`,
            data: {
                recommendBizNo: this.state.bizNo,
                totalCount: this.props.count
            }
        }).then(data => this.setState({ products: data.products }))
    },
    render: function () {

        let {products} = this.state;
        if (!products || products.length == 0) return null;

        let product1 = products[0] && <div className="new-left-product">
            <a className="new-bg-1"
                href={`/static/mall/product-detail/index.html?bizNo=${products[0].bizNo}`}>
                <img className="new-img1" src={products[0].img} />
                <span className="new-img1-title">{products[0].abbreviation}</span>
                {/*<span className="new-img1-price">￥128</span>*/}
            </a>
        </div>;


        let product2 = products[1] && <a className="new-bg-2"
            href={`/static/mall/product-detail/index.html?bizNo=${products[1].bizNo}`}>
            <div className="new-right-top-wrap">
                <img className="new-img2" src={products[1].img} />
                <div className="new-right-top-product-info">
                    <span className="new-img2-title">{products[1].abbreviation}</span>
                </div>
            </div>
        </a>;

        let product3 = products[2] && <a className="new-bg-3"
            href={`/static/mall/product-detail/index.html?bizNo=${products[2].bizNo}`}>
            <div className="new-right-top-wrap">
                <img className="new-img2" src={products[2].img} />
                <div className="new-right-top-product-info">
                    <span className="new-img2-title">{products[2].abbreviation}</span>
                </div>
            </div>
        </a>;


        let product4 = products[3] && <a className="new-bg-4"
            href={`/static/mall/product-detail/index.html?bizNo=${products[3].bizNo}`}>
            <img className="new-img2" src={products[3].img} />
            <span className="new-img2-title">{products[3].abbreviation}</span>
        </a>;

        let product5 = products[4] && <a className="new-bg-5"
            href={`/static/mall/product-detail/index.html?bizNo=${this.state.ps[4].bizNo}`}>
            <img className="new-img2" src={products[4].img} />
            <span className="new-img2-title">{products[4].abbreviation}</span>
        </a>;

        let product6 = products[5] && <a className="new-bg-6"
            href={`/static/mall/product-detail/index.html?bizNo=${products[5].bizNo}`}>
            <img className="new-img2" src={products[5].img} />
            <span className="new-img2-title">{products[5].abbreviation}</span>
        </a>;

        return (
            <div className="new-product-list">
                <div className="new-title">
                    <img className="new-title-img" src="images/new-title.png" />
                </div>
                <div className="new-product-wrap">
                    {product1}
                    <div className="new-right-product">
                        <div className="new-right-top-product">
                            {product2}
                            {product3}
                        </div>
                        <div className="new-right-btm-product">
                            {product4}
                            {product5}
                            {product6}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
});
