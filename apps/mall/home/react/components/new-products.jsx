const NewProducts = React.createClass({
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
        }).then(data => this.setState({ps: data.products}))
    },
    render: function () {
        let {ps} = this.state;

        if (ps) {
            if (ps.length !== this.props.count) return null;
        }
        return ( ps ?
                <div className="new-product-list">
                    <div className="new-title">
                        <img className="new-title-img" src="images/new-title.png"/>
                    </div>
                    <div className="new-product-wrap">
                        <div className="new-left-product">
                            <a className="new-bg-1"
                               href={`/static/mall/product-detail/index.html?bizNo=${this.state.ps[0].bizNo}`}>
                                <img className="new-img1" src={this.state.ps[0].img}/>
                                <span className="new-img1-title">{this.state.ps[0].abbreviation}</span>
                                {/*<span className="new-img1-price">￥128</span>*/}
                            </a>
                        </div>
                        <div className="new-right-product">
                            <div className="new-right-top-product">
                                <a className="new-bg-2"
                                   href={`/static/mall/product-detail/index.html?bizNo=${this.state.ps[1].bizNo}`}>
                                    <div className="new-right-top-wrap">
                                        <img className="new-img2" src={this.state.ps[1].img}/>
                                        <div className="new-right-top-product-info">
                                            <span className="new-img2-title">{this.state.ps[1].abbreviation}</span>
                                            {/*<span className="new-img2-price">1280元起</span>*/}
                                        </div>
                                    </div>
                                </a>
                                <a className="new-bg-3"
                                   href={`/static/mall/product-detail/index.html?bizNo=${this.state.ps[2].bizNo}`}>
                                    <div className="new-right-top-wrap">
                                        <img className="new-img2" src={this.state.ps[2].img}/>
                                        <div className="new-right-top-product-info">
                                            <span className="new-img2-title">{this.state.ps[2].abbreviation}</span>
                                            {/*<span className="new-img2-price">1280元起</span>*/}
                                        </div>
                                    </div>
                                </a>
                            </div>
                            <div className="new-right-btm-product">
                                <a className="new-bg-4"
                                   onClick={() => gotoHandler('/static/mall/product-detail/index.html?bizNo=' + this.state.ps[3].bizNo)}>
                                    <img className="new-img2" src={this.state.ps[3].img}/>
                                    <span className="new-img2-title">{this.state.ps[3].abbreviation}</span>
                                    {/*<span className="new-img2-price">1280元起</span>*/}
                                </a>
                                <a className="new-bg-5"
                                   onClick={() => gotoHandler('/static/mall/product-detail/index.html?bizNo=' + this.state.ps[4].bizNo)}>
                                    <img className="new-img2" src={this.state.ps[4].img}/>
                                    <span className="new-img2-title">{this.state.ps[4].abbreviation}</span>
                                    {/*<span className="new-img2-price">1280元起</span>*/}
                                </a>
                                <a className="new-bg-6"
                                   onClick={() => gotoHandler('/static/mall/product-detail/index.html?bizNo=' + this.state.ps[5].bizNo)}>
                                    <img className="new-img2" src={this.state.ps[5].img}/>
                                    <span className="new-img2-title">{this.state.ps[5].abbreviation}</span>
                                    {/*<span className="new-img2-price">1280元起</span>*/}
                                </a>
                            </div>
                        </div>
                    </div>
                </div> : null
        )
    }
});
