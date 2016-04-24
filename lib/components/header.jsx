/*
	parameters
	
	<Header title={} height={} background={} />
*/

const Header = React.createClass({
    getInitialState: function () {
		let height = parseInt(this.props.height) || 100;
        return {
			height: height,
			background: this.props.background,
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
            top: "0",
            width: "100%",
            height: this.state.height + 'px',
            textAlign: "center",
            lineHeight: this.state.height + 'px',
			background: this.state.background,
            fontSize: fontSize
        };

        let style_c = {
            display: "block",
            position: "absolute",
            width: this.state.height + "px",
            height: this.state.height + "px",
            lineHeight: this.state.height + "px",
            fontSize: fontSize,
            left: "0",
            top: "0"
        };

        return (
            <div style={style_a}>
                <div style={style_b}>
                    <b style={style_c} onClick={this.backClickHandler}>&lt;</b>
                    {this.state.title}
                </div>
            </div>
        )
    }
});