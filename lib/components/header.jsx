const Header = React.createClass({
    getInitialState: function () {
        return {}
    },
    backClickHandler: function () {
        this.props.back_handler ? this.props.back_handler() : location.back();
    },
    render: function () {
        let style_a = {
            height: "100px"
        };

        let style_b = {
            position: "fixed",
            top: "0",
            width: "100%",
            height: "100px",
            textAlign: "center",
            lineHeight: "100px",
            fontSize: "40px"
        };

        let style_c = {
            display: "block",
            position: "absolute",
            width: "100px",
            height: "100px",
            lineHeight: "100px",
            fontSize: "40px",
            left: "0",
            top: "0"
        };

        return (
            <div style={style_a}>
                <div style={style_b}>
                    <b style={style_c} onClick={this.backClickHandler}>&lt;</b>
                    {this.props.title}
                </div>
            </div>
        )
    }
});