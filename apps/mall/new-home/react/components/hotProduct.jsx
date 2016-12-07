const HotProduct = React.createClass({
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
    render: function(){
        let hot_product_item = (product,index) => {
            return (
                <a className={"hot-product-item hot-product-item-bg-"+parseInt(index+1)} key={index} onClick={ () => gotoHandler('/static/mall/new-product-detail/index.html?bizNo=' + product.bizNo)}>
                    <img className="hot-img" src={product.img}/>
                    <span className={"hot-img-title hot-img-title-color-"+parseInt(index+1)}>{product.abbreviation}</span>
                    <span className="hot-img-price">&yen;{product.rmbPrice}+{product.score}工分</span>
                </a>
            )
        };
        return (
            <div className="hot-product-list">
                <div className="hot-title"><img className="hot-title-img" src="images/hot-title.png"/></div>
                <div className="hot-product-wrap">
                    {this.state.ps.map(hot_product_item)}
                </div>
            </div>
        )
    }
});