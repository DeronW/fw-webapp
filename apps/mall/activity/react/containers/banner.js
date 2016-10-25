((global) => {

    let mapStateToProps = (state, ownProps) => {
        return {
            image: state.banner.image,
            desc: state.banner.desc,
            show: state.banner.show
        }
    };

    let mapDispatchToProps = (dispatch, ownProps) => ({
        onClick: () => dispatch(toggleBanner())
    });

    global.BannerContainer = ReactRedux.connect(
        mapStateToProps,
        mapDispatchToProps
    )(Banner);

})(window);

