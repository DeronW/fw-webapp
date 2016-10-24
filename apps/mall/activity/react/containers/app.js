((global) => {

    let App = React.createClass({
        componentDidMount: function () {
            let {dispatch} = this.props;

            dispatch(fetchActivity());
            dispatch(fetchProducts(1));

            $FW.Event.touchBottom((done)=> {
                if (this.props.page < this.props.total_page) {
                    dispatch(fetchProducts(this.props.page + 1, done));
                    // setTimeout(done, 1000);
                }
            });
        },
        render: function () {
            return (
                <div>
                    {this.props.showBanner ? <BannerContainer /> : null}
                    <ProductContainer />
                </div>
            )
        }
    });

    App.propTypes = {
        dispatch: React.PropTypes.func.isRequired,
        showBanner: React.PropTypes.bool.isRequired
    };

    function mapStateToProps(state) {
        return {
            showBanner: !!state.banner,
            page: state.product.page,
            total_page: state.product.total_page
        }
    }

    global.AppContainer = ReactRedux.connect(mapStateToProps)(App)
})(window);