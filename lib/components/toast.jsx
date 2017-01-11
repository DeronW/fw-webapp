const GlobalToast = React.createClass({
    getDefaultProps: function () {
        return {duration: 2000, animation: 200}
    },
    getInitialState: function () {
        return {offset: 0, opacity: 0};
    },
    componentDidMount: function () {
        this.timer = setTimeout(this.hideHandler, this.props.duration);
        this.setState({
            offset: ReactDOM.findDOMNode(this.refs.self).offsetWidth,
            opacity: '1'
        });
    },
    hideHandler: function () {
        this.setState({opacity: 0});
        setTimeout(()=> {
            ReactDOM.unmountComponentAtNode(document.getElementById(this.props.id));
        }, this.props.animation)
    },
    componentWillUnmount: function () {
        clearTimeout(this.timer);
        this.props.unMountToast && this.props.unMountToast();
    },
    render: function () {
        let style = {
            position: "fixed",
            textAlign:"center",
            top: "50%",
            left: "50%",
            transform:"translate(-50%,-50%)",
            padding: "18px 28px",
            color: "#fff",
            fontSize: "28px",
            backgroundColor: "rgba(0, 0, 0, 0.6)",
            transition: "opacity " + this.props.animation + "ms ease-in-out",
            opacity: this.state.opacity,
            borderRadius: "5px",
            zIndex: "1000000000"
        };

        return <div className="error-tip" style={style} ref="self">{this.props.text}</div>
    }
});
