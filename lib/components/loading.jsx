/*
 parameters
 <Loading />

 */

const GlobalLoading = React.createClass({
    getInitialState: function () {
        return {}
    },
    componentWillUnmount: function () {
        this.props.unMountHandler && this.props.unMountHandler();
    },
    render: function () {
        return (
            <div className="global-ajax-loading">
                <div className="bg"></div>
                <div className="loader">Loading...</div>
            </div>
        )
    }
});