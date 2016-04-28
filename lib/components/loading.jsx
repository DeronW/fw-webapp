/*
 parameters
 <Loading />

 */

const GlobalLoading = React.createClass({
    getInitialState: function () {
        return {}
    },
    hideHandler: function () {
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