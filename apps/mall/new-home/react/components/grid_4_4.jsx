const Grid_4_4 = React.createClass({
    getInitialState:function(){
        return {
            ps:[]
        }
    },
    componentDidMount:function(){
        $FW.Ajax({
            url: `${API_PATH}/mall/api/index/v1/recommendProducts.json`,//人气推荐列表
            data: {recommendBizNo: "TJ0000022", totalCount: 8},
            success: (data) => {
                console.log(data)
                this.setState({ps:data.products});
            }
        });
    },
    render:function(){
        let theme_product_item = (product,index) => {
            return (
                <a className="theme-product-item" key={index} onClick={ () => gotoHandler('/static/mall/product-detail/index.html?bizNo=' + product.bizNo)}>
                    <img className="theme-1-img" src={product.img}/>
                    <span className="theme-product-item-name">{product.abbreviation}</span>
                </a>
            )
        };
        return (
            <div className="theme-1">
                <a href="" className="activity-theme"><img src="images/food-theme-img.png"/></a>
                <div className="theme-product-wrap">
                    {this.state.ps.map(theme_product_item)}
                </div>
            </div>
        )
    }
});