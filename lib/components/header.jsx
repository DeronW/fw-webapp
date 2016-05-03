/*
 parameters
 <Header title={} height={} background={} />
 */

const Header = React.createClass({
    getInitialState: function () {
        let height = parseInt(this.props.height) || 100;
        return {
            height: height,
            background: this.props.background || 'white',
            title: this.props.title
        }
    },
    backClickHandler: function () {
        this.props.back_handler ? this.props.back_handler() : history.back();
    },
    render: function () {
        let fontSize = '40px';
        let style_a = {
            height: this.state.height + 'px'
        };

        let style_b = {
            position: "fixed",
            top: "0px",
            width: "100%",
            height: this.state.height + 'px',
            textAlign: "center",
            lineHeight: this.state.height + 'px',
            background: this.state.background,
            zIndex: '9',
            textShadow: "0 0 8px white",
            fontSize: fontSize
        };

        let style_c = {
            display: "block",
            position: "absolute",
            width: this.state.height + "px",
            height: this.state.height + "px",
            lineHeight: this.state.height + "px",
            fontFamily: "serif",
            fontSize: fontSize,
            fontWeight: 'bold',
            color: "#536f95",
            overflow: "hidden",
            left: "0px",
            top: "0px"
        };

        let style_arm_up = {
            position: "absolute",
            width: "6px",
            height: this.state.height / 4 + "px",
            WebkitTransform: "rotate(45deg)",
            transform: "rotate(45deg)",
            top: "30px",
            left: "50px",
            background: "#536f95"
        };
        let style_arm_down = {
            position: "absolute",
            width: "6px",
            height: this.state.height / 4 + "px",
            WebkitTransform: "rotate(135deg)",
            transform: "rotate(135deg)",
            top: "44px",
            left: "50px",
            background: '#536f95'
        };

        return (
            <div style={style_a}>
                <div style={style_b}>
                    <div style={style_c} onClick={this.backClickHandler}>
                        <div style={style_arm_up}></div>
                        <div style={style_arm_down}></div>
                    </div>
                    {this.state.title}
                </div>
            </div>
        )
    }
});