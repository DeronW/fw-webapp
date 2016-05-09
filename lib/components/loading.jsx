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
                <div className="loader-img"
                     style={{backgroundImage: 'url(' + STATIC_PATH + 'images/common-ajax-loading.gif)'}}></div>
                <div className="bg"></div>
            </div>
        )
    }
});