/*
 parameters
 <Header title={} height={} background={} />
 */

const Header = React.createClass({
    getInitialState: function () {
        let height = parseInt(this.props.height) || 100;
        return {
            height: height,
            background: this.props.background || "#ebebee",
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
            left: "0px",
            top: "0px"
        };

        let style_btn_bg = {
            position: 'absolute'
        };

        return (
            <div style={style_a}>
                <div style={style_b}>
                    <div style={style_c} onClick={this.backClickHandler}>&lt;<div style={style_btn_bg}></div></div>
                    {this.state.title}
                </div>
            </div>
        )
    }
});
