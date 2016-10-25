const ProductItem = React.createClass({
    render: function () {

        let {img, title, sales, tags, angle_type, angle_text} = this.props;

        var price = 0;
        if (this.props.price == 0 && this.props.score == 0) {
            price = <span className="list-price-num">¥0</span>
        } else if (this.props.price == 0) {
            price = <span className="list-price-num"> </span>
        } else if (this.props.price >= 0) {
            price = <span className="list-price-num">{$FW.Format.currency(this.props.price)}</span>
        } else {
            price = null
        }

        let score = "";
        if (parseFloat(this.props.score) > 0) {
            score = (
                <span className="list-price-score">
                    {this.props.price > 0 ? <span>+</span> : null}
                    {this.props.score}工分
                </span>
            )
        }

        let angle;
        if (this.props.price > 0) {
            angle = <div className={`list-label ${angle_type}`}>{angle_text}</div>
        }

        let yuan;
        if (this.props.price > 0) {
            yuan = <span className="list-price-mark">&yen;</span>
        }

        return (
            <a onClick={ () => gotoHandler(`/static/mall/product-detail/index.html?bizNo=${this.props.bizNo}`) }
               className="index-actList-a">
                <div className="list-img">
                    <img src={img || 'images/default-product.jpg'}/>
                </div>
                {angle}
                <div className="product-content-wrap">
                    <div className="list-name">{title}</div>
                    <div className="list-mark">
                        { tags.map((d, index) => <div key={index}>{d}</div>) }
                    </div>
                    <div className="list-price-box">
                        <div className="list-price">
                            {yuan} {price} {score}
                        </div>
                        <div className="list-sold">
                            <span>累计销量 </span>
                            <span>{sales}</span>
                        </div>
                    </div>
                </div>

            </a>
        )
    }
});
