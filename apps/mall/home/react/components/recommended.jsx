
const Recommended = React.createClass({
    render: function () {
        let products = this.props.products || [];

        let cont = (product, index)=> {
            return (
                <a key={index}
                   onClick={ () => gotoHandler(`/static/mall/product-detail/index.html?bizNo=${product.bizNo}`) }
                   className={"popular-recommend-a popular-recommend-a" + index}>
                    <img src={product.img || 'images/default-product.jpg'}/>
                    <div className="popular-recommend-title">{product.title}</div>
                    <div className="popular-recommend-score">{product.score ? product.score : 0}工分</div>
                </a>
            )
        };
        return (
            <div className="popular-recommend">
                <img src="images/popular-recommend-ico.png" className="popular-recommend-ico"/>
                <div className="popular-recommend-cont">
                    {products.map(cont)}
                </div>
            </div>
        )
    }
});