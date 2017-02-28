const NewProducts = React.createClass({
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
        if (!products || products.length !== this.props.count) return null;

        let get_prd = (n) => products[n] || {};

        return (
            <div className="new-product-list">
                <div className="new-title">
                    <img className="new-title-img" src="images/new-title.png" />
                </div>
                <div className="new-product-wrap">
                    <div className="new-left-product">
                        <a className="new-bg-1"
                            href={`/static/mall/product-detail/index.html?bizNo=${get_prd(0).bizNo}`}>
                            <img className="new-img1" src={get_prd(0).img} />
                            <span className="new-img1-title">{get_prd(0).abbreviation}</span>
                            {/*<span className="new-img1-price">￥128</span>*/}
                        </a>
                    </div>
                    <div className="new-right-product">
                        <div className="new-right-top-product">
                            <a className="new-bg-2"
                                href={`/static/mall/product-detail/index.html?bizNo=${get_prd(1).bizNo}`}>
                                <div className="new-right-top-wrap">
                                    <img className="new-img2" src={get_prd(1).img} />
                                    <div className="new-right-top-product-info">
                                        <span className="new-img2-title">{get_prd(1).abbreviation}</span>
                                        {/*<span className="new-img2-price">1280元起</span>*/}
                                    </div>
                                </div>
                            </a>
                            <a className="new-bg-3"
                                href={`/static/mall/product-detail/index.html?bizNo=${get_prd(2).bizNo}`}>
                                <div className="new-right-top-wrap">
                                    <img className="new-img2" src={get_prd(2).img} />
                                    <div className="new-right-top-product-info">
                                        <span className="new-img2-title">{get_prd(2).abbreviation}</span>
                                        {/*<span className="new-img2-price">1280元起</span>*/}
                                    </div>
                                </div>
                            </a>
                        </div>
                        <div className="new-right-btm-product">
                            <a className="new-bg-4"
                                onClick={() => gotoHandler('/static/mall/product-detail/index.html?bizNo=' + this.state.ps[3].bizNo)}>
                                <img className="new-img2" src={get_prd(3).img} />
                                <span className="new-img2-title">{get_prd(3).abbreviation}</span>
                                {/*<span className="new-img2-price">1280元起</span>*/}
                            </a>
                            <a className="new-bg-5"
                                onClick={() => gotoHandler('/static/mall/product-detail/index.html?bizNo=' + this.state.ps[4].bizNo)}>
                                <img className="new-img2" src={get_prd(4).img} />
                                <span className="new-img2-title">{get_prd(4).abbreviation}</span>
                                {/*<span className="new-img2-price">1280元起</span>*/}
                            </a>
                            <a className="new-bg-6"
                                onClick={() => gotoHandler('/static/mall/product-detail/index.html?bizNo=' + this.state.ps[5].bizNo)}>
                                <img className="new-img2" src={get_prd(5).img} />
                                <span className="new-img2-title">{get_prd(5).abbreviation}</span>
                                {/*<span className="new-img2-price">1280元起</span>*/}
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
});
