const Grid_2 = React.createClass({
    getInitialState: function () {
        return {
            ps: this.props.data
        }
    },
    render: function () {
        let theme4_top_product_item = (product, index) => {
            return (
                <a className="theme4-top-product-item" key={index}
                   onClick={ () => gotoHandler('/static/mall/product-detail/index.html?bizNo=' + product.bizNo)}>
                    <span
                        className={"theme4-top-product-title theme4-top-product-title-color"+parseInt(index+1)}>{product.abbreviation}</span>
                    <span
                        className="theme4-top-product-price">{product.rmbPrice == 0.00 ? null : "¥" + product.rmbPrice + "+"}{product.score}工分</span>
                    <span className={"horizon-line theme4-top-line-color"+parseInt(index+1)}></span>
                    <img className="theme4-top-product-img" src={product.img}/>
                </a>
            )
        };
        return (
            <div className="theme-4">
                <a href="" className="activity-theme"><img src="images/outdoor-theme-img.png"/></a>
                <div className="theme4-product-wrap">
                    <div className="theme4-top-product-list">
                        {this.state.ps.slice(0, 4).map(theme4_top_product_item)}
                    </div>
                    <div className="theme4-btm-product-list">
                        <div className="theme4-btm-left-product-item">
                            <a className="theme4-btm-left-product-wrap"
                               onClick={ () => gotoHandler('/static/mall/product-detail/index.html?bizNo=' + this.state.ps[4].bizNo)}>
                                <img className="theme4-btm-product-img" src={this.state.ps[4].img}/>
                                <span
                                    className="theme4-btm-product-title theme4-btm-product-title-color1">{this.state.ps[4].abbreviation}</span>
                                <span
                                    className="theme4-btm-product-price">{this.state.ps[4].rmbPrice == 0.00 ? null : "¥" + this.state.ps[4].rmbPrice + "+"}{this.state.ps[4].score}工分</span>
                                <span className="product-purchase theme4-btm-product-title-color1">点击抢购<span
                                    className="tri tri-btm-color1"></span></span>
                            </a>
                        </div>
                        <div className="theme4-btm-middle-product-wrap">
                            <a className="theme4-btm-middle-product-item"
                               onClick={ () => gotoHandler('/static/mall/product-detail/index.html?bizNo=' + this.state.ps[5].bizNo)}>
                                <div className="theme4-btm-middle-top-product-wrap">
                                    <div className="theme4-btm-img-wrap">
                                        <img className="theme4-btm-product-img" src={this.state.ps[5].img}/>
                                    </div>
                                    <div className="theme4-btm-middle-top-info">
                                        <span
                                            className="theme4-btm-product-title theme4-btm-product-title-color2">{this.state.ps[5].abbreviation}</span>
                                        <span
                                            className="theme4-btm-product-price">{this.state.ps[5].rmbPrice == 0.00 ? null : "¥" + this.state.ps[5].rmbPrice + "+"}{this.state.ps[5].score}工分</span>
                                        <span className="product-purchase theme4-btm-product-title-color2">点击抢购<span
                                            className="tri tri-btm-color2"></span></span>
                                    </div>
                                </div>
                            </a>
                            <a className="theme4-btm-middle-product-item"
                               onClick={ () => gotoHandler('/static/mall/product-detail/index.html?bizNo=' + this.state.ps[6].bizNo)}>
                                <div className="theme4-btm-middle-top-product-wrap">
                                    <div className="theme4-btm-img-wrap">
                                        <img className="theme4-btm-product-img" src={this.state.ps[6].img}/>
                                    </div>
                                    <div className="theme4-btm-middle-top-info">
                                        <span
                                            className="theme4-btm-product-title theme4-btm-product-title-color3">{this.state.productSeventhTitle}</span>
                                        <span
                                            className="theme4-btm-product-price">{this.state.ps[6].rmbPrice == 0.00 ? null : "¥" + this.state.ps[6].rmbPrice + "+"}{this.state.ps[6].score}工分</span>
                                        <span className="product-purchase theme4-btm-product-title-color3">点击抢购<span
                                            className="tri tri-btm-color3"></span></span>
                                    </div>
                                </div>
                            </a>
                        </div>
                        <div className="theme4-btm-right-product-wrap">
                            <a onClick={ () => gotoHandler('/static/mall/product-detail/index.html?bizNo=' + this.state.ps[7].bizNo)}>
                                <img className="theme4-btm-product-img" src={this.state.ps[7].img}/>
                            </a>
                            <a onClick={ () => gotoHandler('/static/mall/product-detail/index.html?bizNo=' + this.state.ps[7].bizNo)}>
                                <img className="theme4-btm-product-img" src={this.state.ps[7].img}/>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
});
