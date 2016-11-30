const NewProduct = React.createClass({
    getInitialState:function(){
        return {
            productFirstImage:'',
            productFirstTitle:'',
            productFirstBizNo:'',
            productSecondImage:'',
            productSecondTitle:'',
            productSecondBizNo:'',
            productThirdImage:'',
            productThirdTitle:'',
            productThirdBizNo:'',
            productForthImage:'',
            productForthTitle:'',
            productForthBizNo:'',
            productFifthImage:'',
            productFifthTitle:'',
            productFifthBizNo:'',
            productSixthImage:'',
            productSixthTitle:'',
            productSixthBizNo:''
        }
    },
    componentDidMount:function(){
        $FW.Ajax({
            url: `${API_PATH}/mall/api/index/v1/recommendProducts.json`,//人气推荐列表
            data: {recommendBizNo: "TJ0000022", totalCount: 6},
            success: (data) => {
                console.log(data)
                this.setState({
                    productFirstImage:data.products[0].img,
                    productFirstTitle:data.products[0].abbreviation,
                    productFirstBizNo:data.products[0].bizNo,
                    productSecondImage:data.products[1].img,
                    productSecondTitle:data.products[1].abbreviation,
                    productSecondBizNo:data.products[1].bizNo,
                    productThirdImage:data.products[2].img,
                    productThirdTitle:data.products[2].abbreviation,
                    productThirdBizNo:data.products[2].bizNo,
                    productForthImage:data.products[3].img,
                    productForthTitle:data.products[3].abbreviation,
                    productForthBizNo:data.products[3].bizNo,
                    productFifthImage:data.products[4].img,
                    productFifthTitle:data.products[4].abbreviation,
                    productFifthBizNo:data.products[4].bizNo,
                    productSixthImage:data.products[5].img,
                    productSixthTitle:data.products[5].abbreviation,
                    productSixthBizNo:data.products[5].bizNo
                });
                console.log(this.state.productSecondTitle);
            }
        });
    },
    render: function(){
        return (
            <div className="new-product-list">
                <div className="new-title"><img className="new-title-img" src="images/new-title.png"/></div>
                <div className="new-product-wrap">
                    <div className="new-left-product">
                        <a className="new-bg-1" onClick={ () => gotoHandler('/static/mall/product-detail/index.html?bizNo=' + this.state.productFirstBizNo)}>
                            <img className="new-img1" src={this.state.productFirstImage}/>
                            <span className="new-img1-title">{this.state.productFirstTitle}</span>
                            {/*<span className="new-img1-price">￥128</span>*/}
                        </a>
                    </div>
                    <div className="new-right-product">
                        <div className="new-right-top-product">
                            <a className="new-bg-2" onClick={ () => gotoHandler('/static/mall/product-detail/index.html?bizNo=' + this.state.productSecondBizNo)}>
                                <div className="new-right-top-wrap">
                                    <img className="new-img2" src={this.state.productSecondImage}/>
                                    <div className="new-right-top-product-info">
                                        <span className="new-img2-title">{this.state.productSecondTitle}</span>
                                        {/*<span className="new-img2-price">1280元起</span>*/}
                                    </div>
                                </div>
                            </a>
                            <a className="new-bg-3" onClick={ () => gotoHandler('/static/mall/product-detail/index.html?bizNo=' + this.state.productThirdBizNo)}>
                                <div className="new-right-top-wrap">
                                    <img className="new-img2" src={this.state.productThirdImage}/>
                                    <div className="new-right-top-product-info">
                                        <span className="new-img2-title">{this.state.productThirdTitle}</span>
                                        {/*<span className="new-img2-price">1280元起</span>*/}
                                    </div>
                                </div>
                            </a>
                        </div>
                        <div className="new-right-btm-product">
                            <a className="new-bg-4" onClick={ () => gotoHandler('/static/mall/product-detail/index.html?bizNo=' + this.state.productForthBizNo)}>
                                <img className="new-img2" src={this.state.productForthImage}/>
                                <span className="new-img2-title">{this.state.productForthTitle}</span>
                                {/*<span className="new-img2-price">1280元起</span>*/}
                            </a>
                            <a className="new-bg-5" onClick={ () => gotoHandler('/static/mall/product-detail/index.html?bizNo=' + this.state.productFifthBizNo)}>
                                <img className="new-img2" src={this.state.productFifthImage}/>
                                <span className="new-img2-title">{this.state.productFifthTitle}</span>
                                {/*<span className="new-img2-price">1280元起</span>*/}
                            </a>
                            <a className="new-bg-6" onClick={ () => gotoHandler('/static/mall/product-detail/index.html?bizNo=' + this.state.productSixthBizNo)}>
                                <img className="new-img2" src={this.state.productSixthImage}/>
                                <span className="new-img2-title">{this.state.productSixthTitle}</span>
                                {/*<span className="new-img2-price">1280元起</span>*/}
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
});
