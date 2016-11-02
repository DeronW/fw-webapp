const ProductPanel = React.createClass({
    getInitialState: function () {
        return {count: this.props.product_count}
    },
    decreaseHandler: function () {
        let count = this.state.count - 1;
        if (count <= 0) count = 1;
        this.setState({count: count});
        this.props.update_product_count_handler(count);
    },
    increaseHandler: function () {
        let c = parseInt(this.state.count);
        this.setState({count: c + 1});
        this.props.update_product_count_handler(c + 1);
    },
    render: function () {
        let p = this.props.product;

        return (
            <div className="pro-order">
                <div className="list">
                    <img src={p.img || 'images/default-product.jpg'} className="list-img"/>
                    <div className="title">{p.title}</div>
                    <div className="mark">
                        { p.tags.map((d, index) => <div key={index}>{d}</div>) }
                    </div>
                    <div className="price-box">
                        { p.price > 0 || p.score == 0 ? <span>&yen;{p.price}</span> : null}
                        { p.price > 0 && p.score ? <span>+</span> : null }
                        { p.score ? <span>{p.score}工分</span> : null }
                        <span className="num-modifyBox"><span className="num-quantity">×</span>{this.state.count}</span>
                    </div>
                </div>
                <div className="total-box">
                    <div className="total-money">
                        <span>合计：</span>
                        {p.price > 0 || p.score == 0 ?
                            <span>&yen;{$FW.Format.currency(this.state.count * p.price)}</span> : null}
                        {p.price > 0 && p.score ? ' + ' : null}
                        {p.score ? <span>{p.score * this.state.count}工分</span> : null}
                    </div>
                    <div className="total-text">
                        共{this.state.count}件商品
                    </div>
                </div>
            </div>
        )
    }
});