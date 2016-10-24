((global) => {

    let mapStateToProps = (state, ownProps) => {
        return {products: state.product.products}
    };

    global.ProductContainer = ReactRedux.connect(
        mapStateToProps
    )(Products);

})(window);

