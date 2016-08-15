const GlobalToast = React.createClass({
    getInitialState: function() {
        return {
            objW: 0
        };
    },
    componentDidMount: function() {
        var _this = this;

        this.timeoutId = setTimeout(function() {
            ReactDOM.unmountComponentAtNode(document.getElementById(_this.props.id));
            _this.props.unMountToast();    
            
        }, 1500);

        this.setState({
            objW: ReactDOM.findDOMNode(this.refs.wDom).offsetWidth
        });
    },
    componentWillUnmount: function() {
        clearTimeout(this.timeoutId);
    },
    render: function() {
        var w = -(this.state.objW / 2);

        let style = {
            position: "fixed",
            top: "50%",
            left: "50%",
            height: "30px",
            margin: "-100px 0 0 " + w + 'px',
            padding: "28px 38px",
            color: "#fff",
            fontSize: "33px",
            backgroundColor: "rgba(0, 0, 0, 0.6)",
            borderRadius: "5px"
        };


        return (
            <div className="error-tip" style={style} ref="wDom">{this.props.text}</div>            
        );
    }
});