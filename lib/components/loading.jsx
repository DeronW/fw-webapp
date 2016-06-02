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
                <div className="loader-text"></div>
                <div className="loader-img"></div>
                <div className="loading-info">全力加载中</div>
                <div className="bg"></div>
            </div>
        )
    }
});