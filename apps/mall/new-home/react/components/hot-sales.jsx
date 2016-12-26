const HotSales = React.createClass({
    getInitialState: function () {
        return {
            page: 1,
            hasData: true,
            column: []
        }
    },

    componentDidMount: function () {
        $FW.Ajax(`${API_PATH}/mall/api/index/v1/hotProducts.json?count=6`)
            .then((data)=> this.setState({column: data.products}));

        $FW.Event.touchBottom(this.loadMoreProductHandler);
    },

    loadMoreProductHandler: function (done) {
        this.setState({page: this.state.page + 1});
        let arr = [];
        this.state.hasData ?
            $FW.Ajax({
                url: `${API_PATH}/mall/api/index/v1/hotProducts.json`,//人气热卖列表
                data: {count: 6, page: this.state.page},
                enable_loading: true,
                success: (data) => {
                    let products = data;
                    this.setState({
                        column: [...this.state.column, ...products],
                        hasData: !!products.length
                    })
                    /*
                     if (data.products) {
                     data.products.map((item, index) => arr.push(item))
                     this.setState(prevState=>({
                     column: prevState.column.concat(arr)
                     }));
                     }
                     else {
                     this.setState({hasData: false});
                     }*/
                     done && done()
                }
            }) : null
    },

    render: function () {
        let hotProduct = (product, index)=> {
            return (
                <a className="product-wrap" key={index}
                   onClick={ () => gotoHandler('/static/mall/new-product-detail/index.html?bizNo=' + product.bizNo)}>
                    <img src={product.img}/>
                    <span className="product-name">{product.title}</span>
                    <span className="product-price">{product.score}工分</span>
                </a>
            )
        }

        return (
            <div className="hot-sales">
                <div className="hot-sales-title"><img src="images/hot-sale.png"/></div>
                <div className="product-list">
                    {this.state.column.map(hotProduct)}
                </div>
            </div>
        )
    }
});
