/*
 parameters
 <Loading />

 */

const GlobalLoading = React.createClass({
    componentWillUnmount: function () {
        this.props.unMountHandler && this.props.unMountHandler();
    },
    render: function () {
        let {theme} = this.props;
        let cn = theme == 'mini' ? 'global-ajax-loading-2' : 'global-ajax-loading';
        return (
            <div className={cn}>
                <div className="loader-text"></div>
                <div className="loader-img"></div>
                <div className="loader"></div>
                <div className="loading-info">全力加载中</div>
                <div className="bg"></div>
            </div>
        )
    }
});
