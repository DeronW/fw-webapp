const Grid_6_4 = React.createClass({
    getInitialState:function(){
        return {
            ps:[]
        }
    },
    componentDidMount:function(){
        $FW.Ajax({
            url: `${API_PATH}/mall/api/index/v1/recommendProducts.json`,//人气推荐列表
            data: {recommendBizNo: "TJ0000022", totalCount: 10},
            success: (data) => {
                console.log(data)
                this.setState({ps:data.products});
            }
        });
    },
    render:function(){
        let theme3_top_product_item = (product,index) => {
            return (
                <a className="theme3-top-product-item" key={index} onClick={ () => gotoHandler('/static/mall/product-detail/index.html?bizNo=' + product.bizNo)}>
                    <div className="theme3-top-product-wrap">
                        <div className="theme3-top-product-info">
                            <span className={"theme3-top-product-title theme3-top-product-title-color"+parseInt(index+1)}>{product.abbreviation}</span>
                            <span className="theme3-top-product-price">&yen;{product.rmbPrice}+{product.score}工分</span>
                            <span className={"product-purchase theme3-top-product-title-color"+parseInt(index+1)}>点击抢购<span className={"tri tri-color"+parseInt(index+1)}></span></span>
                        </div>
                        <img className ="theme3-product-img" src={product.img}/>
                    </div>
                </a>
            )
        };

        let theme3_btm_product_item = (product,index) => {
            return (
                <a className="theme3-btm-product-item" key={index} onClick={ () => gotoHandler('/static/mall/product-detail/index.html?bizNo=' + product.bizNo)}>
                    <img className="theme3-btm-product-img" src={product.img}/>
                    <span className="theme3-btm-product-title">{product.abbreviation}</span>
                </a>
            )
        };

        return (
            <div className="theme-3">
                <a href="" className="activity-theme"><img src="images/life-theme-img.png"/></a>
                <div className="theme3-product-wrap">
                    <div className="theme3-top-product-list">
                        {this.state.ps.slice(0,6).map(theme3_top_product_item)}
                    </div>
                    <div className="theme3-btm-product-list">
                        {this.state.ps.slice(6,10).map(theme3_btm_product_item)}
                    </div>
                </div>
            </div>
        )
    }
});