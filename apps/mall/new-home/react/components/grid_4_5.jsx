const Grid_4_5 = React.createClass({
    getInitialState:function(){
        return {
            ps:[],
            productFifthImage:'',
            productFifthTitle:'',
            productFifthPrice:'',
            productFifthScore:'',
            productFifthBizNo:'',
            productSixthImage:'',
            productSixthTitle:'',
            productSixthPrice:'',
            productSixthScore:'',
            productSixthBizNo:'',
            productSeventhImage:'',
            productSeventhTitle:'',
            productSeventhPrice:'',
            productSeventhScore:'',
            productSeventhBizNo:'',
            productEighthImage:'',
            productEighthBizNo:'',
            productNinthImage:'',
            productNinthBizNo:''
        }
    },
    componentDidMount:function(){
        $FW.Ajax({
            url: `${API_PATH}/mall/api/index/v1/recommendProducts.json`,//人气推荐列表
            data: {recommendBizNo: "TJ0000022", totalCount: 10},
            success: (data) => {
                console.log(data)
                this.setState({
                    ps:data.products,
                    productFifthImage:data.products[4].img,
                    productFifthTitle:data.products[4].abbreviation,
                    productFifthPrice:data.products[4].rmbPrice,
                    productFifthScore:data.products[4].score,
                    productFifthBizNo:data.products[4].bizNo,
                    productSixthImage:data.products[5].img,
                    productSixthTitle:data.products[5].abbreviation,
                    productSixthPrice:data.products[5].rmbPrice,
                    productSixthScore:data.products[5].score,
                    productSixthBizNo:data.products[5].bizNo,
                    productSeventhImage:data.products[6].img,
                    productSeventhTitle:data.products[6].abbreviation,
                    productSeventhPrice:data.products[6].rmbPrice,
                    productSeventhScore:data.products[6].score,
                    productSeventhBizNo:data.products[6].bizNo,
                    productEighthImage:data.products[7].img,
                    productEighthBizNo:data.products[7].bizNo,
                    productNinthImage:data.products[8].img,
                    productNinthBizNo:data.products[8].bizNo
                });
            }
        });
    },
    render:function(){
        let theme4_top_product_item = (product,index) => {
            return (
                <a className="theme4-top-product-item" key={index} onClick={ () => gotoHandler('/static/mall/product-detail/index.html?bizNo=' + product.bizNo)}>
                    <span className={"theme4-top-product-title theme4-top-product-title-color"+parseInt(index+1)}>{product.abbreviation}</span>
                    <span className="theme4-top-product-price">{product.rmbPrice==0.00? null:"&yen;"+product.rmbPrice+"+"}+{product.score}工分</span>
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
                        {this.state.ps.slice(0,4).map(theme4_top_product_item)}
                    </div>
                    <div className="theme4-btm-product-list">
                        <div className="theme4-btm-left-product-item">
                            <a className="theme4-btm-left-product-wrap" onClick={ () => gotoHandler('/static/mall/product-detail/index.html?bizNo=' + this.state.productFifthBizNo)}>
                                <img className="theme4-btm-product-img" src={this.state.productFifthImage}/>
                                <span className="theme4-btm-product-title theme4-btm-product-title-color1">{this.state.productFifthTitle}</span>
                                <span className="theme4-btm-product-price">&yen;{this.state.productFifthPrice}+{this.state.productFifthScore}工分</span>
                                <span className="product-purchase theme4-btm-product-title-color1">点击抢购<span className="tri tri-btm-color1"></span></span>
                            </a>
                        </div>
                        <div className="theme4-btm-middle-product-wrap">
                            <a className="theme4-btm-middle-product-item" onClick={ () => gotoHandler('/static/mall/product-detail/index.html?bizNo=' + this.state.productSixthBizNo)}>
                                <div className="theme4-btm-middle-top-product-wrap">
                                    <div className="theme4-btm-img-wrap">
                                        <img className="theme4-btm-product-img" src={this.state.productSixthImage}/>
                                    </div>
                                    <div className="theme4-btm-middle-top-info">
                                        <span className="theme4-btm-product-title theme4-btm-product-title-color2">{this.state.productSixthTitle}</span>
                                        <span className="theme4-btm-product-price">{this.state.productSixthPrice==0.00? null:"&yen;"+this.state.productSixthPrice+"+"}+{this.state.productSixthScore}工分</span>
                                        <span className="product-purchase theme4-btm-product-title-color2">点击抢购<span className="tri tri-btm-color2"></span></span>
                                    </div>
                                </div>
                            </a>
                            <a className="theme4-btm-middle-product-item" onClick={ () => gotoHandler('/static/mall/product-detail/index.html?bizNo=' + this.state.productSeventhBizNo)}>
                                <div className="theme4-btm-middle-top-product-wrap">
                                    <div className="theme4-btm-img-wrap">
                                        <img className="theme4-btm-product-img" src={this.state.productSeventhImage}/>
                                    </div>
                                    <div className="theme4-btm-middle-top-info">
                                        <span className="theme4-btm-product-title theme4-btm-product-title-color3">{this.state.productSeventhTitle}</span>
                                        <span className="theme4-btm-product-price">&yen;{this.state.productSeventhPrice==0.00? null:"&yen;"+this.state.productSeventhPrice+"+"}+{this.state.productSeventhScore}工分</span>
                                        <span className="product-purchase theme4-btm-product-title-color3">点击抢购<span className="tri tri-btm-color3"></span></span>
                                    </div>
                                </div>
                            </a>
                        </div>
                        <div className="theme4-btm-right-product-wrap">
                            <a onClick={ () => gotoHandler('/static/mall/product-detail/index.html?bizNo=' + this.state.productEighthBizNo)}>
                                <img className="theme4-btm-product-img" src={this.state.productEighthImage}/>
                            </a>
                            <a onClick={ () => gotoHandler('/static/mall/product-detail/index.html?bizNo=' + this.state.productNinthBizNo)}>
                                <img className="theme4-btm-product-img" src={this.state.productNinthImage}/>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
});