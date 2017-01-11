const ProductPanel = React.createClass({
    //getInitialState: function () {
    //    return {count: this.props.product_count}
    //},
    render: function () {
        let product_item = (p,index) => {
            return (
                <div className="list" key={index}>
                    <img src={'images'+p.previewTitleImage || 'images/default-product.jpg'} className="list-img"/>
                    <div className="title">{p.productName}</div>
                    {/*<div className="mark">
                        { p.tags.map((d, index) => <div key={index}>{d}</div>) }
                    </div>*/}
                    <div className="price-box">
                        { p.rmbPrice > 0 || p.pointsPrice == 0 ? <span>&yen;{p.rmbPrice}</span> : null}
                        { p.rmbPrice > 0 && p.pointsPrice ? <span>+</span> : null }
                        { p.pointsPrice ? <span>{p.pointsPrice}工分</span> : null }
                        <span className="num-modifyBox"><span className="num-quantity">×</span>{p.tempProductNum}</span>
                    </div>
                </div>
            )
        }

        return (
            <div className="pro-order">
                {this.props.product.map(product_item)}
                {/*<div className="total-box">
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
                </div>*/}
            </div>
        )
    }
});
