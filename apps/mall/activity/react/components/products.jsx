((global)=> {


    let ProductItem = (props, index)=> {
        let price, score, angle;
        if (props.price > 0) {
            price = <span className="list-price-num">{$FW.Format.currency(props.price)}</span>
        }

        if (parseFloat(props.score) > 0) {
            score = (
                <span className="list-price-score">
                    {props.price > 0 ? <span>+</span> : null}
                    {props.score}工分
                </span>
            )
        }

        if (props.angle_text) {
            angle = <div className="list-label">{props.angle_text}</div>
        }

        let cover_bg = 'url(' + (props.img || 'images/default-product.jpg') + ')';
        let href = `/static/mall/product-detail/index.html?bizNo=${props.bizNo}`;

        return (
            <a href={href} className="index-actList-a"
               key={index}>
                <div className="list-img" style={{backgroundImage: cover_bg}}></div>
                {angle}
                <div className="list-name">{props.title}</div>
                <div className="list-mark">
                    { (props.tags || []).map((d, index) => <div key={index}>{d}</div>) }
                </div>
                <div className="list-price-box">
                    <div className="list-price">
                        {props.price > 0 ? <span className="list-price-mark">&yen;</span> : null}
                        {price}
                        {score}
                    </div>
                    <div className="list-sold">
                        <span>累计销量 </span>
                        <span>{props.sales}</span>
                    </div>
                </div>
            </a>
        )
    };

    global.Products = ({products}) => {

        return (
            <div className="products-act">
                <div className="index-actList-list">
                    { products.map(ProductItem) }
                </div>
                <div className="auth-info only-in-ios-app">以上活动由金融工场主办 与Apple Inc.无关</div>
            </div>
        )
    };

    Products.propTypes = {
        products: React.PropTypes.array.isRequired
    };

})(window);